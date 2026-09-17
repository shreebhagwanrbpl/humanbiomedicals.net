import { fetchFullCatalog } from "@/lib/data-fetcher";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const products = await fetchFullCatalog();

    return NextResponse.json(
      {
        success: true,
        websiteId: "humanbiomedicalsnet",
        count: products.length,
        products,
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
    console.error("API /api/products error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to load products",
        products: [],
      },
      { status: 500 }
    );
  }
}
