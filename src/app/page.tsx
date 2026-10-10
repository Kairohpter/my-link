"use client";

import { useState } from "react";
import Link from "next/link";
import { LinkItem } from "@/types/link";
import { PageShell } from "@/components/layout/page-shell";
import { Footer } from "@/components/layout/footer";
import {
  Button,
  Badge,
  Card,
  Tabs,
  StickyMemo,
  Avatar,
} from "@/components/ui";
import { AddLinkModal } from "@/components/links";
import { useLinks } from "@/lib/links-store";

const CATEGORY_CONFIG = [
  { id: "all", label: "전체보기 (ALL)" },
  { id: "dev", label: "💻 개발 (DEV)" },
  { id: "blog", label: "✍️ 블로그 (BLOG)" },
  { id: "project", label: "🚀 프로젝트 (WORK)" },
  { id: "social", label: "🌐 소셜 (SOCIAL)" },
  { id: "resource", label: "⚡️ 자료 (RESOURCE)" },
];

export default function Home() {
  const [links, saveLinks] = useLinks();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copied, setCopied] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLinkClick = (id: string) => {
    // 클릭수 통계 비동기 연동
    fetch(`/api/links/${id}?action=click`, { method: "PATCH" }).catch(() => {});
    // 로컬 상태에서도 클릭수 증가 반영
    const updated = links.map((l) => (l.id === id ? { ...l, clicks: l.clicks + 1 } : l));
    saveLinks(updated);
  };

  // 새 링크 추가 완료 처리
  const handleLinkAdded = (newLink: LinkItem) => {
    const updated = [newLink, ...links];
    saveLinks(updated);

    // 추가된 링크를 바로 확인할 수 있도록 활성 카테고리 전환 또는 유지
    if (activeCategory !== "all" && activeCategory !== newLink.category) {
      setActiveCategory(newLink.category);
    }

    setToastMessage(`"${newLink.title}" 링크가 성공적으로 추가되었습니다! 🎉`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // 링크 삭제 처리
  const handleDeleteLink = (e: React.MouseEvent, id: string, title: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm(`"${title}" 링크를 정말 삭제하시겠습니까?`)) {
      fetch(`/api/links/${id}`, { method: "DELETE" }).catch(() => {});
      const updated = links.filter((l) => l.id !== id);
      saveLinks(updated);
      setToastMessage(`링크가 삭제되었습니다.`);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const filteredLinks =
    activeCategory === "all"
      ? links
      : links.filter((link) => link.category === activeCategory);

  // 탭 목록에 동적 카운트 매핑
  const tabItems = CATEGORY_CONFIG.map((cat) => ({
    id: cat.id,
    label: cat.label,
    count:
      cat.id === "all"
        ? links.length
        : links.filter((l) => l.category === cat.id).length,
  }));

  return (
    <PageShell maxWidth="xl">
      {/* 토스트 알림 메시지 */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#FFE600] border-3 border-black rounded-xl px-4 py-2.5 shadow-[4px_4px_0px_0px_#000] font-mono text-xs sm:text-sm font-black text-black flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <span>✨</span>
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-xs font-bold hover:opacity-70"
          >
            ✕
          </button>
        </div>
      )}

      {/* 상단 액션 바 */}
      <header className="flex flex-wrap items-center justify-between gap-2.5 mb-6">
        <Badge variant="mint" dot dotColor="bg-black">
          ONLINE & AVAILABLE
        </Badge>

        <div className="flex flex-wrap items-center gap-2">
          {/* 새 링크 추가 버튼 */}
          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="yellow"
            size="sm"
            leftIcon={<span>➕</span>}
            className="shadow-[3px_3px_0px_0px_#000]"
          >
            새 링크 추가
          </Button>

          {/* 디자인 시스템 가이드 이동 링크 */}
          <Link href="/design-system">
            <Button
              variant="white"
              size="sm"
              className="text-[11px] px-2.5 py-1"
              title="디자인 시스템 컴포넌트 가이드 보기"
            >
              🎨 시스템 가이드
            </Button>
          </Link>

          <Button
            onClick={handleCopyLink}
            variant="white"
            size="sm"
            leftIcon={<span>{copied ? "✅" : "🔗"}</span>}
          >
            {copied ? "복사 완료!" : "공유하기"}
          </Button>
        </div>
      </header>

      {/* 프로필 메인 카드 */}
      <Card colorVariant="white" className="relative p-6 sm:p-8 mb-8 text-center sm:text-left">
        {/* 상단 부착 스티커 */}
        <Badge
          variant="pink"
          rotate="2"
          className="absolute -top-3.5 right-6 px-3 py-1 shadow-[2px_2px_0px_0px_#000]"
        >
          ✨ CREATOR
        </Badge>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* 아바타 */}
          <Avatar size="xl" emoji="👾" color="yellow" badge="DEV" />

          {/* 소개 정보 */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
                사임당
              </h1>
              <Badge variant="blue" size="sm">
                VERIFIED ✔
              </Badge>
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
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button variant="white" size="sm" leftIcon={<span>🐙</span>}>
              GitHub
            </Button>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Button variant="white" size="sm" leftIcon={<span>🐦</span>}>
              Twitter
            </Button>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Button variant="white" size="sm" leftIcon={<span>📷</span>}>
              Instagram
            </Button>
          </a>
          <a href="mailto:contact@example.com">
            <Button variant="white" size="sm" leftIcon={<span>✉️</span>}>
              Email
            </Button>
          </a>
        </div>
      </Card>

      {/* 카테고리 필터 탭 */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs font-black text-neutral-600 uppercase">
            카테고리별 탐색
          </span>
          <span className="font-mono text-xs font-bold text-neutral-500">
            총 {links.length}개 링크
          </span>
        </div>
        <Tabs
          items={tabItems}
          activeId={activeCategory}
          onChange={setActiveCategory}
        />
      </section>

      {/* 링크 카드 리스트 */}
      <main className="space-y-4 mb-8">
        {filteredLinks.length === 0 ? (
          <div className="border-[3px] border-dashed border-black rounded-2xl p-8 sm:p-12 text-center bg-white shadow-[4px_4px_0px_0px_#000] space-y-4">
            <span className="text-4xl block">🔍</span>
            <div className="space-y-1">
              <h3 className="font-mono text-lg font-black text-black">
                해당 카테고리에 링크가 없습니다!
              </h3>
              <p className="font-mono text-xs font-semibold text-neutral-600">
                지금 바로 첫 번째 링크를 추가해보세요.
              </p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              variant="yellow"
              size="md"
              leftIcon={<span>➕</span>}
            >
              새 링크 등록하기
            </Button>
          </div>
        ) : (
          filteredLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              onClick={() => handleLinkClick(link.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="block group relative"
            >
              <Card
                interactive
                borderWidth="3"
                bgColor={link.bgColor}
                className="p-4 sm:p-5 flex items-center justify-between"
              >
                <div className="flex items-start gap-3.5 sm:gap-4 pr-3 min-w-0">
                  {/* 아이콘 */}
                  <span className="text-2xl sm:text-3xl select-none pt-0.5 group-hover:scale-110 transition-transform shrink-0">
                    {link.icon}
                  </span>

                  {/* 텍스트 내용 */}
                  <div className="space-y-1 text-left min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="black" size="sm">
                        {link.categoryLabel}
                      </Badge>
                      {link.badge && (
                        <Badge variant="white" size="sm">
                          {link.badge}
                        </Badge>
                      )}
                      {link.clicks > 0 && (
                        <span className="text-[10px] font-mono font-bold text-neutral-600">
                          🔥 {link.clicks}회 클릭
                        </span>
                      )}
                    </div>
                    <h2 className="text-base sm:text-lg font-black text-black leading-snug truncate">
                      {link.title}
                    </h2>
                    {link.desc && (
                      <p className="text-xs font-semibold text-neutral-800 leading-relaxed line-clamp-2">
                        {link.desc}
                      </p>
                    )}
                  </div>
                </div>

                {/* 오른쪽 액션 영역: 삭제 버튼 & 이동 화살표 */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleDeleteLink(e, link.id, link.title)}
                    className="w-9 h-9 rounded-lg bg-white/80 hover:bg-[#FF6B6B] hover:text-white border-2 border-black flex items-center justify-center font-mono text-sm text-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                    title="링크 삭제"
                    aria-label="링크 삭제"
                  >
                    🗑️
                  </button>

                  <div className="w-10 h-10 rounded-lg bg-white border-2 border-black flex items-center justify-center font-black text-lg text-black shadow-[2px_2px_0px_0px_#000] group-hover:rotate-12 transition-transform">
                    ↗
                  </div>
                </div>
              </Card>
            </a>
          ))
        )}
      </main>

      {/* 추가 유도 배너 */}
      <section className="mb-8">
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="w-full py-4 px-5 border-[3px] border-dashed border-black rounded-2xl bg-[#FFFDF8] hover:bg-[#FEF08A] transition-all flex items-center justify-center gap-2.5 font-mono font-black text-sm text-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
        >
          <span className="text-lg">➕</span>
          <span>새로운 링크 추가하기 (ADD NEW LINK)</span>
        </button>
      </section>

      {/* 레트로 스티키 메모 / 공지사항 */}
      <section className="mb-10">
        <StickyMemo
          badgeText="NOTICE & NEWS"
          title="디자인 시스템 & 링크 관리 안내"
          icon="📌"
        >
          ⚡️ 네오브루탈리즘 디자인 시스템(Design System v1.0)에 링크 추가 기능이 적용되었습니다! 상단 [새 링크 추가] 버튼을 눌러 나만의 링크를 등록하고 실시간으로 확인해보세요.
        </StickyMemo>
      </section>

      {/* 공통 푸터 */}
      <Footer />

      {/* 링크 추가 모달 */}
      <AddLinkModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onLinkAdded={handleLinkAdded}
      />
    </PageShell>
  );
}
