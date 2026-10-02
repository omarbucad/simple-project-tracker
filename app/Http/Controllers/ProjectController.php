<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        return inertia("projects/index", [
            'table' => Project::query()
                ->when($request->search, function ($query, $search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('project_name', 'like', "%{$search}%")
                            ->orWhere('client_name', 'like', "%{$search}%");
                    });
                })
                ->when(
                    $request->status && $request->status !== 'all',
                    fn ($query) => $query->where('status', $request->status)
                )
                ->when(
                    $request->priority && $request->priority !== 'all',
                    fn ($query) => $query->where('priority', $request->priority)
                )
                ->latest()
                ->paginate(10)
                ->withQueryString()
        ]);
    }

    public function create()
    {
        return inertia("projects/create");
    }

    public function store(ProjectRequest $request)
    {
        $validated = $request->validated();

        Project::query()->create($validated);

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    public function show($id)
    {

    }

    public function edit(Project $project)
    {

        return inertia("projects/edit" , [
            "project" => $project
        ]);
    }

    public function update(ProjectRequest $request, Project $project)
    {
        $validated = $request->validated();

        $project->update($validated);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }
}
