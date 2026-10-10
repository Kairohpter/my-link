import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "yellow"
  | "pink"
  | "mint"
  | "purple"
  | "blue"
  | "white"
  | "black"
  | "outline";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  yellow:
    "bg-[#FFE600] text-black hover:bg-[#FEF08A] shadow-[3px_3px_0px_0px_#000]",
  pink:
    "bg-[#FF6B6B] text-white hover:bg-[#FF5252] shadow-[3px_3px_0px_0px_#000]",
  mint:
    "bg-[#A3E635] text-black hover:bg-[#86EFAC] shadow-[3px_3px_0px_0px_#000]",
  purple:
    "bg-[#C084FC] text-black hover:bg-[#D8B4FE] shadow-[3px_3px_0px_0px_#000]",
  blue:
    "bg-[#38BDF8] text-black hover:bg-[#7DD3FC] shadow-[3px_3px_0px_0px_#000]",
  white:
    "bg-white text-black hover:bg-[#FFE600] shadow-[3px_3px_0px_0px_#000]",
  black:
    "bg-black text-white hover:bg-neutral-800 shadow-[3px_3px_0px_0px_#FFE600]",
  outline:
    "bg-transparent text-black hover:bg-black/5 shadow-[2px_2px_0px_0px_#000]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base shadow-[4px_4px_0px_0px_#000]",
  icon: "w-10 h-10 p-0 text-base flex-shrink-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "white",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-mono font-black border-2 border-black rounded-lg transition-all cursor-pointer select-none",
          "hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
