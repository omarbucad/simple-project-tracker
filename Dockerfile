###############################
# Builder
###############################
FROM php:8.4-fpm-alpine AS builder

RUN apk add --no-cache \
    bash \
    git \
    curl \
    unzip \
    nginx \
    supervisor \
    nodejs \
    npm \
    icu-dev \
    oniguruma-dev \
    libzip-dev \
    libpng-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    linux-headers \
    $PHPIZE_DEPS

RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg

RUN docker-php-ext-install \
    bcmath \
    exif \
    gd \
    intl \
    opcache \
    pcntl \
    pdo_mysql \
    zip

RUN pecl install redis \
    && docker-php-ext-enable redis

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --no-scripts \
    --optimize-autoloader

COPY package*.json ./

RUN npm ci

COPY . .

RUN php artisan package:discover --ansi

RUN npm run build

RUN composer dump-autoload --optimize

###############################
# Runtime
###############################
FROM php:8.4-fpm-alpine

RUN apk add --no-cache \
    nginx \
    supervisor \
    bash \
    curl \
    icu \
    oniguruma \
    libzip \
    libpng \
    freetype \
    libjpeg-turbo

COPY --from=builder /usr/local/lib/php/extensions /usr/local/lib/php/extensions
COPY --from=builder /usr/local/etc/php/conf.d /usr/local/etc/php/conf.d

WORKDIR /var/www/html

COPY --from=builder /var/www/html .

COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf
COPY docker/php/php.ini /usr/local/etc/php/conf.d/custom.ini
COPY docker/supervisor/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

RUN mkdir -p \
    storage/framework/cache \
    storage/framework/views \
    storage/framework/sessions \
    storage/logs \
    bootstrap/cache \
    /run/nginx

RUN chown -R www-data:www-data \
    storage \
    bootstrap/cache

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
