import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, errorMessage, label, id, ...props }, ref) => {
    const textareaId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="block font-mono text-xs font-black uppercase tracking-wider text-black"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-lg font-mono text-sm font-bold text-black placeholder:text-neutral-400 placeholder:font-normal",
            "transition-all duration-150 outline-none resize-y min-h-[96px]",
            "focus:shadow-[3px_3px_0px_0px_#000] focus:bg-[#FFFDF8]",
            "disabled:bg-neutral-100 disabled:opacity-60 disabled:cursor-not-allowed",
            error && "border-[#FF5252] focus:shadow-[3px_3px_0px_0px_#FF5252]",
            className
          )}
          {...props}
        />
        {errorMessage && (
          <p className="font-mono text-xs font-black text-[#FF5252] mt-1">
            ⚠ {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
