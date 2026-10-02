# Simple Project Tracker

A demo project tracking application built with Laravel, Inertia, React, and shadcn/ui.

## Requirements

* PHP
* Composer
* Node.js and npm
* MySQL

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd simple-project-tracker
```

### 2. Install dependencies

```bash
composer install
npm install
```

### 3. Set up Laravel

Create the environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

### 4. Set up MySQL

Make sure MySQL is running and create a database named:

```text
simple-project-tracker
```

Update your `.env` if necessary:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=simple-project-tracker
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Run migrations

```bash
php artisan migrate
```

### 6. Build the frontend

```bash
npm run build
```

### 7. Start the demo

```bash
php artisan serve
```

Open:

```text
http://localhost:8000/projects
```

AI Tools Disclosure

AI tools were used during development to assist with code generation, debugging, UI implementation, and documentation.
