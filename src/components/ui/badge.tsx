import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "yellow"
  | "mint"
  | "pink"
  | "purple"
  | "blue"
  | "white"
  | "black"
  | "outline";

export type BadgeRotate = "-2" | "-1" | "0" | "1" | "2";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  rotate?: BadgeRotate;
  dot?: boolean;
  dotColor?: string;
  size?: "sm" | "md";
}

const variantStyles: Record<BadgeVariant, string> = {
  yellow: "bg-[#FFE600] text-black shadow-[1.5px_1.5px_0px_0px_#000]",
  mint: "bg-[#A3E635] text-black shadow-[1.5px_1.5px_0px_0px_#000]",
  pink: "bg-[#FF6B6B] text-white shadow-[1.5px_1.5px_0px_0px_#000]",
  purple: "bg-[#C084FC] text-black shadow-[1.5px_1.5px_0px_0px_#000]",
  blue: "bg-[#38BDF8] text-black shadow-[1.5px_1.5px_0px_0px_#000]",
  white: "bg-white text-black shadow-[1.5px_1.5px_0px_0px_#000]",
  black: "bg-black text-white shadow-[1.5px_1.5px_0px_0px_#FFE600]",
  outline: "bg-transparent text-black shadow-[1px_1px_0px_0px_#000]",
};

const rotateStyles: Record<BadgeRotate, string> = {
  "-2": "-rotate-2",
  "-1": "-rotate-1",
  "0": "rotate-0",
  "1": "rotate-1",
  "2": "rotate-2",
};

export function Badge({
  className,
  variant = "black",
  rotate = "0",
  dot = false,
  dotColor = "bg-black",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-black rounded font-mono font-black uppercase tracking-wider select-none",
        size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2.5 py-1",
        variantStyles[variant],
        rotateStyles[rotate],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-2 h-2 rounded-full inline-block animate-pulse",
            dotColor
          )}
        />
      )}
      {children}
    </span>
  );
}
