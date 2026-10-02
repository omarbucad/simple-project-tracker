<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;

Route::inertia('/', 'welcome')->name('home');
Route::resource('projects', ProjectController::class);
