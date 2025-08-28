import { useQuery } from '@tanstack/react-query';
import api from './client';

// 배너 타입
export interface BannerItem {
    id: number;
    title: string;
    thumbnail: string;
    summary: string;
}

export type BannerResponse = BannerItem[];

// 블로그 타입
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

// 블로그 상세 타입
export interface BlogDetailResponse {
    id: string;
    category: BlogCategory;
    title: string;
    thumbnail: string;
    summary: string;
    content: string;
    createdAt: string; // "YYYY-MM-DD HH:mm:ss"
    updatedAt: string; // "YYYY-MM-DD HH:mm:ss"
}

// 배너api
export async function fetchBanners(): Promise<BannerResponse> {
    const res = await api.get<BannerResponse>('/api/blogs/banners');
    console.log(res.data);
    return res.data;
}

// 블로그api
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

// 블로그 상세 api
export async function fetchBlogById(id: string): Promise<BlogDetailResponse> {
    const res = await api.get<BlogDetailResponse>(`/api/blogs/${id}`);
    console.log(res.data);
    return res.data;
}
