import { useQuery, keepPreviousData, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchBlogs,
  fetchBanners,
  fetchBlogById,
  type BlogListParams,
  type BlogListResponse,
  type BannerResponse,
  type BlogDetailResponse,
} from '@/lib/api/blog';

// 블로그 목록 조회
export function useBlogs(params: BlogListParams) {
  return useQuery<BlogListResponse, Error>({
    queryKey: ['blogs', params],
    queryFn: () => fetchBlogs(params),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
}

// 블로그 배너 조회
export function useBanners() {
  return useQuery<BannerResponse, Error>({
    queryKey: ['banners'],
    queryFn: fetchBanners,
    staleTime: 60 * 1000,
  });
}

// 블로그 상세보기
export function useBlogDetail(id: string) {
  return useQuery<BlogDetailResponse, Error>({
    queryKey: ['blog', id],
    queryFn: () => fetchBlogById(id),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}
