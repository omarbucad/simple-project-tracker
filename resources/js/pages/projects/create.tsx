
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { store } from '@/actions/App/Http/Controllers/ProjectController';
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        client_name: "",
        project_name: "",
        description: "",
        status: "",
        priority: "",
        start_date: "",
        due_date: "",
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post( store().url );
    }

    return (
        <>
            <Head title="Create Project" />

            <div className="container mx-auto max-w-2xl px-4 py-10">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create Project
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Add a new project to your workspace.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                        <CardDescription>
                            Enter a name for your new project.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-6">
                                {/* Client Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="client_name">Client Name</Label>
                                    <Input
                                        id="client_name"
                                        placeholder="e.g. Juan Dela Cruz"
                                        value={data.client_name}
                                        onChange={(e) => setData("client_name", e.target.value)}
                                    />
                                    {errors.client_name && (
                                        <p className="text-sm text-destructive">
                                            {errors.client_name}
                                        </p>
                                    )}
                                </div>

                                {/* Project Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="project_name">Project Name</Label>
                                    <Input
                                        id="project_name"
                                        placeholder="e.g. Website Redesign"
                                        value={data.project_name}
                                        onChange={(e) => setData("project_name", e.target.value)}
                                    />
                                    {errors.project_name && (
                                        <p className="text-sm text-destructive">
                                            {errors.project_name}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe the project..."
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        rows={4}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-destructive">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData("status", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="planning">Planning</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="on_hold">On Hold</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {errors.status && (
                                        <p className="text-sm text-destructive">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>

                                {/* Priority */}
                                <div className="space-y-2">
                                    <Label>Priority</Label>
                                    <Select
                                        value={data.priority}
                                        onValueChange={(value) => setData("priority", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {errors.priority && (
                                        <p className="text-sm text-destructive">
                                            {errors.priority}
                                        </p>
                                    )}
                                </div>

                                {/* Start Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="start_date">Start Date</Label>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData("start_date", e.target.value)}
                                    />
                                    {errors.start_date && (
                                        <p className="text-sm text-destructive">
                                            {errors.start_date}
                                        </p>
                                    )}
                                </div>

                                {/* Due Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="due_date">Due Date</Label>
                                    <Input
                                        id="due_date"
                                        type="date"
                                        value={data.due_date}
                                        onChange={(e) => setData("due_date", e.target.value)}
                                    />
                                    {errors.due_date && (
                                        <p className="text-sm text-destructive">
                                            {errors.due_date}
                                        </p>
                                    )}
                                </div>
                            </div>



                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    {processing ? "Creating..." : "Create Project"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
