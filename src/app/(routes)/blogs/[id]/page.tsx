import BlogDetailForm from '@/features/blogs/components/BlogDetailForm';

type Params = { id: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  return <BlogDetailForm id={id} />;
}
