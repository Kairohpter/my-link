"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Footer } from "@/components/layout/footer";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Tabs,
  StickyMemo,
  Input,
  Textarea,
  Avatar,
} from "@/components/ui";

const COLOR_TOKENS = [
  { name: "Neo Yellow", hex: "#FFE600", bgClass: "bg-[#FFE600]", textClass: "text-black" },
  { name: "Neo Yellow Light", hex: "#FEF08A", bgClass: "bg-[#FEF08A]", textClass: "text-black" },
  { name: "Neo Mint Dark", hex: "#A3E635", bgClass: "bg-[#A3E635]", textClass: "text-black" },
  { name: "Neo Mint Light", hex: "#86EFAC", bgClass: "bg-[#86EFAC]", textClass: "text-black" },
  { name: "Neo Pink Dark", hex: "#FF6B6B", bgClass: "bg-[#FF6B6B]", textClass: "text-white" },
  { name: "Neo Pink Light", hex: "#FECDD3", bgClass: "bg-[#FECDD3]", textClass: "text-black" },
  { name: "Neo Purple Dark", hex: "#C084FC", bgClass: "bg-[#C084FC]", textClass: "text-black" },
  { name: "Neo Purple Light", hex: "#E9D5FF", bgClass: "bg-[#E9D5FF]", textClass: "text-black" },
  { name: "Neo Blue Dark", hex: "#38BDF8", bgClass: "bg-[#38BDF8]", textClass: "text-black" },
  { name: "Neo Blue Light", hex: "#BAE6FD", bgClass: "bg-[#BAE6FD]", textClass: "text-black" },
  { name: "Neo Cream (BG)", hex: "#FAF7EE", bgClass: "bg-[#FAF7EE]", textClass: "text-black" },
  { name: "Neo Black", hex: "#121212", bgClass: "bg-[#121212]", textClass: "text-white" },
];

