import {Head, Link, router , useForm} from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { create , edit , destroy , index } from '@/actions/App/Http/Controllers/ProjectController';
import {useState} from "react";
interface Project {
    id: number;
    client_name: string;
    project_name: string;
    description: string | null;
    status: string;
    priority: string;
    start_date: string | null;
    due_date: string | null;
}

interface Props {
    table: {
        data: Project[];
    }
}

export default function Index({ table }: Props) {
    const form = useForm();

    const [filters, setFilters] = useState({
        search: "",
        status: "all",
        priority: "all",
    });

    const removeItem = (id: number) => {

        form.delete(destroy(id).url , {
            onSuccess: data => {
                router.reload();
            }
        });
    }

    return (
        <>
            <Head title="Projects" />

            <div className="container mx-auto px-4 py-10">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Projects
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage your projects.
                        </p>
                    </div>

                    <Button aschild="true">
                        <Link href={create().url}>
                            Create Project
                        </Link>
                    </Button>
                </div>

                <div className="mb-6 rounded-md border p-4">
                    <div className="flex flex-wrap items-end gap-4">
                        {/* Search */}
                        <div className="min-w-[220px] flex-1 space-y-2">
                            <label className="text-sm font-medium">
                                Search
                            </label>

                            <Input
                                placeholder="Search projects..."
                                value={filters.search}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        search: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Status */}
                        <div className="w-[180px] space-y-2">
                            <label className="text-sm font-medium">
                                Status
                            </label>

                            <Select
                                value={filters.status}
                                onValueChange={(value) =>
                                    setFilters({
                                        ...filters,
                                        status: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All statuses" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="all">All statuses</SelectItem>
                                    <SelectItem value="planning">Planning</SelectItem>
                                    <SelectItem value="in_progress">
                                        In Progress
                                    </SelectItem>
                                    <SelectItem value="on_hold">
                                        On Hold
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Priority */}
                        <div className="w-[160px] space-y-2">
                            <label className="text-sm font-medium">
                                Priority
                            </label>

                            <Select
                                value={filters.priority}
                                onValueChange={(value) =>
                                    setFilters({
                                        ...filters,
                                        priority: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All priorities" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="all">All priorities</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Filter Button */}
                        <Button
                            type="button"
                            onClick={() =>
                                router.get(index().url, filters, {
                                    preserveState: true,
                                    preserveScroll: true,
                                })
                            }
                        >
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Project</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {table.data.length > 0 ? (
                                table.data.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">
                                           <Link href={edit(project.id).url} className={'text-underlined font-bold'}>
                                               {project.client_name}
                                           </Link>
                                        </TableCell>

                                        <TableCell>
                                            {project.project_name}
                                        </TableCell>

                                        <TableCell>
                                            {project.status}
                                        </TableCell>

                                        <TableCell>
                                            {project.priority}
                                        </TableCell>

                                        <TableCell>
                                            {project.start_date ? project.start_date.substring(0, 10) : "-"}
                                        </TableCell>

                                        <TableCell>
                                            {project.due_date ? project.due_date.substring(0, 10) : "-"}
                                        </TableCell>

                                        <TableCell>
                                            <Button variant="destructive" onClick={() => removeItem(project.id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-24 text-center"
                                    >
                                        No projects found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
