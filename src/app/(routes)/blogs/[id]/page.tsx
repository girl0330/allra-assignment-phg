'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogById } from '@/lib/api/blog';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Link2 } from 'lucide-react';
import Button from '@/components/Button';

export const useBlogDetail = (id: number) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => fetchBlogById(id),
    staleTime: 60 * 1000,
  });
};

const page = () => {
  const params = useParams();
  const blogId = Number(params.id); // [id]에서 가져온 값
  const router = useRouter();

  const { data, isLoading, isError, error } = useBlogDetail(blogId);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>에러 발생: {String(error)}</div>;

  return (
    <article className="prose mx-auto p-6">
      <nav className="w-full fixed top-header left-0 z-30">
        <div className="container flex items-center justify-end font-normal text-label-700 h-breadcrumb-mobile text-caption-1 md:h-breadcrumb-tablet md:text-body-3">
          <ol className="flex items-center gap-1 text-body-3">
            <li>
              <Link href="/">홈</Link>
            </li>
            <ChevronRight className="size-6" aria-hidden="true" />
            <li>
              <Link href="/sign-in">로그인</Link>
            </li>
          </ol>
        </div>
      </nav>
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col border items-center self-stretch ">
          <div className="flex flex-col w-full gap-[80px] self-stretch py-[20px] px-[80px]">
            <div className="flex-coll items-start gap-[16px]">
              <div className="flex items-center gap-1">
                <span className="text-title-4 font-semibold text-label-700">블로그</span>
                <ChevronRight className="w-[12px] h-[16px]" aria-hidden="true" />
                <span className="text-title-4 font-semibold text-label-700">카테고리</span>
              </div>
              <div className="flex flex-col items-start gap-[8px]">
                <span className="text-display-2 font-semibold text-label-900">{data?.title}</span>
                <span className="text-label-500 text-title-4 font-regular">{data?.createdAt}</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-[24px]">
              <img className="items-start" src={data?.thumbnail} />
              <span className="text-label-800 text-body-1 font-semibold">{data?.summary}</span>
            </div>
            <div className="flex justify-center">
              <div className="flex gap-2">
                <Button onClick={() => router.push('/')}>목록으로 돌아가기</Button>
                <Button icon={<Link2 size={20} />}>공유하기</Button>
              </div>
            </div>
          </div>
        </div>
        <footer className="flex border">푸터 영역</footer>
      </div>
    </article>
  );
};

export default page;