export default function DesignSystemPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [formInput, setFormInput] = useState("");

  const handleCopyHex = (hex: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(hex);
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(null), 1500);
    }
  };

  return (
    <PageShell maxWidth="4xl">
      {/* 헤더 & 네비게이션 */}
      <header className="mb-10 space-y-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="white" size="sm" leftIcon={<span>←</span>}>
              메인 홈으로 이동
            </Button>
          </Link>

          <Badge variant="mint" dot dotColor="bg-black">
            LIVING DESIGN SYSTEM v1.0
          </Badge>
        </div>

        <div className="border-[3px] border-black bg-white rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000]">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="yellow" rotate="-1">
              STYLEGUIDE
            </Badge>
            <Badge variant="purple" rotate="1">
              TAILWIND V4 + NEXT.JS 16
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
            네오브루탈리즘 디자인 시스템 (Neobrutalism UI)
          </h1>
          <p className="text-sm sm:text-base font-semibold text-neutral-700 mt-2">
            굵은 블랙 외곽선(3px), 흐림 없는 하드 드롭 섀도우(Hard Shadow), 비비드한 레트로 파스텔 컬러, 그리고 아날로그 버튼 프레스 인터랙션을 규격화한 디자인 시스템 컴포넌트 가이드입니다.
          </p>
        </div>
      </header>

      <div className="space-y-12">
        {/* 1. 컬러 팔레트 토큰 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎨</span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              1. Color Tokens (컬러 토큰)
            </h2>
          </div>
          <p className="text-xs font-bold text-neutral-600">
            카드 클릭 시 해당 컬러의 HEX 코드가 클립보드에 바로 복사됩니다.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {COLOR_TOKENS.map((token) => (
              <button
                key={token.name}
                type="button"
                onClick={() => handleCopyHex(token.hex)}
                className={`p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] text-left transition-all hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer ${token.bgClass} ${token.textClass}`}
              >
                <div className="font-mono text-xs font-black">{token.name}</div>
                <div className="font-mono text-[11px] opacity-90 mt-1">
                  {copiedColor === token.hex ? "복사됨! ✅" : token.hex}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 2. 버튼 (Buttons) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔘</span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              2. Button Variants & States (버튼)
            </h2>
          </div>

          <Card colorVariant="white">
            <CardHeader>
              <CardTitle>버튼 색상 변형 (Variants)</CardTitle>
              <CardDescription>
                버튼을 직접 클릭해보세요. 아날로그 스위치처럼 눌리는 프레스 인터랙션이 내장되어 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="yellow">Yellow (Primary)</Button>
                <Button variant="pink">Pink</Button>
                <Button variant="mint">Mint</Button>
                <Button variant="purple">Purple</Button>
                <Button variant="blue">Blue</Button>
                <Button variant="white">White</Button>
                <Button variant="black">Black</Button>
                <Button variant="outline">Outline</Button>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-black/10">
                <h4 className="font-mono text-xs font-black uppercase text-black mb-3">
                  크기 및 상태 (Sizes & States)
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm" variant="yellow">
                    Small (sm)
                  </Button>
                  <Button size="md" variant="yellow">
                    Medium (md)
                  </Button>
                  <Button size="lg" variant="yellow">
                    Large (lg)
                  </Button>
                  <Button size="icon" variant="mint">
                    ↗
                  </Button>
                  <Button variant="purple" isLoading>
                    Loading
                  </Button>
                  <Button variant="white" disabled>
                    Disabled
                  </Button>
                  <Button
                    variant="pink"
                    leftIcon={<span>❤️</span>}
                    rightIcon={<span>🎉</span>}
                  >
                    With Icons
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. 배지 및 스티커 (Badges & Stickers) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏷️</span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              3. Badges & Stickers (배지 및 스티커)
            </h2>
          </div>

          <Card colorVariant="white">
            <CardHeader>
              <CardTitle>스티커 배지 & 상태 인디케이터</CardTitle>
              <CardDescription>
                살짝 기울어진 각도(`rotate`)와 펄스 애니메이션 도트(`dot`)를 지원합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="black">BLACK</Badge>
                <Badge variant="yellow">YELLOW</Badge>
                <Badge variant="mint">MINT</Badge>
                <Badge variant="pink">PINK</Badge>
                <Badge variant="purple">PURPLE</Badge>
                <Badge variant="blue">BLUE</Badge>
                <Badge variant="outline">OUTLINE</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Badge variant="yellow" rotate="-2">
                  ✨ ROTATE -2°
                </Badge>
                <Badge variant="pink" rotate="1">
                  🔥 ROTATE 1°
                </Badge>
                <Badge variant="mint" rotate="2">
                  ⚡️ ROTATE 2°
                </Badge>
                <Badge variant="white" dot dotColor="bg-[#A3E635]">
                  LIVE ONLINE
                </Badge>
                <Badge variant="black" dot dotColor="bg-[#FFE600]">
                  VERIFIED CREATOR
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 4. 카드 시스템 (Card Family) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🃏</span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              4. Cards & Containers (카드 시스템)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card colorVariant="yellow-light" interactive>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="black" size="sm">
                    INTERACTIVE
                  </Badge>
                  <span className="text-xl">⚡️</span>
                </div>
                <CardTitle>인터랙티브 링크 카드</CardTitle>
                <CardDescription>
                  `interactive` prop을 주면 마우스 호버 시 살짝 떠오르고 클릭 시 눌리는 애니메이션이 활성화됩니다.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card colorVariant="mint" interactive>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="black" size="sm">
                    VIVID MINT
                  </Badge>
                  <span className="text-xl">🚀</span>
                </div>
                <CardTitle>포트폴리오 & 프로젝트 카드</CardTitle>
                <CardDescription>
                  배경 색상(`colorVariant`)으로 yellow, mint, purple, pink, blue, cream 등을 자유롭게 조합할 수 있습니다.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card colorVariant="purple">
              <CardHeader>
                <Badge variant="black" size="sm" className="w-fit">
                  STATIC CONTAINER
                </Badge>
                <CardTitle>일반 정보 카드 (Purple)</CardTitle>
                <CardDescription>
                  클릭 인터랙션이 필요 없는 안정적인 콘텐츠 표시용 컨테이너입니다.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card colorVariant="pink">
              <CardHeader>
                <Badge variant="black" size="sm" className="w-fit">
                  ANALYTICS CARD
                </Badge>
                <CardTitle>통계 및 하이라이트 (Pink)</CardTitle>
                <CardDescription>
                  중요한 공지사항이나 경고, 강조하고 싶은 데이터 통계를 표현하기에 적합합니다.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* 5. 폼 입력 컨트롤 (Form Inputs) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              5. Form Controls (폼 요소)
            </h2>
          </div>

          <Card colorVariant="white">
            <CardHeader>
              <CardTitle>입력 필드 & 텍스트 영역</CardTitle>
              <CardDescription>
                포커스 시 단단한 블랙 섀도우가 생기며 레트로 타자기 느낌의 타이포그래피가 적용됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="링크 제목 (LINK TITLE)"
                  placeholder="예: 내 GitHub 저장소"
                  value={formInput}
                  onChange={(e) => setFormInput(e.target.value)}
                  leftIcon={<span>🔗</span>}
                />

                <Input
                  label="URL 주소 (TARGET URL)"
                  placeholder="https://example.com"
                  defaultValue="https://github.com"
                  rightIcon={<span className="text-xs font-mono font-bold">HTTPS</span>}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Input
                  label="유효성 검사 에러 상태"
                  defaultValue="잘못된 링크 형식"
                  error
                  errorMessage="올바른 URL 형식(https://)을 입력해야 합니다."
                />

                <Textarea
                  label="상세 설명 (DESCRIPTION)"
                  placeholder="링크에 대한 상세 소개글을 입력하세요..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 6. 메모 & 아바타 (Sticky Memo & Avatars) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📌</span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              6. Sticky Memo & Avatars (스티키 메모 & 아바타)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <StickyMemo
              badgeText="NOTICE & MEMO"
              title="컴포넌트 안내"
              icon="💡"
            >
              상단에 반투명 마스킹 테이프 장식이 부착된 레트로 메모지 컴포넌트입니다. 공지사항, 팁, 중요 경고 메시지 전달에 최적화되어 있습니다.
            </StickyMemo>

            <Card colorVariant="white">
              <CardHeader>
                <CardTitle>아바타 컴포넌트 (Avatar)</CardTitle>
                <CardDescription>
                  크기별(`sm`, `md`, `lg`, `xl`) 아바타 및 배지 슬롯
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-4">
                  <Avatar size="sm" emoji="🐣" color="mint" />
                  <Avatar size="md" emoji="🧑‍💻" color="blue" badge="PRO" />
                  <Avatar size="lg" emoji="👾" color="yellow" badge="DEV" />
                  <Avatar size="xl" emoji="👑" color="pink" badge="VIP" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 7. 탭 네비게이션 (Tabs) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗂️</span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              7. Tabs Navigation (탭 네비게이션)
            </h2>
          </div>

          <Card colorVariant="white">
            <CardHeader>
              <CardTitle>인터랙티브 탭 스위처</CardTitle>
              <CardDescription>
                현재 선택된 탭: <strong className="text-black font-mono">{activeTab.toUpperCase()}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                items={[
                  { id: "all", label: "전체보기", count: 12 },
                  { id: "dev", label: "💻 개발", count: 5 },
                  { id: "blog", label: "✍️ 블로그", count: 3 },
                  { id: "social", label: "🌐 소셜", count: 4 },
                ]}
                activeId={activeTab}
                onChange={setActiveTab}
              />
            </CardContent>
          </Card>
        </section>

        {/* 8. 신규 페이지 개발 시 사용 예시 코드 안내 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">💻</span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              8. How to Use in Future Pages (사용 방법)
            </h2>
          </div>

          <div className="bg-[#121212] text-[#86EFAC] border-[3px] border-black rounded-xl p-5 shadow-[5px_5px_0px_0px_#000] font-mono text-xs overflow-x-auto space-y-2">
            <div className="text-[#FFE600] font-bold">
              {"// 신규 페이지에서 디자인 시스템을 가져와 바로 작성하세요:"}
            </div>
            <pre className="text-neutral-200">
{`import { PageShell, Footer } from "@/components/layout";
import { Button, Card, Badge, Input, Tabs, StickyMemo } from "@/components/ui";

export default function MyNewPage() {
  return (
    <PageShell maxWidth="xl">
      <Card colorVariant="white" className="p-6">
        <Badge variant="yellow" rotate="-1">NEW PAGE</Badge>
        <h1 className="text-2xl font-black mt-2">새로운 네오브루탈리즘 페이지</h1>
        
        <Input label="이름" placeholder="홍길동" className="mt-4" />
        <Button variant="yellow" className="mt-4" fullWidth>저장하기</Button>
      </Card>
      <Footer className="mt-8" />
    </PageShell>
  );
}`}
            </pre>
          </div>
        </section>
      </div>

      <Footer className="mt-16" />
    </PageShell>
  );
}
