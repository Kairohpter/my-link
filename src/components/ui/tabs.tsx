"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ items, activeId, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-start gap-2 overflow-x-auto pb-1.5 scrollbar-none",
        className
      )}
    >
      {items.map((tab) => {
        const isActive = activeId === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-black border-2 border-black rounded-lg transition-all cursor-pointer whitespace-nowrap select-none",
              isActive
                ? "bg-black text-white shadow-[3px_3px_0px_0px_#FFE600] -translate-y-0.5"
                : "bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#FEF08A] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {typeof tab.count === "number" && (
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full border border-black",
                  isActive
                    ? "bg-[#FFE600] text-black font-black"
                    : "bg-neutral-100 text-neutral-800"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
