'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Input from '@/components/Input';
import { useBlogs, useBanners } from '@/features/blogs/hooks/blogApiCall';
import { formatDate, getPageNumbers } from '@/lib/utils/format';
import Skeleton from '@/components/Skeleton';

type BlogCategory = 'TREND' | 'NEWS' | 'TIP' | 'GUIDE' | 'EXPERIENCE';
type BlogCategoryFilter = 'ALL' | BlogCategory;

/* 탭 */
const categories: { label: string; value: BlogCategoryFilter }[] = [
  { label: '전체', value: 'ALL' },
  { label: '트렌드', value: 'TREND' },
  { label: '운영 팁', value: 'TIP' },
  { label: '올라가이드', value: 'GUIDE' },
  { label: '올라소식', value: 'NEWS' },
  { label: '고객사례', value: 'EXPERIENCE' },
];

export default function BlogListForm() {
  const [inputValue, setInputValue] = useState('');
  const [term, setTerm] = useState('');
  const [activeTab, setActiveTab] = useState<BlogCategoryFilter>('ALL');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [category, setCategory] = useState<BlogCategory | undefined>(undefined);

  const { data: bannerData, isLoading: isBannerLoading, isError: isBannerError, error: bannerError } = useBanners();
  const {
    data: blogData,
    isLoading: isBlogLoading,
    isError: isBlogError,
    error: blogError,
  } = useBlogs({ page, pageSize, category: category, term });

  const blogs = blogData?.list || [];
  const totalPages = blogData?.totalPages || 1;
  const hasResults = !isBlogLoading && blogs.length > 0;
  const showPagination = hasResults && totalPages > 1;

  // 페이지네이션
  const pageNumbers = useMemo(() => getPageNumbers(page, totalPages, 5), [page, totalPages]);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const goPrev = () => canPrev && setPage((p) => Math.max(1, p - 1));
  const goNext = () => canNext && setPage((p) => Math.min(totalPages, p + 1));
  const goPrevChunk = () => {
    if (!canPrev || pageNumbers.length === 0) return;
    const start = pageNumbers[0];
    setPage(Math.max(1, start - 5));
  };
  const goNextChunk = () => {
    if (!canNext || pageNumbers.length === 0) return;
    const end = pageNumbers[pageNumbers.length - 1];
    setPage(Math.min(totalPages, end + 1));
  };
  const goPage = (n: number) => setPage(Math.max(1, Math.min(totalPages, n)));

  // 검색
  const handleSearch = (q: string) => {
    const next = q.trim();
    setInputValue(next);
    setTerm(next);
    setCategory(undefined);
    setActiveTab('ALL');
    setPage(1);
  };

  // 탭
  const onClickTab = (t: BlogCategoryFilter) => {
    setActiveTab(t);
    setCategory(t === 'ALL' ? undefined : (t as BlogCategory));
    setInputValue('');
    setTerm('');
    setPage(1);
  };

  if (isBlogError) return <div className="p-6">블로그 로딩 실패: {blogError?.message}</div>;
  if (isBannerError) return <div className="p-6">배너 로딩 실패: {bannerError?.message}</div>;

  return (
    <article className="max-md:container">
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
            onClear={() => handleSearch('')}
            onSearch={(v) => handleSearch(v)}
          />
        </div>
      </header>

      <section className="mt-8 md:mt-10">
        <div className="relative md:hidden" role="region" aria-roledescription="carousel" aria-label="배너">
          <div className="overflow-hidden">
            {isBannerLoading ? (
              <div className="flex -ml-6 overflow-x-hidden">
                {[0, 1].map((i) => (
                  <div key={i} className="min-w-0 shrink-0 grow-0 basis-full pl-6">
                    <Skeleton className="aspect-[2/1] w-full border border-line-200" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex -ml-6 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide">
                {bannerData?.map((banner: any) => (
                  <div key={banner.id} className="min-w-0 shrink-0 grow-0 basis-full pl-6 snap-start">
                    <Link href={`/blogs/${banner.id}`} className="block">
                      <figure className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-line-200">
                        <img
                          alt={banner.title}
                          src={banner.thumbnail}
                          className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </figure>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden gap-6 md:flex">
          {isBannerLoading ? (
            <>
              <Skeleton className="aspect-[2/1] grow border border-line-200" />
              <Skeleton className="aspect-[2/1] grow border border-line-200" />
            </>
          ) : (
            bannerData?.map((banner: any) => (
              <Link key={banner.id} className="flex-1" href={`/blogs/${banner.id}`}>
                <figure className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-line-200">
                  <img
                    alt={banner.title}
                    className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    src={banner.thumbnail}
                  />
                </figure>
              </Link>
            ))
          )}
        </div>
      </section>

      <section className="mt-8 md:mt-10 lg:mt-11">
        <div className="scrollbar-hide flex items-center overflow-scroll border-b border-b-line-200" role="tablist">
          {categories.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <div className="relative" key={tab.value}>
                <button
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onClickTab(tab.value)}
                  className={`text-body-1 whitespace-nowrap py-[15px] px-5 relative cursor-pointer ${
                    isActive ? 'text-label-900 font-semibold' : 'text-label-500 font-normal'
                  }`}
                >
                  {tab.label}
                </button>
                {isActive && <div className="absolute inset-x-0 bottom-0 h-[2px] bg-label-900" />}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-9 md:mt-10">
        <section>
          <div className="flex flex-col gap-9">
            {term &&
              (isBlogLoading ? (
                <Skeleton className="h-5 w-[260px] rounded-md" />
              ) : (
                <div className="text-body-3 font-medium text-label-500">
                  '{term}'에 대한 {blogData?.totalCount}개의 검색결과
                </div>
              ))}

            <div className="grid grid-cols-1 gap-x-8 gap-y-9 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {isBlogLoading ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <div key={`skeleton-${i}`} className="flex flex-col gap-6">
                    <Skeleton className="aspect-[2/1] w-full border border-line-200" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20 rounded-md" />
                      <Skeleton className="h-6 w-5/6 rounded-md" />
                      <Skeleton className="mt-3 h-4 w-24 rounded-md" />
                    </div>
                  </div>
                ))
              ) : blogs.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center">
                  <section className="flex flex-col items-center justify-center gap-7 md:gap-8">
                    <Image
                      alt="빈 상자"
                      loading="lazy"
                      width={80}
                      height={80}
                      decoding="async"
                      className="max-md:hidden"
                      src="/icons/Shortcut.svg"
                    />
                    <Image
                      alt="빈 상자"
                      loading="lazy"
                      width={36}
                      height={36}
                      decoding="async"
                      className="md:hidden"
                      src="/icons/Shortcut.svg"
                    />
                    <div className="text-title-4 font-medium md:text-title-3">검색 결과가 없어요</div>
                  </section>

                  <p className="mt-5 text-body-3 font-normal text-label-700 md:text-body-2">
                    아래와 같은 단어로 다시 검색해보세요.
                  </p>

                  <div className="flex flex-wrap items-baseline gap-1">
                    <button
                      type="button"
                      onClick={() => handleSearch('트렌드')}
                      className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[32px] gap-1 rounded-sm px-1 text-body-2 font-semibold text-primary"
                    >
                      트렌드
                    </button>
                    <span className="font-normal text-label-900">,</span>
                    <button
                      type="button"
                      onClick={() => handleSearch('올라소식')}
                      className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[32px] gap-1 rounded-sm px-1 text-body-2 font-semibold text-primary"
                    >
                      올라소식
                    </button>
                    <span className="font-normal text-label-900">,</span>
                    <button
                      type="button"
                      onClick={() => handleSearch('이커머스')}
                      className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[32px] gap-1 rounded-sm px-1 text-body-2 font-semibold text-primary"
                    >
                      이커머스
                    </button>
                  </div>
                </div>
              ) : (
                blogs.map((blog: any) => (
                  <Link key={blog.id} href={`/blogs/${blog.id}`}>
                    <div className="flex flex-col gap-6">
                      <div className="relative aspect-[2/1] overflow-hidden rounded-2xl">
                        <img alt="블로그 카드 이미지" className="object-cover" src={blog.thumbnail} />
                      </div>
                      <div>
                        <p className="text-body-3 font-medium text-secondary-400">
                          {categories.find((c) => c.value === blog.category)?.label ?? '기타'}
                        </p>
                        <h3 className="mt-1 line-clamp-2 text-title-4 font-medium">{blog.title}</h3>
                        <p className="mt-5 text-body-3 text-label-500">{formatDate(blog.createdAt)}</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {showPagination && (
            <div className="mt-9 flex w-full flex-wrap items-center justify-center gap-6 text-body-2 md:mt-10 lg:mt-11">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={goPrevChunk}
                  disabled={!canPrev}
                  className="inline-flex h-[40px] cursor-pointer items-center justify-center gap-3 rounded-md px-0 text-body-2 font-semibold disabled:cursor-not-allowed disabled:text-status-disable"
                >
                  <ChevronsLeft />
                </button>
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={!canPrev}
                  className="inline-flex h-[40px] cursor-pointer items-center justify-center gap-3 rounded-md px-0 text-body-2 font-semibold disabled:cursor-not-allowed disabled:text-status-disable"
                >
                  <ChevronLeft />
                </button>
              </div>

              <div className="flex items-center gap-1">
                {pageNumbers.map((num) => {
                  const active = num === page;
                  return (
                    <div key={num}>
                      <button
                        type="button"
                        onClick={() => goPage(num)}
                        className={`!size-9 inline-flex cursor-pointer items-center justify-center gap-3 rounded-full px-6 text-body-2 disabled:cursor-not-allowed disabled:text-status-disable md:size-10 ${
                          active
                            ? 'bg-component-alternative font-bold text-label-900 hover:bg-component-alternative'
                            : 'font-medium text-label-700 hover:bg-label-100 hover:text-label-700'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        <span className="translate-y-px text-body-3 md:text-body-2">{num}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canNext}
                  className="inline-flex h-[40px] cursor-pointer items-center justify-center gap-3 rounded-md px-0 text-body-2 font-semibold disabled:cursor-not-allowed disabled:text-status-disable"
                >
                  <ChevronRight />
                </button>
                <button
                  type="button"
                  onClick={goNextChunk}
                  disabled={!canNext}
                  className="inline-flex h-[40px] cursor-pointer items-center justify-center gap-3 rounded-md px-0 text-body-2 font-semibold disabled:cursor-not-allowed disabled:text-status-disable"
                >
                  <ChevronsRight />
                </button>
              </div>
            </div>
          )}
        </section>
      </section>
    </article>
  );
}
