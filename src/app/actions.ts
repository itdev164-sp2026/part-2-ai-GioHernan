"use server";

import { createClient } from "@supabase/supabase-js";
import { projectSchema, type Project } from "@/lib/schemas";

export type CreateProjectActionResult = {
  success: boolean;
  error?: string;
};

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createProjectAction(
  values: Project
): Promise<CreateProjectActionResult> {
  const parsed = projectSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid project data",
    };
  }

  const { error } = await supabaseAdmin
    .from("projects")
    .insert(parsed.data);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return { success: true };
}