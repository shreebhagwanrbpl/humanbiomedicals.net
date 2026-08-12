import { db } from "@/lib/firebase";
import {
    collection,
    getDocs,
    doc,
    getDoc,
} from "firebase/firestore";

export default async function sitemap() {
    const baseUrl = "https://humanbiomedicals.net";
    const urls = [];

    const now = new Date();

    // Static Core Pages (High Priority)
    urls.push(
        {
            url: baseUrl,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/items`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        }
    );

    try {
        // DISTRICTS
        const districtSnap = await getDocs(
            collection(db, "websites", "humanbiomedicalsnet", "districts")
        );

        const districts = districtSnap.docs.map((doc) => doc.data());

        districts.forEach((district) => {
            const slug = district.slug;
            if (!slug) return;

            urls.push(
                {
                    url: `${baseUrl}/${slug}`,
                    lastModified: now,
                    changeFrequency: "daily",
                    priority: 0.85,
                },
                {
                    url: `${baseUrl}/${slug}/items`,
                    lastModified: now,
                    changeFrequency: "daily",
                    priority: 0.8,
                },
                {
                    url: `${baseUrl}/${slug}/about`,
                    lastModified: now,
                    changeFrequency: "weekly",
                    priority: 0.7,
                },
                {
                    url: `${baseUrl}/${slug}/services`,
                    lastModified: now,
                    changeFrequency: "weekly",
                    priority: 0.7,
                },
                {
                    url: `${baseUrl}/${slug}/contact`,
                    lastModified: now,
                    changeFrequency: "monthly",
                    priority: 0.6,
                }
            );
        });

        // PRODUCTS
        const productDoc = await getDoc(
            doc(db, "websites", "humanbiomedicalsnet", "pages", "products")
        );

        const products = productDoc.data()?.products || [];

        products.forEach((product) => {
            if (!product.slug) return;

            // Main Product URL
            urls.push({
                url: `${baseUrl}/items/${product.slug}`,
                lastModified: now,
                changeFrequency: "weekly",
                priority: 0.9,
            });

            // District-Specific Product URLs for Local SEO Indexing
            districts.forEach((district) => {
                if (!district.slug) return;

                urls.push({
                    url: `${baseUrl}/${district.slug}/items/${product.slug}`,
                    lastModified: now,
                    changeFrequency: "weekly",
                    priority: 0.85,
                });
            });
        });
    } catch (error) {
        console.error("Sitemap Generation Error:", error);
    }

    return urls;
}