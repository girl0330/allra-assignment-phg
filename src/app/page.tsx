'use client';

import Input from '@/components/Input';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { BlogCategory, BlogCategoryFilter, BlogListParams, BlogListResponse, fetchBlogs } from '@/lib/api/blog';

// 데이터 패칭
export const useBlogs = (params: BlogListParams) => {
  return useQuery<BlogListResponse, Error>({
    queryKey: ['blogs', params],
    queryFn: () => fetchBlogs(params),
    staleTime: 60 * 1000,
  });
};

const categories: { label: string; value: BlogCategoryFilter }[] = [
  { label: '전체', value: 'ALL' },
  { label: '올라소식', value: 'NEWS' },
  { label: '운영 팁', value: 'TIP' },
  { label: '올라가이드', value: 'GUIDE' },
  { label: '경험담', value: 'EXPERIENCE' },
];

export default function BlogListPage() {
  const [term, setTerm] = useState('');
  const [activeTab, setActiveTab] = useState<BlogCategoryFilter>('ALL');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [category, setCategory] = useState<BlogCategory | undefined>(undefined);

  const { data, isLoading, isError, error } = useBlogs({
    page: page,
    pageSize: pageSize,
    category: category,
    term: term,
  });

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
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                clearable={false}
                leftIcon="search"
                rightIcon="search"
                className="w-full md:w-[400px] lg:w-[468px]"
                containerClassName=""
                onClear={() => {
                  setSearchText('');
                }}
                onSearch={() => {
                  alert('검색어: ' + searchText);
                }}
              />
            </div>
          </header>

          {/* 배너 */}
          <section className="mt-8 md:mt-10">
            <div className="flex gap-6">
              <Link className="flex-1" href="/blogs/11">
                <figure className="relative aspect-[2/1]">
                  <img alt="블로그 배너 이미지" className="object-cover" src="/images/img1.png" />
                  <div className="absolute inset-x-0 bottom-0 z-10 px-6 py-5">
                    <p className="line-clamp-2 overflow-hidden break-words [display:-webkit-box] [-webkit-box-orient:vertical]">
                      여행을 영화처럼 기록하는 이퀄리티의 영상을 공개합니다. 여행을 영화처럼 기록하는 이퀄리티의 영상을
                      공개합니다.여행을 영화처럼 기록하는 이퀄리티의 영상을 공개합니다. 여행을 영화처럼 기록하는
                      이퀄리티의 영상을 공개합니다.여행을 영화처럼 기록하는 이퀄리티의 영상을 공개합니다. 여행을
                      영화처럼 기록하는 이퀄리티의 영상을 공개합니다.
                    </p>
                  </div>
                </figure>
              </Link>
              <Link className="flex-1" href="/blogs/230">
                <figure className="relative aspect-[2/1]">
                  <img alt="블로그 배너 이미지" className="object-cover" src="/images/img2.png" />
                  <div className="absolute inset-x-0 bottom-0 z-10 px-6 py-5">
                    <p className="line-clamp-2 overflow-hidden break-words [display:-webkit-box] [-webkit-box-orient:vertical]">
                      여행을 영화처럼 기록하는 이퀄리티의 영상을 공개합니다. 여행을 영화처럼 기록하는 이퀄리티의 영상을
                      공개합니다.여행을 영화처럼 기록하는 이퀄리티의 영상을 공개합니다. 여행을 영화처럼 기록하는
                      이퀄리티의 영상을 공개합니다.여행을 영화처럼 기록하는 이퀄리티의 영상을 공개합니다. 여행을
                      영화처럼 기록하는 이퀄리티의 영상을 공개합니다.
                    </p>
                  </div>
                </figure>
              </Link>
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
                      alert(tab.value);
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
              {Array.from({ length: 12 }).map((_, idx) => (
                <div key={idx} className="border rounded-2xl flex flex-col gap-4 aspect-[2/1]">
                  <img alt="블로그 카드 이미지" className="object-cover" src="/images/img2.png" />
                  <div>
                    <div className="gap-[8px] border">
                      <h3>블로그 카드 제목</h3>
                      <p>블로그 카드 내용</p>
                    </div>
                    <p>블로그 카드 업로드 날짜</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 페이징 */}
            <div className="flex w-full flex-wrap items-center justify-center gap-6 text-body-2 mt-9 md:mt-10 lg:mt-11">
              {/* Prev buttons */}
              <div className="flex items-center gap-4">
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[40px] gap-3 rounded-md text-body-2 font-semibold px-0"
                  disabled
                >
                  <span>
                    <ChevronsLeft />
                  </span>
                </button>
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[40px] gap-3 rounded-md text-body-2 font-semibold px-0"
                  disabled
                >
                  <span>
                    <ChevronLeft />
                  </span>
                </button>
              </div>
              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((num, idx) => (
                  <div key={num}>
                    <button
                      className={`inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[40px] gap-3 px-6 text-body-2 !size-9 rounded-full md:size-10 ${
                        num === 1
                          ? 'bg-component-alternative font-bold text-label-900 hover:bg-component-alternative'
                          : 'font-medium text-label-700 hover:bg-label-100 hover:text-label-700'
                      }`}
                    >
                      <span className="translate-y-px text-body-3 md:text-body-2">{num}</span>
                    </button>
                  </div>
                ))}
              </div>
              {/* Next buttons */}
              <div className="flex items-center gap-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[40px] gap-3 rounded-md text-body-2 font-semibold px-0">
                  <ChevronRight />
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[40px] gap-3 rounded-md text-body-2 font-semibold px-0">
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
