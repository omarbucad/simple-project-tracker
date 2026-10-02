<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_name' => ['required', 'string', 'max:255'],
            'project_name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],

            'status' => [
                'required',
                'in:planning,in_progress,on_hold,completed',
            ],

            'priority' => [
                'required',
                'in:low,medium,high',
            ],

            'start_date' => ['nullable', 'date'],

            'due_date' => [
                'nullable',
                'date',
                'after_or_equal:start_date',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'client_name.required' => 'Client name is required.',
            'project_name.required' => 'Project name is required.',

            'status.required' => 'Please select a project status.',
            'status.in' => 'The selected status is invalid.',

            'priority.required' => 'Please select a project priority.',
            'priority.in' => 'The selected priority is invalid.',

            'start_date.date' => 'Start date must be a valid date.',

            'due_date.date' => 'Due date must be a valid date.',
            'due_date.after_or_equal' => 'Due date cannot be earlier than the start date.',
        ];
    }
}
