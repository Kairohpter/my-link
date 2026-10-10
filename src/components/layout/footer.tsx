import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brandName?: string;
  year?: number;
}

export function Footer({
  brandName = "MyLink",
  year = 2026,
  className,
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn(
        "pt-8 border-t-[3px] border-black text-center space-y-3.5",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="white" size="sm">
          NEXT.JS 16
        </Badge>
        <Badge variant="white" size="sm">
          TAILWIND CSS V4
        </Badge>
        <Badge variant="mint" size="sm">
          NEOBRUTALISM
        </Badge>
      </div>

      <p className="font-mono text-xs font-bold text-neutral-800">
        © {year} {brandName}. Built with raw energy & thick borders.
      </p>
    </footer>
  );
}
