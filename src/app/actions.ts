"use server";

import { redirect } from "next/navigation";
import { ProjectSchema, type Project } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function createProject(data: unknown): Promise<{
  success: boolean;
  error?: string;
}> {
  // Get authenticated user
  const user = await getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Validate on the server-side
  const parsed = ProjectSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  const validated = parsed.data as Project;

  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .insert([
      {
        ...validated,
        user_id: user.id, // Add user_id for RLS
      },
    ]);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
