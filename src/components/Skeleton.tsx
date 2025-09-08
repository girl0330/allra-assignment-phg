import clsx from 'clsx';
import type React from 'react';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return <div aria-hidden="true" className={clsx('skeleton rounded-2xl', className)} {...props} />;
}
