import React from "react";
import { cn } from "@/lib/utils";

export interface StickyMemoProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  badgeText?: string;
  icon?: React.ReactNode;
  tapeColor?: string;
  memoColor?: string;
  tapeRotation?: string;
}

export function StickyMemo({
  title,
  badgeText = "NOTICE & NEWS",
  icon = "📌",
  tapeColor = "bg-[#FEF08A]/90",
  memoColor = "bg-[#FEF9C3]",
  tapeRotation = "rotate-[-1.5deg]",
  className,
  children,
  ...props
}: StickyMemoProps) {
  return (
    <div className={cn("relative pt-3", className)} {...props}>
      {/* 상단 마스킹 테이프 장식 */}
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 border border-black/30 z-10 shadow-sm pointer-events-none",
          tapeColor,
          tapeRotation
        )}
      />

      {/* 메모지 본문 카드 */}
      <div
        className={cn(
          "border-[3px] border-black rounded-xl p-5 shadow-[5px_5px_0px_0px_#000] text-left",
          memoColor
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          {icon && <span className="text-base select-none">{icon}</span>}
          {badgeText && (
            <span className="font-mono font-black text-xs uppercase tracking-wider text-[#FEF08A] bg-black px-2 py-0.5 rounded border border-black">
              {badgeText}
            </span>
          )}
          {title && (
            <span className="font-mono font-black text-xs text-black">
              {title}
            </span>
          )}
        </div>

        <div className="text-xs font-bold text-neutral-800 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
