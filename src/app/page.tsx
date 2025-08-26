'use client';

import Input from '@/components/Input';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  BannerItem,
  BannerResponse,
  BlogCategory,
  BlogCategoryFilter,
  BlogListParams,
  BlogListResponse,
  fetchBanners,
  fetchBlogs,
} from '@/lib/api/blog';

/* ----------------------------- React Query 훅 ----------------------------- */
export const useBlogs = (params: BlogListParams) => {
  return useQuery<BlogListResponse, Error>({
    queryKey: ['blogs', params],
    queryFn: () => fetchBlogs(params),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData, // 페이지 전환 깜빡임 완화
  });
};

export const useBanners = () => {
  return useQuery<BannerResponse, Error>({
    queryKey: ['banners'],
    queryFn: fetchBanners,
    staleTime: 60 * 1000,
  });
};

/* ----------------------------- 탭 정의 ----------------------------- */
const categories: { label: string; value: BlogCategoryFilter }[] = [
  { label: '전체', value: 'ALL' },
  { label: '올라소식', value: 'NEWS' },
  { label: '운영 팁', value: 'TIP' },
  { label: '올라가이드', value: 'GUIDE' },
  { label: '경험담', value: 'EXPERIENCE' },
];

/* ----------------------------- 날짜 포맷 유틸 ----------------------------- formateData*/
function formatDate(dateString: string) {
  const data = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(data)
    .replace(/\.$/, '');
}

// 항상 5개 묶음 기준으로 현재 묶음 페이지 배열 계산
function getPageNumbers(page: number, total: number, chunkSize: number = 5) {
  if (total <= 0) return [];
  var chunkIndex = Math.floor((page - 1) / chunkSize);
  var start = chunkIndex * chunkSize + 1;
  var end = Math.min(total, start + chunkSize - 1);
  var arr: number[] = [];
  for (var i = start; i <= end; i++) arr.push(i);
  return arr;
}

