"use server";

import { ProjectSchema, type Project } from "@/lib/schemas"
import { supabase } from "@/lib/supabase"

export async function createProject(data: unknown): Promise<{ success: boolean; error?: string }>{
  // Validate on the server-side
const parsed = ProjectSchema.safeParse(data)

    if (!parsed.success) {
    return { success: false, error: parsed.error.message }
    }

    const validated = parsed.data as Project

    const { data: insertData, error } = await supabase
    .from("projects")
    .insert([validated])

    if (error) {
    return { success: false, error: error.message }
    }

    return { success: true }
}

export default createProject;
