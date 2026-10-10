"use client";

import { useSyncExternalStore } from "react";
import { LinkItem } from "@/types/link";
import initialLinksData from "@/data/links.json";

const STORAGE_KEY = "mylink_custom_links";

let memoryLinks: LinkItem[] = initialLinksData as LinkItem[];
let isInitialized = false;

function initFromStorage() {
  if (typeof window === "undefined" || isInitialized) return;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryLinks = parsed;
      }
    }
  } catch {
    // ignore parsing errors
  }
  isInitialized = true;
}

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeLinks(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function getLinksSnapshot(): LinkItem[] {
  initFromStorage();
  return memoryLinks;
}

export function getLinksServerSnapshot(): LinkItem[] {
  return initialLinksData as LinkItem[];
}

export function setStoredLinks(updated: LinkItem[]) {
  memoryLinks = updated;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }
  emitChange();
}

export function useLinks() {
  const links = useSyncExternalStore(
    subscribeLinks,
    getLinksSnapshot,
    getLinksServerSnapshot
  );
  return [links, setStoredLinks] as const;
}
