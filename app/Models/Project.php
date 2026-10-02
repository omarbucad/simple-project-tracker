<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'client_name',
    'project_name',
    'description',
    'status',
    'priority',
    'start_date',
    'due_date',
])]
class Project extends Model
{
    protected $table = 'projects';

    protected function casts(): array
    {
        return [];
    }
}
