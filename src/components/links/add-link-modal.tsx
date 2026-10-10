"use client";

import React, { useState } from "react";
import { LinkCategory, LinkItem } from "@/types/link";
import { Button, Badge, Card, Input, Textarea } from "@/components/ui";
import { validateAndFormatUrl } from "@/lib/utils";

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLinkAdded: (newLink: LinkItem) => void;
}

const CATEGORY_OPTIONS: { id: LinkCategory; label: string; badgeLabel: string; emoji: string }[] = [
  { id: "dev", label: "개발", badgeLabel: "DEVELOPMENT", emoji: "💻" },
  { id: "blog", label: "블로그", badgeLabel: "ARTICLE", emoji: "✍️" },
  { id: "project", label: "프로젝트", badgeLabel: "PROJECT", emoji: "🚀" },
  { id: "social", label: "소셜", badgeLabel: "SOCIAL", emoji: "🌐" },
  { id: "resource", label: "자료", badgeLabel: "RESOURCE", emoji: "⚡️" },
];

const EMOJI_PRESETS = ["🔗", "💻", "✍️", "🚀", "🌐", "⚡️", "🔥", "🎬", "📸", "🎨", "📦", "💡", "☕️", "✨", "📌", "⭐"];

const BG_COLOR_OPTIONS = [
  { label: "Yellow", value: "bg-[#FEF08A]", hex: "#FEF08A" },
  { label: "Mint", value: "bg-[#86EFAC]", hex: "#86EFAC" },
  { label: "Purple", value: "bg-[#E9D5FF]", hex: "#E9D5FF" },
  { label: "Pink", value: "bg-[#FECDD3]", hex: "#FECDD3" },
  { label: "Blue", value: "bg-[#BAE6FD]", hex: "#BAE6FD" },
  { label: "White", value: "bg-white", hex: "#FFFFFF" },
];

const BADGE_PRESETS = ["NEW", "HOT 🔥", "추천 ⭐", "공식 ✔", "LIVE", "v1.0"];

