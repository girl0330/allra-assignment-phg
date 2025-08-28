'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Link2 } from 'lucide-react';
import { formatDate } from '@/lib/utils/format';
import { useBlogDetail } from '@/features/blogs/hooks/blogApiCall';
import type { BlogCategory } from '@/lib/api/blog';
import Skeleton from '@/components/Skeleton';
import toast from 'react-hot-toast';

const CATEGORY_LABEL: Record<BlogCategory, string> = {
  TREND: '트렌드',
  TIP: '운영 팁',
  GUIDE: '올라가이드',
  NEWS: '올라소식',
  EXPERIENCE: '고객사례',
};

export default function BlogDetailForm({ id }: { id: string }) {
  const router = useRouter();
  const { data, isLoading, isError } = useBlogDetail(id);

  if (isError) return <div className="p-6">불러오기 실패</div>;

  const isPending = isLoading || !data;

  const categoryLabel = data ? CATEGORY_LABEL[data.category] : '';

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('링크가 복사되었습니다.');
  };

  return (
    <article className="max-md:container" aria-busy={isPending}>
      <div className="mx-auto max-w-(--breakpoint-md)">
        <header>
          {isPending ? (
            <>
              <div className="flex items-center gap-1 text-title-4 text-label-700">
                <Skeleton className="h-[1em] w-12" />
                <ChevronRight aria-hidden="true" />
                <Skeleton className="h-[1em] w-20" />
              </div>
              <div className="mt-6 text-title-3 font-bold md:text-display-2 md:font-semibold">
                <Skeleton className="h-[1em] w-10/12" />
              </div>
              <div className="mt-2 text-body-3 text-label-500 md:text-title-4">
                <Skeleton className="h-[1em] w-28" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1 text-title-4 text-label-700">
                <span className="cursor-pointer" onClick={() => router.push('/blogs')}>
                  블로그
                </span>
                <ChevronRight aria-hidden="true" />
                <Link href={`/blogs?category=${data!.category}`}>{categoryLabel}</Link>
              </div>

              <h2 className="mt-6 text-title-3 font-bold md:text-display-2 md:font-semibold line-clamp-2 overflow-hidden break-words [display:-webkit-box] [-webkit-box-orient:vertical]">
                {data!.title}
              </h2>

              <p className="mt-2 text-body-3 text-label-500 md:text-title-4">{formatDate(data!.createdAt)}</p>
            </>
          )}
        </header>

        <section className="mt-7 md:mt-10 lg:mt-14">
          {isPending ? (
            <Skeleton className="h-[540px] w-full" />
          ) : (
            <div
              className="mx-auto prose min-w-full prose-p:my-0 prose-img:my-0"
              dangerouslySetInnerHTML={{ __html: data!.content }}
            />
          )}
        </section>

        <div className="mt-7 flex items-center justify-center gap-4 font-semibold md:mt-10 md:gap-6 lg:mt-14">
          <button
            type="button"
            onClick={() => router.push('/blogs')}
            className="inline-flex h-[48px] cursor-pointer items-center justify-center gap-4 rounded-lg border bg-background-default px-6 text-body-1 font-semibold text-label-800 hover:bg-label-100 active:bg-background-alternative disabled:cursor-not-allowed disabled:border-line-400 disabled:text-status-disable"
          >
            목록으로 돌아가기
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex h-[48px] cursor-pointer items-center justify-center gap-4 rounded-lg border border-secondary-300 bg-background-default px-6 text-body-1 font-semibold text-primary hover:border-secondary-300 hover:bg-label-100 active:bg-background-alternative disabled:cursor-not-allowed disabled:border-status-disable disabled:bg-background-default disabled:text-status-disable"
          >
            <Link2 size={20} aria-hidden="true" />
            공유하기
          </button>
        </div>
      </div>
    </article>
  );
}
