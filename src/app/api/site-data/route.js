import { NextResponse } from "next/server";
import { fetchSiteData, ADMIN_API_BASE_URL, WEBSITE_ID } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const district = searchParams.get("district");

    if (!type) {
      return NextResponse.json(
        {
          success: false,
          error: "Query parameter 'type' is required (e.g. home, contact, services, about, districts)",
        },
        { status: 400 }
      );
    }

    const data = await fetchSiteData(type, { district });

    return NextResponse.json(
      {
        success: true,
        type,
        websiteId: WEBSITE_ID,
        adminApiBaseUrl: ADMIN_API_BASE_URL,
        data: data || null,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error) {
    console.error("API /api/site-data error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to load site data",
        data: null,
      },
      { status: 500 }
    );
  }
}
