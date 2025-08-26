'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogById } from '@/lib/api/blog';
import { useParams } from 'next/navigation';

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

  const { data, isLoading, isError, error } = useBlogDetail(blogId);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>에러 발생: {String(error)}</div>;

  return (
    <article className="prose mx-auto p-6">
      <h1 className="text-2xl font-bold">디테일 페이지</h1>
    </article>
  );
};

export default page;
