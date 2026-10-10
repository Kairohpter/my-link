import { LinkItem, LinkCategory, PaginationMeta } from "@/types/link";
import initialLinksData from "@/data/links.json";

// 서버 메모리 내에서 변경 사항을 시뮬레이션할 수 있는 Mock DB 상태
let mockLinks: LinkItem[] = [...(initialLinksData as LinkItem[])];

export interface GetLinksOptions {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: "order" | "clicks" | "latest";
}

export function getMockLinks(options: GetLinksOptions = {}) {
  const {
    category = "all",
    search = "",
    page = 1,
    limit = 10,
    sort = "order",
  } = options;

  let filtered = mockLinks.filter((item) => item.isActive);

  // 카테고리 필터링
  if (category && category !== "all") {
    filtered = filtered.filter((item) => item.category === category);
  }

  // 검색어 필터링 (제목, 설명, 태그)
  if (search.trim()) {
    const query = search.trim().toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // 정렬
  if (sort === "clicks") {
    filtered.sort((a, b) => b.clicks - a.clicks);
  } else if (sort === "latest") {
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else {
    // 기본 order 순
    filtered.sort((a, b) => a.order - b.order);
  }

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);

  // 각 카테고리별 개수 요약
  const categoryCountMap: Record<string, number> = {
    all: mockLinks.filter((item) => item.isActive).length,
    dev: 0,
    blog: 0,
    social: 0,
    project: 0,
    resource: 0,
  };

  mockLinks
    .filter((item) => item.isActive)
    .forEach((item) => {
      if (categoryCountMap[item.category] !== undefined) {
        categoryCountMap[item.category] += 1;
      } else {
        categoryCountMap[item.category] = 1;
      }
    });

  const categories = [
    { id: "all", name: "전체보기", count: categoryCountMap.all },
    { id: "dev", name: "개발 (DEV)", count: categoryCountMap.dev || 0 },
    { id: "blog", name: "블로그 (BLOG)", count: categoryCountMap.blog || 0 },
    { id: "project", name: "프로젝트 (WORK)", count: categoryCountMap.project || 0 },
    { id: "social", name: "소셜 (SOCIAL)", count: categoryCountMap.social || 0 },
    { id: "resource", name: "자료 (RESOURCE)", count: categoryCountMap.resource || 0 },
  ];

  const meta: PaginationMeta = {
    totalCount,
    page,
    limit,
    totalPages,
    categories,
  };

  return {
    data: paginatedData,
    meta,
  };
}

export function getMockLinkById(id: string): LinkItem | undefined {
  return mockLinks.find((item) => item.id === id);
}

export type CreateLinkInput = {
  id?: string;
  category: LinkCategory;
  categoryLabel?: string;
  title: string;
  desc?: string;
  url: string;
  badge?: string;
  bgColor?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
  tags?: string[];
};

export function createMockLink(newItem: CreateLinkInput): LinkItem {
  const now = new Date().toISOString();
  const created: LinkItem = {
    id: newItem.id || `link_${Date.now()}`,
    category: newItem.category,
    categoryLabel: newItem.categoryLabel || newItem.category.toUpperCase(),
    title: newItem.title,
    desc: newItem.desc || "",
    url: newItem.url,
    badge: newItem.badge,
    bgColor: newItem.bgColor || "bg-[#FEF08A]",
    icon: newItem.icon || "🔗",
    order: newItem.order ?? mockLinks.length + 1,
    clicks: 0,
    isActive: newItem.isActive ?? true,
    tags: newItem.tags || [],
    createdAt: now,
    updatedAt: now,
  };

  mockLinks.unshift(created);
  return created;
}

export function updateMockLink(
  id: string,
  updates: Partial<Omit<LinkItem, "id" | "createdAt">>
): LinkItem | null {
  const index = mockLinks.findIndex((item) => item.id === id);
  if (index === -1) return null;

  mockLinks[index] = {
    ...mockLinks[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  return mockLinks[index];
}

export function incrementMockLinkClicks(id: string): LinkItem | null {
  const link = mockLinks.find((item) => item.id === id);
  if (!link) return null;

  link.clicks += 1;
  link.updatedAt = new Date().toISOString();
  return link;
}

export function deleteMockLink(id: string): boolean {
  const initialLength = mockLinks.length;
  mockLinks = mockLinks.filter((item) => item.id !== id);
  return mockLinks.length < initialLength;
}

export function resetMockLinks() {
  mockLinks = [...(initialLinksData as LinkItem[])];
}
