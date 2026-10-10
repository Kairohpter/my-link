export type LinkCategory = "dev" | "blog" | "social" | "project" | "resource";

export interface LinkItem {
  id: string;
  category: LinkCategory;
  categoryLabel: string;
  title: string;
  desc: string;
  url: string;
  badge?: string;
  bgColor: string;
  icon: string;
  order: number;
  clicks: number;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CategorySummary {
  id: string;
  name: string;
  count: number;
}

export interface PaginationMeta {
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: CategorySummary[];
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: PaginationMeta;
  timestamp: string;
}
