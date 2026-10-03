import { NextResponse } from "next/server";
import { submitAdminQuery } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await submitAdminQuery(body, "contact");
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
