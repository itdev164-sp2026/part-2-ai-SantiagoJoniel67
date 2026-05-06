"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProjectSchema, type Project } from "@/lib/schemas"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

export function ProjectForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Project>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: { title: "", description: "", status: "active" },
  })

  async function onSubmit(values: Project) {
    try {
      const res = await fetch(`/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success("Project created")
        reset()
        return
      }

      toast.error(data?.error || "Failed to create project")
    } catch (err) {
      toast.error("Failed to create project")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Toaster />

      <Field>
        <FieldLabel>Title</FieldLabel>
        <FieldContent>
          <Input placeholder="Project title" {...register("title")} />
          {errors.title && <FieldError>{errors.title.message}</FieldError>}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Description</FieldLabel>
        <FieldContent>
          <Textarea placeholder="Short description" {...register("description")} />
          {errors.description && (
            <FieldError>{errors.description.message}</FieldError>
          )}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Status</FieldLabel>
        <FieldContent>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && <FieldError>{errors.status.message}</FieldError>}
        </FieldContent>
      </Field>

      <div>
        <Button type="submit" disabled={isSubmitting}>
          Create Project
        </Button>
      </div>
    </form>
  )
}

export default ProjectForm
