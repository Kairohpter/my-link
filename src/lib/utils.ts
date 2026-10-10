export type ClassValue =
  | ClassValue[]
  | Record<string, boolean | null | undefined>
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined;

/**
 * 외부 의존성 없이 클래스명을 안전하고 깔끔하게 병합하는 경량 유틸리티 함수입니다.
 */
export function cn(...inputs: (ClassValue | unknown)[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input).trim());
    } else if (Array.isArray(input)) {
      const inner = cn(...input);
      if (inner) classes.push(inner);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}

/**
 * Tailwind 배경 클래스(예: "bg-[#FEF08A]", "bg-white") 또는
 * 16진수 색상값(예: "#FEF08A")을 받아 유효한 inline style 객체로 변환합니다.
 */
export function getBgColorStyle(bgColor?: string): { backgroundColor?: string } {
  if (!bgColor) return {};

  const trimmed = bgColor.trim();

  // 1. 순수 hex / rgb / hsl 색상값인 경우
  if (/^#([0-9a-fA-F]{3,8})$/.test(trimmed) || trimmed.startsWith("rgb") || trimmed.startsWith("hsl")) {
    return { backgroundColor: trimmed };
  }

  // 2. Tailwind 임의값 클래스인 경우: bg-[#FEF08A]
  const arbitraryMatch = trimmed.match(/bg-\[(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\))\]/);
  if (arbitraryMatch) {
    return { backgroundColor: arbitraryMatch[1] };
  }

  // 3. 표준 Tailwind 색상 키워드 매핑
  const colorMap: Record<string, string> = {
    "bg-white": "#FFFFFF",
    "bg-black": "#000000",
    "bg-[#FEF08A]": "#FEF08A",
    "bg-[#86EFAC]": "#86EFAC",
    "bg-[#E9D5FF]": "#E9D5FF",
    "bg-[#FECDD3]": "#FECDD3",
    "bg-[#BAE6FD]": "#BAE6FD",
    "bg-[#FED7AA]": "#FED7AA",
    "bg-[#FCA5A5]": "#FCA5A5",
    "bg-[#DDD6FE]": "#DDD6FE",
    "bg-[#A7F3D0]": "#A7F3D0",
    "bg-[#FDE047]": "#FDE047",
    "bg-[#FFE600]": "#FFE600",
    "bg-[#A3E635]": "#A3E635",
    "bg-[#FF6B6B]": "#FF6B6B",
    "bg-[#C084FC]": "#C084FC",
    "bg-[#38BDF8]": "#38BDF8",
    "bg-[#FAF7EE]": "#FAF7EE",
  };

  if (colorMap[trimmed]) {
    return { backgroundColor: colorMap[trimmed] };
  }

  return {};
}

export interface UrlValidationResult {
  isValid: boolean;
  formattedUrl: string;
  error?: string;
}

/**
 * 링크 URL 유효성 검사 및 안전한 정규화(프로토콜 자동 보정) 유틸리티
 */
export function validateAndFormatUrl(input: string): UrlValidationResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      isValid: false,
      formattedUrl: "",
      error: "URL 링크 주소를 입력해주세요.",
    };
  }

  // 1. 공백 검사 (URL 중간에 공백이 있으면 안 됨)
  if (/\s/.test(trimmed)) {
    return {
      isValid: false,
      formattedUrl: "",
      error: "URL에 공백(띄어쓰기)이 포함될 수 없습니다.",
    };
  }

  // 2. 위험하거나 비정상적인 스키마 차단 (XSS 방지)
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:")
  ) {
    return {
      isValid: false,
      formattedUrl: "",
      error: "보안상 허용되지 않는 URL 형식입니다.",
    };
  }

  // 3. mailto: 프로토콜 검사
  if (lower.startsWith("mailto:")) {
    const email = trimmed.slice(7);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        formattedUrl: "",
        error: "올바른 이메일 형식이 아닙니다 (예: mailto:name@example.com).",
      };
    }
    return { isValid: true, formattedUrl: trimmed };
  }

  // 4. tel: 프로토콜 검사
  if (lower.startsWith("tel:")) {
    const tel = trimmed.slice(4);
    if (!/^[0-9\-+()]+$/.test(tel) || tel.length < 3) {
      return {
        isValid: false,
        formattedUrl: "",
        error: "올바른 전화번호 형식이 아닙니다 (예: tel:010-1234-5678).",
      };
    }
    return { isValid: true, formattedUrl: trimmed };
  }

  // 5. http/https 프로토콜 보정
  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  // 6. 표준 URL 객체 생성 검사
  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    return {
      isValid: false,
      formattedUrl: "",
      error: "올바른 URL 형식이 아닙니다 (예: https://example.com).",
    };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return {
      isValid: false,
      formattedUrl: "",
      error: "HTTP 또는 HTTPS 주소만 입력 가능합니다.",
    };
  }

  const hostname = parsed.hostname;
  if (!hostname) {
    return {
      isValid: false,
      formattedUrl: "",
      error: "도메인(호스트 주소)이 누락되었습니다.",
    };
  }

  // localhost 또는 IP 주소 허용
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
  const isIpv4 = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(hostname);

  // 일반 도메인 정규식: 최소 한 개 이상의 점(.), 마지막 TLD는 영문 2자리 이상
  // 한글 도메인(IDN)도 고려 (예: xn-- 또는 도메인 문자열)
  const domainRegex =
    /^([a-zA-Z0-9\u00a1-\uffff]([a-zA-Z0-9\u00a1-\uffff-]{0,61}[a-zA-Z0-9\u00a1-\uffff])?\.)+[a-zA-Z\u00a1-\uffff]{2,}$/;

  if (!isLocalhost && !isIpv4 && !domainRegex.test(hostname)) {
    return {
      isValid: false,
      formattedUrl: "",
      error: "올바른 도메인 주소를 입력해주세요 (예: example.com 또는 naver.com).",
    };
  }

  return {
    isValid: true,
    formattedUrl: candidate,
  };
}
