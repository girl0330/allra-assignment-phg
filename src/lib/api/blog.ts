import api from './client';
export type BlogCategory = 'TREND' | 'NEWS' | 'TIP' | 'GUIDE' | 'EXPERIENCE';
export type BlogCategoryFilter = BlogCategory | 'ALL';

export interface BlogCardItem {
  id: number;
  title: string;
  category: BlogCategory;
  thumbnail: string;
  createdAt: string; // "YYYY-MM-DD HH:mm:ss"
  updatedAt: string; // "YYYY-MM-DD HH:mm:ss"
}

export interface BlogListResponse {
  list: BlogCardItem[];
  totalCount: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export interface BlogListParams {
  page?: number; // default 1
  pageSize?: number; // default 12
  category?: BlogCategory;
  term?: string;
}

export async function fetchBlogs(params: BlogListParams = {}): Promise<BlogListResponse> {
  const sanitiezed = {
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 12,
    category: params.category,
    term: params.term && params.term.trim() !== '' ? params.term.trim() : undefined,
  };

  const res = await api.get<BlogListResponse>('/api/blogs', { params: sanitiezed });
  console.log(res.data);
  return res.data;
}
