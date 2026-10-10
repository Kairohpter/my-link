import React from "react";
import { cn } from "@/lib/utils";

export type AvatarSize = "sm" | "md" | "lg" | "xl";
export type AvatarColor = "yellow" | "pink" | "mint" | "purple" | "blue" | "white";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  color?: AvatarColor;
  badge?: string;
  emoji?: string;
  src?: string;
  alt?: string;
}

const sizeStyles: Record<AvatarSize, { box: string; text: string; badge: string }> = {
  sm: { box: "w-12 h-12 rounded-xl", text: "text-xl", badge: "text-[9px] -bottom-1 -right-1" },
  md: { box: "w-16 h-16 rounded-xl", text: "text-2xl", badge: "text-[10px] -bottom-1.5 -right-1.5" },
  lg: { box: "w-24 h-24 rounded-2xl", text: "text-4xl", badge: "text-[10px] -bottom-2 -right-2" },
  xl: { box: "w-28 h-28 rounded-2xl", text: "text-5xl", badge: "text-xs -bottom-2.5 -right-2.5" },
};

const colorStyles: Record<AvatarColor, string> = {
  yellow: "bg-[#FFE600]",
  pink: "bg-[#FF6B6B]",
  mint: "bg-[#86EFAC]",
  purple: "bg-[#C084FC]",
  blue: "bg-[#38BDF8]",
  white: "bg-white",
};

export function Avatar({
  size = "lg",
  color = "yellow",
  badge,
  emoji = "👾",
  src,
  alt = "avatar",
  className,
  ...props
}: AvatarProps) {
  const { box, text, badge: badgePos } = sizeStyles[size];

  return (
    <div className={cn("relative inline-block select-none group", className)} {...props}>
      <div
        className={cn(
          "border-[3px] border-black flex items-center justify-center font-black shadow-[4px_4px_0px_0px_#000] overflow-hidden transition-transform group-hover:-rotate-3",
          box,
          colorStyles[color]
        )}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span className={cn(text)}>{emoji}</span>
        )}
      </div>

      {badge && (
        <div
          className={cn(
            "absolute bg-black text-white font-mono font-black px-1.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#FFE600]",
            badgePos
          )}
        >
          {badge}
        </div>
      )}
    </div>
  );
}
