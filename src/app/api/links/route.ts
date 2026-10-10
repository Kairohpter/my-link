import { NextRequest, NextResponse } from "next/server";
import {
  getMockLinks,
  createMockLink,
  GetLinksOptions,
} from "@/lib/mock-links";
import { ApiResponse, LinkItem } from "@/types/link";
import { validateAndFormatUrl } from "@/lib/utils";

// GET /api/links - 링크 목록 조회 (필터링, 검색, 페이징 지원)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category") || "all";
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sort = (searchParams.get("sort") as GetLinksOptions["sort"]) || "order";

    const { data, meta } = getMockLinks({
      category,
      search,
      page,
      limit,
      sort,
    });

    const responsePayload: ApiResponse<LinkItem[]> = {
      success: true,
      statusCode: 200,
      message: "링크 목록을 성공적으로 조회했습니다.",
      data,
      meta,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch {
    const errorPayload: ApiResponse<null> = {
      success: false,
      statusCode: 500,
      message: "서버 내부 오류가 발생했습니다.",
      data: null,
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(errorPayload, { status: 500 });
  }
}

// POST /api/links - 링크 신규 등록 Mock
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.url || !body.category) {
      const errorPayload: ApiResponse<null> = {
        success: false,
        statusCode: 400,
        message: "필수 입력값(title, url, category)이 누락되었습니다.",
        data: null,
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(errorPayload, { status: 400 });
    }

    const urlValidation = validateAndFormatUrl(body.url);
    if (!urlValidation.isValid) {
      const errorPayload: ApiResponse<null> = {
        success: false,
        statusCode: 400,
        message: urlValidation.error || "올바른 URL 형식이 아닙니다.",
        data: null,
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(errorPayload, { status: 400 });
    }

    const createdLink = createMockLink({
      title: body.title,
      desc: body.desc || "",
      url: urlValidation.formattedUrl,
      category: body.category,
      categoryLabel: body.categoryLabel || body.category.toUpperCase(),
      badge: body.badge,
      bgColor: body.bgColor || "bg-[#FEF08A]",
      icon: body.icon || "🔗",
      tags: body.tags || [],
      isActive: body.isActive ?? true,
    });

    const responsePayload: ApiResponse<LinkItem> = {
      success: true,
      statusCode: 201,
      message: "새 링크가 성공적으로 등록되었습니다.",
      data: createdLink,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(responsePayload, { status: 201 });
  } catch {
    const errorPayload: ApiResponse<null> = {
      success: false,
      statusCode: 500,
      message: "링크 생성 중 오류가 발생했습니다.",
      data: null,
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(errorPayload, { status: 500 });
  }
}
