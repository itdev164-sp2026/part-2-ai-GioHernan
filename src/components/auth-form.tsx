"use client";

import { useActionState, useState } from "react";

import { authenticateAction, type AuthActionState, type AuthMode } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthActionState = {
  success: false,
  mode: "signIn",
};

const modeCopy: Record<
  AuthMode,
  {
    title: string;
    description: string;
    submitLabel: string;
    helper: string;
  }
> = {
  signIn: {
    title: "Welcome back",
    description: "Sign in to continue to your course dashboard and project workspace.",
    submitLabel: "Sign In",
    helper: "Use the email address connected to your Supabase account.",
  },
  signUp: {
    title: "Create an account",
    description: "Register with email and password to start using the dashboard.",
    submitLabel: "Sign Up",
    helper: "If email confirmation is enabled, you will need to verify your inbox.",
  },
};

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signIn");
  const [state, formAction, isPending] = useActionState(authenticateAction, initialState);

  const activeCopy = modeCopy[mode];
  const feedback = state.mode === mode ? state.error ?? state.message : null;

  return (
    <Card className="border-border/70 bg-card/95 shadow-2xl shadow-black/5 backdrop-blur-sm">
      <CardHeader className="space-y-4 border-b border-border/60 bg-muted/30 px-6 py-6">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            ITDEV-164
          </p>
          <CardTitle className="text-2xl">{activeCopy.title}</CardTitle>
          <CardDescription className="text-sm leading-6">{activeCopy.description}</CardDescription>
        </div>

        <div className="grid grid-cols-2 rounded-xl bg-muted p-1">
          <Button
            type="button"
            variant={mode === "signIn" ? "default" : "ghost"}
            className="w-full rounded-lg"
            onClick={() => setMode("signIn")}
          >
            Sign In
          </Button>
          <Button
            type="button"
            variant={mode === "signUp" ? "default" : "ghost"}
            className="w-full rounded-lg"
            onClick={() => setMode("signUp")}
          >
            Sign Up
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 px-6 py-6">
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="mode" value={mode} />

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={mode === "signIn" ? "current-password" : "new-password"}
              required
            />
          </div>

          <p className="text-sm text-muted-foreground">{activeCopy.helper}</p>

          {feedback ? (
            <p
              className={
                state.error
                  ? "text-sm text-destructive"
                  : "text-sm text-emerald-600 dark:text-emerald-400"
              }
              aria-live="polite"
            >
              {feedback}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Please wait..." : activeCopy.submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