export default function BlogListPage() {
  const [inputValue, setInputValue] = useState('');
  const [term, setTerm] = useState('');
  const [activeTab, setActiveTab] = useState<BlogCategoryFilter>('ALL');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [category, setCategory] = useState<BlogCategory | undefined>(undefined);

  // 데이터 패칭
  const { data: bannerData, isLoading: isBannerLoading, isError: isBannerError, error: bannerError } = useBanners();

  const {
    data: blogData,
    isLoading: isBlogLoading,
    isError: isBlogError,
    error: blogError,
    isFetching: isBlogFetching,
  } = useBlogs({ page, pageSize, category, term });

  // BlogListResponse 타입으로 data를 받음
  const blogs = blogData?.list || [];
  const totalCount = blogData?.totalCount || 0;
  const totalPages = blogData?.totalPages || 1;
  const currentPage = blogData?.page || 1;

  // --- 페이지네이션 상태/동작 ---
  const pageNumbers = getPageNumbers(page, totalPages, 5);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  function goPrev() {
    if (canPrev) setPage((p) => Math.max(1, p - 1));
  }
  function goNext() {
    if (canNext) setPage((p) => Math.min(totalPages, p + 1));
  }
  function goPrevChunk() {
    if (!canPrev || pageNumbers.length === 0) return;
    const start = pageNumbers[0];
    const target = Math.max(1, start - 5);
    setPage(target);
  }
  function goNextChunk() {
    if (!canNext || pageNumbers.length === 0) return;
    const end = pageNumbers[pageNumbers.length - 1];
    const target = Math.min(totalPages, end + 1);
    setPage(target);
  }
  function goPage(n: number) {
    const clamped = Math.max(1, Math.min(totalPages, n));
    setPage(clamped);
  }

  // 탭 변경 → 1페이지로
  function handleTabChange(next: BlogCategoryFilter) {
    setActiveTab(next);
    setPage(1);
  }

  // 검색은 엔터/버튼에서 트리거하고 1페이지로
  function handleSearch() {
    setPage(1);
  }

  /* 로딩/에러 UI (훅 호출 후에 분기) */
  if (isBlogError) return <div className="p-6">블로그 로딩 실패: {blogError?.message}</div>;
  if (isBannerError) return <div className="p-6">배너 로딩 실패: {bannerError?.message}</div>;

  return (
    <div className="py-[24px] md:py-[40px] lg:py-[80px]">
      <article className="max-md:container">
        {/* 매인 */}
        <div>
          {/* 해더 */}
          <header className="flex flex-col max-md:gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="text-title-3 font-bold text-label-800 md:text-title-2 lg:text-title-1">블로그</h2>
            <div className="relative">
              <Input
                id="searchTerm"
                name="searchTerm"
                type="text"
                placeholder="검색어를 입력해주세요"
                labelHidden={false}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                clearable={false}
                leftIcon="search"
                rightIcon="clear"
                className="w-full md:w-[400px] lg:w-[468px]"
                containerClassName=""
                onClear={() => {
                  setInputValue('');
                  setTerm('');
                  setPage(1);
                }}
                onSearch={() => {
                  const next = inputValue.trim();
                  setTerm(next);
                  setPage(1);
                }}
              />
            </div>
          </header>

          {/* 배너 */}
          <section className="mt-8 md:mt-10">
            <div className="flex gap-6">
              {isBannerLoading ? (
                // 배너만 스켈레톤
                <div className="h-40 w-full animate-pulse rounded-xl bg-label-100" />
              ) : (
                bannerData?.map((banner: BannerItem) => (
                  <Link key={banner.id} className="flex-1" href={`/blogs/${banner.id}`}>
                    <figure className="relative aspect-[2/1]">
                      <img alt={banner.title} className="object-cover" src={banner.thumbnail} />
                      <div className="absolute inset-x-0 bottom-0 z-10 px-6 py-5">
                        <p className="line-clamp-2 overflow-hidden break-words [display:-webkit-box] [-webkit-box-orient:vertical]">
                          {banner.summary}
                        </p>
                      </div>
                    </figure>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>

        {/* 섹션 */}
        <section className="mt-8 md:mt-10 lg:mt-11 flex flex-col gap-[40px]">
          {/* 탭 */}
          <div className="scrollbar-hide flex items-center border-b border-b-line-200">
            {categories.map((tab) => {
              const isActive = activeTab === tab.value;

              return (
                <div className="" key={tab.value}>
                  <button
                    onClick={() => {
                      setActiveTab(tab.value);
                      setCategory(tab.value === 'ALL' ? undefined : (tab.value as BlogCategory));
                      handleTabChange(tab.value);
                      setInputValue('');
                      setTerm('');
                    }}
                    className={`text-body-1 whitespace-nowrap py-[15px] px-5 relative cursor-pointer ${
                      isActive ? 'text-label-900 font-semibold border-b border-label-900' : 'text-label-500 font-normal'
                    }`}
                  >
                    {tab.label}
                  </button>
                </div>
              );
            })}
          </div>

          {/* 카드 컨텐츠 */}
          <div className="gap-[48px] flex flex-col">
            {/* 카드 영역 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-6">
              {isBlogLoading ? (
                // 배너만 스켈레톤
                <div className="h-40 w-full animate-pulse rounded-xl bg-label-100" />
              ) : (
                blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.id}`}
                    className="border rounded-2xl flex flex-col gap-4 aspect-[2/1] cursor-pointer"
                  >
                    <img alt="블로그 카드 이미지" className="object-cover" src={blog.thumbnail} />
                    <div>
                      <div className="gap-[8px] border">
                        <h3>{blog.category}</h3>
                        <p>{blog.title}</p>
                      </div>
                      <p>{formatDate(blog.createdAt)}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* 페이징 */}
            <div className="flex w-full flex-wrap items-center justify-center gap-6 text-body-2 mt-9 md:mt-10 lg:mt-11">
              {/* Prev buttons */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={goPrevChunk}
                  disabled={!canPrev}
                  className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[40px] gap-3 rounded-md text-body-2 font-semibold px-0"
                >
                  <span>
                    <ChevronsLeft />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={!canPrev}
                  className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[40px] gap-3 rounded-md text-body-2 font-semibold px-0"
                >
                  <span>
                    <ChevronLeft />
                  </span>
                </button>
              </div>
              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {pageNumbers.map((num) => {
                  const active = num === page;
                  return (
                    <div key={num}>
                      <button
                        key={num}
                        type="button"
                        onClick={() => goPage(num)}
                        className={`inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[40px] gap-3 px-6 text-body-2 !size-9 rounded-full md:size-10 ${
                          active
                            ? 'bg-component-alternative font-bold text-label-900 hover:bg-component-alternative'
                            : 'font-medium text-label-700 hover:bg-label-100 hover:text-label-700'
                        }`}
                      >
                        <span className="translate-y-px text-body-3 md:text-body-2">{num}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
              {/* Next buttons */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canNext}
                  className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[40px] gap-3 rounded-md text-body-2 font-semibold px-0"
                >
                  <ChevronRight />
                </button>
                <button
                  type="button"
                  onClick={goNextChunk}
                  disabled={!canNext}
                  className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[40px] gap-3 rounded-md text-body-2 font-semibold px-0"
                >
                  <ChevronsRight />
                </button>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
