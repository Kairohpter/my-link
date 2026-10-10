import { NextRequest, NextResponse } from "next/server";
import {
  getMockLinkById,
  updateMockLink,
  deleteMockLink,
  incrementMockLinkClicks,
} from "@/lib/mock-links";
import { ApiResponse, LinkItem } from "@/types/link";
import { validateAndFormatUrl } from "@/lib/utils";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/links/[id] - 특정 링크 상세 조회
export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const link = getMockLinkById(id);

    if (!link) {
      const errorPayload: ApiResponse<null> = {
        success: false,
        statusCode: 404,
        message: `ID가 '${id}'인 링크를 찾을 수 없습니다.`,
        data: null,
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(errorPayload, { status: 404 });
    }

    const responsePayload: ApiResponse<LinkItem> = {
      success: true,
      statusCode: 200,
      message: "링크 상세 정보를 성공적으로 조회했습니다.",
      data: link,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch {
    const errorPayload: ApiResponse<null> = {
      success: false,
      statusCode: 500,
      message: "링크 조회 중 오류가 발생했습니다.",
      data: null,
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(errorPayload, { status: 500 });
  }
}

// PATCH /api/links/[id] - 특정 링크 수정 또는 클릭수 증가
export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));

    // 클릭 수 증가 전용 요청 처리 (?action=click 또는 body.action === "click")
    const action = request.nextUrl.searchParams.get("action") || body?.action;
    if (action === "click") {
      const updated = incrementMockLinkClicks(id);
      if (!updated) {
        return NextResponse.json(
          {
            success: false,
            statusCode: 404,
            message: `ID가 '${id}'인 링크를 찾을 수 없습니다.`,
            data: null,
            timestamp: new Date().toISOString(),
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        statusCode: 200,
        message: "링크 클릭수가 증가했습니다.",
        data: updated,
        timestamp: new Date().toISOString(),
      });
    }

    // URL 수정 요청 시 유효성 검사 및 정규화
    if (body.url !== undefined) {
      const urlValidation = validateAndFormatUrl(body.url);
      if (!urlValidation.isValid) {
        return NextResponse.json(
          {
            success: false,
            statusCode: 400,
            message: urlValidation.error || "올바른 URL 형식이 아닙니다.",
            data: null,
            timestamp: new Date().toISOString(),
          },
          { status: 400 }
        );
      }
      body.url = urlValidation.formattedUrl;
    }

    const updated = updateMockLink(id, body);
    if (!updated) {
      const errorPayload: ApiResponse<null> = {
        success: false,
        statusCode: 404,
        message: `ID가 '${id}'인 링크를 찾을 수 없습니다.`,
        data: null,
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(errorPayload, { status: 404 });
    }

    const responsePayload: ApiResponse<LinkItem> = {
      success: true,
      statusCode: 200,
      message: "링크 정보가 성공적으로 수정되었습니다.",
      data: updated,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch {
    const errorPayload: ApiResponse<null> = {
      success: false,
      statusCode: 500,
      message: "링크 수정 중 오류가 발생했습니다.",
      data: null,
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(errorPayload, { status: 500 });
  }
}

// DELETE /api/links/[id] - 특정 링크 삭제
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const deleted = deleteMockLink(id);

    if (!deleted) {
      const errorPayload: ApiResponse<null> = {
        success: false,
        statusCode: 404,
        message: `ID가 '${id}'인 링크를 찾을 수 없습니다.`,
        data: null,
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(errorPayload, { status: 404 });
    }

    const responsePayload: ApiResponse<{ id: string }> = {
      success: true,
      statusCode: 200,
      message: "링크가 성공적으로 삭제되었습니다.",
      data: { id },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch {
    const errorPayload: ApiResponse<null> = {
      success: false,
      statusCode: 500,
      message: "링크 삭제 중 오류가 발생했습니다.",
      data: null,
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(errorPayload, { status: 500 });
  }
}
