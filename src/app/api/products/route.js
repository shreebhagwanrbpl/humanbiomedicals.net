import { NextResponse } from "next/server";
import { fetchFullCatalog } from "@/lib/data-fetcher";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  try {
    const products = await fetchFullCatalog(true);

    return NextResponse.json(
      {
        success: true,
        websiteId: "humanbiomedicalsnet",
        count: products.length,
        products,
        timestamp: Date.now(),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("[api/products] Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products", products: [] },
      { status: 500 }
    );
  }
}
