import { NextResponse } from "next/server"
import { createProject } from "@/app/actions"

export async function POST(req: Request) {
    try {
    const body = await req.json()
    const result = await createProject(body)

    if (result.success) {
        return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message ?? String(err) }, { status: 500 })
    }
}