export function AddLinkModal({ isOpen, onClose, onLinkAdded }: AddLinkModalProps) {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState<string | null>(null);

  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);

  const [category, setCategory] = useState<LinkCategory>("dev");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("🔗");
  const [bgColor, setBgColor] = useState("bg-[#FEF08A]");
  const [badge, setBadge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCategoryObj = CATEGORY_OPTIONS.find((c) => c.id === category) || CATEGORY_OPTIONS[0];

  const resetForm = () => {
    setTitle("");
    setTitleError(null);
    setUrl("");
    setUrlError(null);
    setCategory("dev");
    setDesc("");
    setIcon("🔗");
    setBgColor("bg-[#FEF08A]");
    setBadge("");
    setErrorMessage(null);
  };

  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onClose();
    }
  };

  // URL 포커스 아웃 시 즉시 유효성 검사
  const handleUrlBlur = () => {
    if (!url.trim()) {
      return;
    }
    const validation = validateAndFormatUrl(url);
    if (!validation.isValid) {
      setUrlError(validation.error || "올바른 URL 형식이 아닙니다.");
    } else {
      setUrlError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    let hasError = false;

    // 제목 유효성 검사
    if (!title.trim()) {
      setTitleError("링크 제목을 입력해주세요.");
      hasError = true;
    } else {
      setTitleError(null);
    }

    // URL 유효성 검사
    const urlValidation = validateAndFormatUrl(url);
    if (!urlValidation.isValid) {
      setUrlError(urlValidation.error || "올바른 URL 형식이 아닙니다.");
      hasError = true;
    } else {
      setUrlError(null);
    }

    if (hasError) {
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        title: title.trim(),
        url: urlValidation.formattedUrl,
        category,
        categoryLabel: currentCategoryObj.badgeLabel,
        desc: desc.trim(),
        badge: badge.trim() || undefined,
        bgColor,
        icon: icon.trim() || "🔗",
        tags: [category, "custom"],
        isActive: true,
      };

      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "링크 추가에 실패했습니다.");
      }

      onLinkAdded(data.data);
      resetForm();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("링크 추가 중 예상치 못한 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-[#FAF7EE] border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000] overflow-hidden">
        {/* 모달 헤더 바 */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#FFE600] border-b-4 border-black shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h2 className="font-mono text-base sm:text-lg font-black tracking-tight text-black">
              새 링크 추가 (ADD NEW LINK)
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center font-mono font-black text-sm text-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 hover:rotate-6 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* 모달 본문 폼 */}
        <form onSubmit={handleSubmit} noValidate className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* 에러 메시지 알림 배너 */}
          {errorMessage && (
            <div className="p-3 bg-[#FF6B6B] border-2 border-black rounded-xl text-white font-mono text-xs font-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="text-white hover:underline font-bold"
              >
                닫기
              </button>
            </div>
          )}

          {/* 1. 카테고리 선택 */}
          <div className="space-y-1.5">
            <label className="block font-mono text-xs font-black uppercase tracking-wider text-black">
              카테고리 분류 <span className="text-[#FF5252]">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {CATEGORY_OPTIONS.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategory(cat.id);
                      if (icon === "🔗") setIcon(cat.emoji);
                    }}
                    className={`py-2 px-2.5 rounded-lg border-2 border-black font-mono text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? "bg-[#FFE600] shadow-[3px_3px_0px_0px_#000] -translate-y-0.5"
                        : "bg-white hover:bg-neutral-100 shadow-[1px_1px_0px_0px_#000]"
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. 링크 제목 & URL */}
          <div className="space-y-4">
            <Input
              label="링크 제목 *"
              placeholder="예: 🎬 최신 유튜브 영상 바로가기"
              value={title}
              error={Boolean(titleError)}
              errorMessage={titleError || undefined}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError(null);
              }}
              required
            />

            <div>
              <Input
                label="대상 URL 주소 *"
                placeholder="예: naver.com 또는 https://example.com"
                value={url}
                error={Boolean(urlError)}
                errorMessage={urlError || undefined}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (urlError) setUrlError(null);
                }}
                onBlur={handleUrlBlur}
                required
              />
              <p className="font-mono text-[11px] text-neutral-500 mt-1 pl-1">
                💡 `https://`를 생략하고 `naver.com` 형태로 입력해도 자동으로 안전하게 연결됩니다.
              </p>
            </div>
          </div>

          {/* 3. 설명 (선택) */}
          <div>
            <Textarea
              label="간단한 설명 (선택)"
              placeholder="링크에 대한 보충 설명이나 소개 문구를 작성해주세요."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={2}
              className="min-h-[70px]"
            />
          </div>

          {/* 4. 아이콘 & 뱃지 선택 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 이모지 아이콘 */}
            <div className="space-y-1.5">
              <label className="block font-mono text-xs font-black uppercase tracking-wider text-black">
                아이콘 이모지
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={4}
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-12 h-10 text-center text-xl bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] outline-none"
                />
                <div className="flex-1 flex flex-wrap gap-1 max-h-20 overflow-y-auto p-1 bg-white border-2 border-black/20 rounded-lg">
                  {EMOJI_PRESETS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setIcon(emoji)}
                      className={`w-7 h-7 text-sm rounded hover:bg-neutral-100 cursor-pointer flex items-center justify-center ${
                        icon === emoji ? "bg-[#FFE600] font-bold border border-black" : ""
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 뱃지 태그 */}
            <div className="space-y-1.5">
              <label className="block font-mono text-xs font-black uppercase tracking-wider text-black">
                뱃지 태그 (선택)
              </label>
              <Input
                placeholder="예: HOT, NEW, 30% OFF"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {BADGE_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setBadge(preset)}
                    className="text-[10px] font-mono font-bold px-2 py-0.5 bg-white border border-black rounded shadow-[1px_1px_0px_0px_#000] hover:bg-[#FEF08A] cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 5. 카드 배경색 선택 */}
          <div className="space-y-1.5">
            <label className="block font-mono text-xs font-black uppercase tracking-wider text-black">
              카드 배경 컬러
            </label>
            <div className="flex flex-wrap items-center gap-2.5">
              {BG_COLOR_OPTIONS.map((col) => {
                const isSelected = bgColor === col.value;
                return (
                  <button
                    key={col.value}
                    type="button"
                    onClick={() => setBgColor(col.value)}
                    style={{ backgroundColor: col.hex }}
                    className={`h-9 px-3 rounded-lg border-2 border-black font-mono text-xs font-black text-black flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? "shadow-[3px_3px_0px_0px_#000] -translate-y-0.5 ring-2 ring-black"
                        : "opacity-80 hover:opacity-100 shadow-[1px_1px_0px_0px_#000]"
                    }`}
                  >
                    <span>{isSelected ? "✔" : "■"}</span>
                    <span>{col.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. 실시간 카드 미리보기 */}
          <div className="space-y-2 pt-2 border-t-2 border-black/10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black uppercase text-neutral-600">
                👀 실시간 미리보기 (LIVE PREVIEW)
              </span>
              <span className="font-mono text-[11px] text-neutral-500 font-bold">
                카드 형태 확인
              </span>
            </div>

            <Card
              borderWidth="3"
              bgColor={bgColor}
              className="p-4 flex items-center justify-between transition-colors"
            >
              <div className="flex items-start gap-3.5 pr-3 min-w-0">
                <span className="text-2xl select-none pt-0.5 shrink-0">{icon || "🔗"}</span>
                <div className="space-y-1 text-left min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="black" size="sm">
                      {currentCategoryObj.badgeLabel}
                    </Badge>
                    {badge.trim() && (
                      <Badge variant="white" size="sm">
                        {badge.trim()}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-base font-black text-black leading-snug truncate">
                    {title.trim() || "링크 제목이 여기에 표시됩니다"}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-800 leading-relaxed line-clamp-2">
                    {desc.trim() || "설명 문구가 여기에 표시됩니다."}
                  </p>
                </div>
              </div>
              <div className="shrink-0 w-9 h-9 rounded-lg bg-white border-2 border-black flex items-center justify-center font-black text-base text-black shadow-[2px_2px_0px_0px_#000]">
                ↗
              </div>
            </Card>
          </div>

          {/* 모달 푸터 버튼 바 */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t-2 border-black/10 shrink-0">
            <Button
              type="button"
              variant="white"
              size="md"
              disabled={isLoading}
              onClick={handleClose}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="yellow"
              size="md"
              isLoading={isLoading}
              leftIcon={<span>➕</span>}
            >
              링크 등록하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
