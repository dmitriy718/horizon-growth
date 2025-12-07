import { NextRequest, NextResponse } from "next/server";
import {
  getPublishedPosts,
  getCategories,
  searchPosts,
  getPostCount,
} from "@/lib/blog";

// GET /api/blog - List blog posts with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const offset = (page - 1) * limit;

    let posts;

    if (search) {
      posts = await searchPosts(search, limit);
    } else {
      posts = await getPublishedPosts({ limit, offset, category });
    }

    const [totalPosts, categories] = await Promise.all([
      getPostCount(),
      getCategories(),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total: totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
      },
      categories,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

