import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectForm } from "@/components/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
          Projects
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Create Project</h1>
        <p className="max-w-2xl text-muted-foreground">
          Add a new project to Supabase and keep the dashboard aligned with your latest work.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Fill in the fields below. Validation is enforced on both client and server.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}