import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error = false,
      errorMessage,
      label,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-mono text-xs font-black uppercase tracking-wider text-black"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-neutral-600">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-lg font-mono text-sm font-bold text-black placeholder:text-neutral-400 placeholder:font-normal",
              "transition-all duration-150 outline-none",
              "focus:shadow-[3px_3px_0px_0px_#000] focus:bg-[#FFFDF8]",
              "disabled:bg-neutral-100 disabled:opacity-60 disabled:cursor-not-allowed",
              leftIcon ? "pl-10" : "",
              rightIcon ? "pr-10" : "",
              error && "border-[#FF5252] focus:shadow-[3px_3px_0px_0px_#FF5252]",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center text-neutral-600">
              {rightIcon}
            </div>
          )}
        </div>
        {errorMessage && (
          <p className="font-mono text-xs font-black text-[#FF5252] mt-1">
            ⚠ {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
