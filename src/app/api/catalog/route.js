import { NextResponse } from "next/server";
import { fetchFullCatalog, ADMIN_API_BASE_URL, WEBSITE_ID } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const products = await fetchFullCatalog();

    // Group categories and subcategories for structured consumption
    const categoriesMap = {};
    products.forEach((p) => {
      const cat = p.category || "Other Products";
      const sub = p.subCategory || cat;
      if (!categoriesMap[cat]) {
        categoriesMap[cat] = {
          name: cat,
          subcategories: {},
          productCount: 0,
        };
      }
      if (!categoriesMap[cat].subcategories[sub]) {
        categoriesMap[cat].subcategories[sub] = [];
      }
      categoriesMap[cat].subcategories[sub].push(p);
      categoriesMap[cat].productCount++;
    });

    const categoriesList = Object.entries(categoriesMap).map(([name, data]) => ({
      name,
      subcategories: Object.entries(data.subcategories).map(([subName, prods]) => ({
        name: subName,
        productsCount: prods.length,
      })),
      productCount: data.productCount,
    }));

    return NextResponse.json(
      {
        success: true,
        websiteId: WEBSITE_ID,
        adminApiBaseUrl: ADMIN_API_BASE_URL,
        total: products.length,
        categories: categoriesList,
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
    console.error("API /api/catalog error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to load catalog",
        products: [],
      },
      { status: 500 }
    );
  }
}
