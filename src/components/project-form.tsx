"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createProjectAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type Project, projectSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const statusOptions: Project["status"][] = ["Planning", "Active", "Completed"];

const defaultValues: Project = {
  title: "",
  description: "",
  status: "Planning",
};

export function ProjectForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  function onSubmit(values: Project) {
    startTransition(async () => {
      const result = await createProjectAction(values);

      if (!result.success) {
        toast.error(result.error ?? "Failed to create project");
        return;
      }

      toast.success("Project created successfully");
      form.reset(defaultValues);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the project scope, goals, and outcomes"
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <div className="grid gap-2 sm:grid-cols-3">
                  {statusOptions.map((status) => (
                    <label
                      key={status}
                      className={cn(
                        "border-input hover:bg-muted/50 flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition-colors",
                        field.value === status && "border-primary bg-primary/10"
                      )}
                    >
                      <input
                        type="radio"
                        name={field.name}
                        value={status}
                        checked={field.value === status}
                        onChange={() => field.onChange(status)}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        className="sr-only"
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              </FormControl>
              <FormDescription>Choose the current lifecycle stage.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Project"}
        </Button>
      </form>
    </Form>
  );
}