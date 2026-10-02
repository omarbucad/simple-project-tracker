#!/bin/sh

php artisan optimize

exec /usr/bin/supervisord -c /etc/supervisord.conf
