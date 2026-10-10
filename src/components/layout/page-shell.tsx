import React from "react";
import { cn } from "@/lib/utils";

export interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "md" | "xl" | "2xl" | "4xl" | "6xl" | "full";
  showPattern?: boolean;
}

const maxWidthMap = {
  md: "max-w-md",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
  full: "max-w-full",
};

export function PageShell({
  maxWidth = "xl",
  showPattern = true,
  className,
  children,
  ...props
}: PageShellProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-[#FAF7EE] text-black font-sans selection:bg-[#FFE600] selection:text-black pb-16 relative",
        className
      )}
      {...props}
    >
      {/* 레트로 배경 점 패턴 (Subtle Halftone Grid) */}
      {showPattern && (
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.04] z-0"
          style={{
            backgroundImage: "radial-gradient(#000000 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px",
          }}
        />
      )}

      {/* 메인 컨텐츠 컨테이너 */}
      <div
        className={cn(
          "relative z-10 mx-auto px-4 sm:px-6 pt-8 sm:pt-12",
          maxWidthMap[maxWidth]
        )}
      >
        {children}
      </div>
    </div>
  );
}
