'use client';

type Swatch = { name: string; className: string; text?: string };

export default function StyleGuidePage() {
  return (
    <div>
      <h1 className="text-display-2 font-bold">Style Guide</h1>
      <p className="mt-2 text-body-2 text-label-500">
        프로젝트에서 공통으로 사용하는 컬러, 타이포그래피, 컴포넌트, 레이아웃 샘플
      </p>

      {/* Colors */}
      <Section title="Colors">
        <div className="space-y-10">
          <ColorRow title="Primary" items={[{ name: 'primary', className: 'bg-primary' }]} />

          <ColorRow
            title="Secondary scale"
            items={[
              { name: 'secondary-700', className: 'bg-secondary-700' },
              { name: 'secondary-600', className: 'bg-secondary-600' },
              { name: 'secondary-400', className: 'bg-secondary-400' },
              { name: 'secondary-300', className: 'bg-secondary-300' },
              { name: 'secondary-200', className: 'bg-secondary-200' },
              { name: 'secondary-100', className: 'bg-secondary-100' },
              { name: 'secondary-50', className: 'bg-secondary-50' },
            ]}
          />

          <ColorRow
            title="Label scale"
            items={[
              { name: 'label-900', className: 'bg-label-900' },
              { name: 'label-800', className: 'bg-label-800' },
              { name: 'label-700', className: 'bg-label-700' },
              { name: 'label-500', className: 'bg-label-500' },
              { name: 'label-100', className: 'bg-label-100' },
            ]}
          />

          <ColorRow
            title="Background"
            items={[
              {
                name: 'background-default',
                className: 'bg-background-default border border-line-200',
              },
              {
                name: 'background-alternative',
                className: 'bg-background-alternative',
              },
            ]}
          />

          <ColorRow
            title="Line scale"
            items={[
              { name: 'line-800', className: 'bg-line-800' },
              { name: 'line-400', className: 'bg-line-400' },
              { name: 'line-200', className: 'bg-line-200' },
            ]}
          />

          <ColorRow
            title="Status"
            items={[
              { name: 'status-correct', className: 'bg-status-correct' },
              { name: 'status-error', className: 'bg-status-error' },
              { name: 'status-caution', className: 'bg-status-caution' },
              { name: 'status-disable', className: 'bg-status-disable' },
            ]}
          />

          <ColorRow
            title="Components"
            items={[
              { name: 'component-dark', className: 'bg-component-dark' },
              { name: 'component-light', className: 'bg-component-light' },
              { name: 'component-assistive', className: 'bg-component-assistive' },
              { name: 'component-alternative', className: 'bg-component-alternative' },
            ]}
          />

          <ColorRow
            title="Materials"
            items={[
              { name: 'material-dimmed (75%)', className: 'bg-material-dimmed' },
              { name: 'material-scroll (32%)', className: 'bg-material-scroll' },
            ]}
          />
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <div className="grid grid-cols-1 gap-4">
          <TypeRow className="text-display-1 font-bold">Display 1 / 48px</TypeRow>
          <TypeRow className="text-display-2 font-bold">Display 2 / 40px</TypeRow>
          <TypeRow className="text-title-1 font-semibold">Title 1 / 32px</TypeRow>
          <TypeRow className="text-title-2 font-semibold">Title 2 / 26px</TypeRow>
          <TypeRow className="text-title-3 font-medium">Title 3 / 20px</TypeRow>
          <TypeRow className="text-title-4 font-medium">Title 4 / 18px</TypeRow>
          <TypeRow className="text-body-1">Body 1 / 16px</TypeRow>
          <TypeRow className="text-body-2">Body 2 / 15px</TypeRow>
          <TypeRow className="text-body-3">Body 3 / 14px</TypeRow>
          <TypeRow className="text-caption-1 text-label-700">Caption 1 / 12px</TypeRow>
          <TypeRow className="text-caption-2 text-label-700">Caption 2 / 11px</TypeRow>
        </div>
      </Section>

      {/* Cards & Shadows */}
      <Section title="Cards & Shadows">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card title="shadow / normal" className="shadow-normal" />
          <Card title="shadow / strong" className="shadow-strong" />
          <Card title="shadow / heavy" className="shadow-heavy" />
        </div>
      </Section>

      {/* Grid System */}
      <Section title="Responsive Grid">
        <p className="mb-4 text-body-2 text-label-700">1280px: 4열 / 1024px: 3열 / 768px: 2열 / 그 이하는 1열</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-line-200 bg-background-default p-4">
              <p className="text-title-4 font-semibold">Card {i + 1}</p>
              <p className="mt-1 text-body-3 text-label-500">샘플 컨텐츠. 반응형 그리드 동작 확인용.</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-block h-6 min-w-14 rounded bg-secondary-100 px-2 text-center text-caption-1 text-secondary-600">
                  tag
                </span>
                <span className="inline-block h-6 min-w-14 rounded bg-label-100 px-2 text-center text-caption-1 text-label-700">
                  meta
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ---------- Sub Components ---------- */

function Section({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <section className="mb-14">
      <h2 className="mb-4 text-title-2 font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function ColorRow({ title, items }: { title: string; items: Swatch[] }) {
  return (
    <div>
      <h3 className="mb-3 text-title-4 text-label-700">{title}</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        {items.map((it) => (
          <div key={it.name} className="rounded-lg border border-line-200 p-3">
            <div className={`h-16 w-full rounded ${it.className}`} />
            <div className="mt-2">
              <p className="text-body-3 font-medium">{it.name}</p>
              <p className="text-caption-2 text-label-500">{it.text ?? it.className.replace('bg-', '')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeRow({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-line-200 bg-background-default px-4 py-3">
      <span className={className}>{children}</span>
      <code className="text-caption-1 text-label-500">{className}</code>
    </div>
  );
}

function Btn({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  const base =
    'inline-flex items-center justify-center rounded-md bg-primary text-white h-10 px-4 text-body-2 transition-colors hover:brightness-95 active:brightness-90';
  return <button className={`${base} ${className}`}>{children}</button>;
}

function Card({ title, className = '' }: { title: string; className?: string }) {
  return (
    <div className={`rounded-xl border border-line-200 bg-background-default p-5 ${className}`}>
      <p className="text-title-4 font-semibold">{title}</p>
      <p className="mt-2 text-body-3 text-label-500">카드 표준 패딩/라운드/보더 & Tailwind 확장 섀도우 토큰 시연</p>
      <div className="mt-4 flex gap-2">
        <Btn className="h-8 rounded-sm px-3 text-body-3">Action</Btn>
        <Btn className="h-8 rounded-sm bg-background-default px-3 text-body-3 text-label-700 border border-line-400 hover:bg-label-100">
          Secondary
        </Btn>
      </div>
    </div>
  );
}
