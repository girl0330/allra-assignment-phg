'use client';

export default function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className="relative h-5 w-full overflow-hidden rounded-2xl bg-background-alternative"
    >
      <div
        className="size-full flex-1 rounded-2xl bg-primary transition-[width] duration-500"
        style={{ width: clamped + '%' }}
      />
    </div>
  );
}
