import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth-form";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function LoginPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/projects");
  }

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(120,119,198,0.14),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),_transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />
      <div className="relative w-full max-w-md space-y-4">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Course Dashboard
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Secure access</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage projects and keep your coursework synced with Supabase.
          </p>
        </div>

        <AuthForm />
      </div>
    </main>
  );
}
