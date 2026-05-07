"use server";

import { redirect } from "next/navigation";

import { authSchema, projectSchema, type AuthValues, type Project } from "@/lib/schemas";
import { createActionSupabaseClient } from "@/lib/supabase/actions";

export type CreateProjectActionResult = {
  success: boolean;
  error?: string;
};

export type AuthMode = AuthValues["mode"];

export type AuthActionState = {
  success: boolean;
  mode: AuthMode;
  error?: string;
  message?: string;
};

const initialAuthActionState: AuthActionState = {
  success: false,
  mode: "signIn",
};

export async function authenticateAction(
  _previousState: AuthActionState = initialAuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const requestedMode = formData.get("mode") === "signUp" ? "signUp" : "signIn";

  const parsed = authSchema.safeParse({
    mode: formData.get("mode"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      mode: requestedMode,
      error: parsed.error.issues[0]?.message ?? "Invalid credentials",
    };
  }

  const supabase = await createActionSupabaseClient();

  if (parsed.data.mode === "signIn") {
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      return {
        success: false,
        mode: parsed.data.mode,
        error: error.message,
      };
    }

    redirect("/projects");
  }

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return {
      success: false,
      mode: parsed.data.mode,
      error: error.message,
    };
  }

  if (data.session) {
    redirect("/projects");
  }

  return {
    success: true,
    mode: parsed.data.mode,
    message: "Account created. Check your email to confirm the account before signing in.",
  };
}

export async function signOutAction() {
  const supabase = await createActionSupabaseClient();

  await supabase.auth.signOut();
  redirect("/login");
}

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

  const supabase = await createActionSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be signed in to create a project",
    };
  }

  const { error } = await supabase.from("projects").insert(parsed.data);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return { success: true };
}