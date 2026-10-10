import React, { forwardRef } from "react";
import { cn, getBgColorStyle } from "@/lib/utils";

export type CardColorVariant =
  | "white"
  | "yellow"
  | "yellow-light"
  | "mint"
  | "purple"
  | "pink"
  | "blue"
  | "cream"
  | "none";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  colorVariant?: CardColorVariant;
  bgColor?: string;
  interactive?: boolean;
  shadowSize?: "sm" | "md" | "lg" | "xl";
  borderWidth?: "2" | "3" | "4";
}

const colorStyles: Record<Exclude<CardColorVariant, "none">, string> = {
  white: "bg-white text-black",
  yellow: "bg-[#FFE600] text-black",
  "yellow-light": "bg-[#FEF08A] text-black",
  mint: "bg-[#86EFAC] text-black",
  purple: "bg-[#E9D5FF] text-black",
  pink: "bg-[#FECDD3] text-black",
  blue: "bg-[#BAE6FD] text-black",
  cream: "bg-[#FAF7EE] text-black",
};

const shadowStyles = {
  sm: "shadow-[3px_3px_0px_0px_#000]",
  md: "shadow-[5px_5px_0px_0px_#000]",
  lg: "shadow-[6px_6px_0px_0px_#000]",
  xl: "shadow-[8px_8px_0px_0px_#000]",
};

const borderStyles = {
  "2": "border-2 border-black",
  "3": "border-[3px] border-black",
  "4": "border-4 border-black",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      colorVariant,
      bgColor,
      interactive = false,
      shadowSize = "md",
      borderWidth = "3",
      style,
      children,
      ...props
    },
    ref
  ) => {
    // bgColor prop 또는 className / style로부터 유효한 배경 스타일 추출
    const extractedBgStyle = getBgColorStyle(bgColor || className);
    const mergedStyle = {
      ...extractedBgStyle,
      ...style,
    };

    // 배경색이 명시적으로 지정되었는지 확인 (bgColor prop, className의 bg- 클래스, style의 backgroundColor)
    const hasExplicitBg =
      Boolean(bgColor) ||
      Boolean(mergedStyle.backgroundColor) ||
      Boolean(mergedStyle.background) ||
      (Boolean(className) && /\bbg-/.test(className!));

    // colorVariant가 주어지지 않은 경우:
    // 이미 배경색이 지정되어 있으면 'bg-white'를 입히지 않고 'text-black'만 부여하여 충돌 방지
    const appliedColorClass = colorVariant
      ? colorVariant === "none"
        ? ""
        : colorStyles[colorVariant]
      : hasExplicitBg
      ? "text-black"
      : "bg-white text-black";

    return (
      <div
        ref={ref}
        style={mergedStyle}
        className={cn(
          "rounded-2xl transition-all",
          borderStyles[borderWidth],
          shadowStyles[shadowSize],
          appliedColorClass,
          interactive &&
            "hover:-translate-y-1 hover:translate-x-0.5 hover:shadow-[7px_7px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#000] cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-xl sm:text-2xl font-black leading-snug tracking-tight text-black",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs sm:text-sm font-semibold text-neutral-800", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center p-6 pt-0 border-t-2 border-black/10 mt-4",
        className
      )}
      {...props}
    />
  );
}
