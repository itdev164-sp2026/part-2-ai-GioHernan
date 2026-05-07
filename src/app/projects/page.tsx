import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";

type Project = {
  id: number;
  title: string;
  description: string | null;
  status: string | null;
};

const statusStyles: Record<string, string> = {
  active: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  completed: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  archived: "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300",
};

function getStatusBadgeClass(status: string | null) {
  const normalized = status?.toLowerCase() ?? "archived";
  return statusStyles[normalized] ?? statusStyles.archived;
}

export default async function ProjectsPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, description, status")
    .returns<Project[]>();

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
          Projects
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Project Workspace</h1>
        <p className="max-w-2xl text-muted-foreground">
          Live project records from Supabase for coursework milestones and delivery tracking.
        </p>
      </section>

      {error ? (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle>Unable to load projects</CardTitle>
            <CardDescription>
              Supabase returned an error while fetching the projects table.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </CardContent>
        </Card>
      ) : projects && projects.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="h-full transition-colors hover:border-primary/40">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg leading-snug">{project.title}</CardTitle>
                  <span
                    className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusBadgeClass(project.status)}`}
                  >
                    {project.status ?? "archived"}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {project.description?.trim() || "No project description provided."}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No projects found</CardTitle>
            <CardDescription>
              The projects table is empty. Add a record in Supabase to populate this dashboard.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}