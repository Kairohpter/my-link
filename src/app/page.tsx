"use client";

import { useState } from "react";

interface LinkItem {
  id: string;
  category: "all" | "dev" | "blog" | "social";
  categoryLabel: string;
  title: string;
  desc: string;
  url: string;
  badge?: string;
  bgColor: string;
  icon: string;
}

const LINKS: LinkItem[] = [
  {
    id: "github",
    category: "dev",
    categoryLabel: "DEVELOPMENT",
    title: "GitHub 프로필 & 저장소",
    desc: "오픈소스 기여 및 개인 사이드 프로젝트 소스코드",
    url: "https://github.com",
    badge: "⭐ 1.2k Stars",
    bgColor: "bg-[#FEF08A]", // Neon Yellow
    icon: "💻",
  },
  {
    id: "blog",
    category: "blog",
    categoryLabel: "ARTICLE",
    title: "기술 블로그 & 인사이트",
    desc: "Next.js, TypeScript, 디자인 시스템 이야기",
    url: "https://velog.io",
    badge: "NEW POST",
    bgColor: "bg-[#E9D5FF]", // Electric Lilac
    icon: "✍️",
  },
  {
    id: "portfolio",
    category: "dev",
    categoryLabel: "WORK",
    title: "2026 포트폴리오 웹사이트",
    desc: "진행했던 주요 프로젝트 쇼케이스 및 인터랙티브 데모",
    url: "#",
    badge: "LIVE DEMO",
    bgColor: "bg-[#86EFAC]", // Vivid Mint
    icon: "🚀",
  },
  {
    id: "instagram",
    category: "social",
    categoryLabel: "SOCIAL",
    title: "인스타그램 & 디자인 아카이브",
    desc: "일상 스냅과 디자인 영감 아카이빙",
    url: "https://instagram.com",
    badge: "@mylink.design",
    bgColor: "bg-[#FECDD3]", // Bubblegum Pink
    icon: "📸",
  },
  {
    id: "contact",
    category: "social",
    categoryLabel: "CONTACT",
    title: "커피챗 & 협업 문의하기",
    desc: "새로운 프로젝트 제안이나 가벼운 티타임 언제든 환영해요",
    url: "mailto:hello@example.com",
    badge: "AVAILABLE",
    bgColor: "bg-[#BAE6FD]", // Sky Blue
    icon: "☕️",
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copied, setCopied] = useState(false);
  const [cheerCount, setCheerCount] = useState(128);
  const [cheerAnimation, setCheerAnimation] = useState(false);

  const filteredLinks =
    activeCategory === "all"
      ? LINKS
      : LINKS.filter((link) => link.category === activeCategory);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCheer = () => {
    setCheerCount((prev) => prev + 1);
    setCheerAnimation(true);
    setTimeout(() => setCheerAnimation(false), 300);
  };

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-black font-sans selection:bg-[#FFE600] selection:text-black pb-16">
      {/* 레트로 배경 점 패턴 (Subtle Halftone Grid) */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#000000 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* 상단 액션 바 */}
        <header className="flex items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#A3E635] border-2 border-black rounded-full font-mono text-xs font-black shadow-[2px_2px_0px_0px_#000]">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span>ONLINE & AVAILABLE</span>
          </div>

          <button
            onClick={handleCopyLink}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-[#FFE600] border-2 border-black rounded-lg font-mono text-xs font-black shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <span>✅</span>
                <span>복사 완료!</span>
              </>
            ) : (
              <>
                <span>🔗</span>
                <span>공유하기</span>
              </>
            )}
          </button>
        </header>

        {/* 프로필 메인 카드 */}
        <section className="relative bg-white border-[3px] border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] mb-8 text-center sm:text-left">
          {/* 상단 부착 스티커 */}
          <div className="absolute -top-3.5 right-6 bg-[#FF6B6B] text-white border-2 border-black px-3 py-0.5 rounded-md font-mono text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000] rotate-2">
            ✨ CREATOR
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* 아바타 */}
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#FFE600] border-[3px] border-black flex items-center justify-center text-4xl sm:text-5xl font-black shadow-[4px_4px_0px_0px_#000] select-none transition-transform group-hover:-rotate-3">
                👾
              </div>
              <div className="absolute -bottom-2 -right-2 bg-black text-white text-[10px] font-mono font-black px-2 py-0.5 rounded border border-black">
                DEV
              </div>
            </div>

            {/* 소개 정보 */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
                  카이롭터 (Kairohpter)
                </h1>
                <span className="bg-[#38BDF8] text-black border-2 border-black text-[11px] font-mono font-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_0px_#000]">
                  VERIFIED ✔
                </span>
              </div>

              <div className="inline-block bg-[#F4F4F5] border border-black px-2.5 py-0.5 rounded font-mono text-xs font-bold text-neutral-800">
                @mylink_official
              </div>

              <p className="text-sm font-semibold text-neutral-700 leading-snug pt-1">
                재미있고 직관적인 디지털 경험을 만드는 풀스택 개발자 & UI 디자이너입니다.
              </p>
            </div>
          </div>

          {/* 소셜 퀵 아이콘 바 */}
          <div className="mt-6 pt-5 border-t-2 border-black/10 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F4F5] hover:bg-[#FFE600] border-2 border-black rounded-lg text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <span>🐙</span> GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F4F5] hover:bg-[#38BDF8] border-2 border-black rounded-lg text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <span>🐦</span> Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F4F5] hover:bg-[#FB7185] border-2 border-black rounded-lg text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <span>📷</span> Instagram
            </a>
            <a
              href="mailto:contact@example.com"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F4F5] hover:bg-[#A3E635] border-2 border-black rounded-lg text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <span>✉️</span> Email
            </a>
          </div>
        </section>

        {/* 카테고리 필터 탭 */}
        <section className="mb-6">
          <div className="flex items-center justify-start gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: "all", label: "전체보기 (ALL)" },
              { id: "dev", label: "💻 개발 (DEV)" },
              { id: "blog", label: "✍️ 블로그 (BLOG)" },
              { id: "social", label: "🌐 소셜 (SOCIAL)" },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  type="button"
                  className={`px-3.5 py-1.5 text-xs font-mono font-black border-2 border-black rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-black text-white shadow-[3px_3px_0px_0px_#FFE600] -translate-y-0.5"
                      : "bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#FEF08A] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* 링크 카드 리스트 */}
        <main className="space-y-4 mb-8">
          {filteredLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center justify-between p-4 sm:p-5 ${link.bgColor} border-[3px] border-black rounded-xl shadow-[5px_5px_0px_0px_#000] hover:-translate-y-1 hover:translate-x-0.5 hover:shadow-[7px_7px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#000] transition-all block`}
            >
              <div className="flex items-start gap-3.5 sm:gap-4 pr-3">
                {/* 아이콘 */}
                <span className="text-2xl sm:text-3xl select-none pt-0.5 group-hover:scale-110 transition-transform">
                  {link.icon}
                </span>

                {/* 텍스트 내용 */}
                <div className="space-y-1 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] font-mono font-black tracking-wider uppercase">
                      {link.categoryLabel}
                    </span>
                    {link.badge && (
                      <span className="bg-white border border-black px-1.5 py-0.2 text-[10px] font-mono font-bold text-black shadow-[1px_1px_0px_0px_#000]">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-black leading-snug group-hover:underline decoration-2">
                    {link.title}
                  </h2>
                  <p className="text-xs font-semibold text-neutral-800 leading-relaxed">
                    {link.desc}
                  </p>
                </div>
              </div>

              {/* 오른쪽 클릭 화살표 버튼 */}
              <div className="shrink-0 w-10 h-10 rounded-lg bg-white border-2 border-black flex items-center justify-center font-black text-lg text-black shadow-[2px_2px_0px_0px_#000] group-hover:rotate-12 group-hover:bg-[#FFE600] transition-transform">
                ↗
              </div>
            </a>
          ))}
        </main>

        {/* 레트로 메모 / 공지사항 박스 */}
        <section className="relative mb-8 pt-3">
          {/* 상단 테이프 연출 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#FEF08A]/90 border border-black/30 rotate-[-1.5deg] z-10 shadow-sm pointer-events-none" />

          <div className="bg-[#FEF9C3] border-[3px] border-black rounded-xl p-5 shadow-[5px_5px_0px_0px_#000] text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">📌</span>
              <h3 className="font-mono font-black text-xs uppercase tracking-wider text-black bg-black text-[#FEF08A] px-2 py-0.5 rounded">
                NOTICE & NEWS
              </h3>
            </div>
            <p className="text-xs font-bold text-neutral-800 leading-relaxed">
              ⚡️ Neobrutalism 스타일로 새롭게 리뉴얼되었습니다! Next.js 16과 Tailwind CSS 기반으로 제작되었으며 언제든 협업 요청을 환영합니다.
            </p>
          </div>
        </section>

        {/* 인터랙티브 응원(Cheer) 버튼 */}
        <section className="flex flex-col items-center justify-center gap-3 mb-12">
          <button
            onClick={handleCheer}
            type="button"
            className={`flex items-center gap-2.5 px-6 py-3 bg-[#FF6B6B] hover:bg-[#FF5252] text-white border-[3px] border-black rounded-xl font-mono text-sm font-black shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer ${
              cheerAnimation ? "scale-105" : ""
            }`}
          >
            <span className="text-lg">❤️</span>
            <span>응원 보내기</span>
            <span className="bg-black text-[#FFE600] px-2 py-0.5 rounded text-xs font-mono">
              {cheerCount}
            </span>
          </button>
          <span className="font-mono text-[11px] text-neutral-600 font-bold">
            클릭하여 응원 카운트를 올려보세요! 🚀
          </span>
        </section>

        {/* 푸터 */}
        <footer className="pt-6 border-t-[3px] border-black text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-2 py-0.5 bg-white border border-black rounded text-[10px] font-mono font-black shadow-[1px_1px_0px_0px_#000]">
              NEXT.JS 16
            </span>
            <span className="px-2 py-0.5 bg-white border border-black rounded text-[10px] font-mono font-black shadow-[1px_1px_0px_0px_#000]">
              TAILWIND CSS
            </span>
            <span className="px-2 py-0.5 bg-[#A3E635] border border-black rounded text-[10px] font-mono font-black shadow-[1px_1px_0px_0px_#000]">
              NEOBRUTALISM
            </span>
          </div>

          <p className="font-mono text-xs font-bold text-neutral-800">
            © 2026 MyLink. Built with raw energy & thick borders.
          </p>
        </footer>
      </div>
    </div>
  );
}
