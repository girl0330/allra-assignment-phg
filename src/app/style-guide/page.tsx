'use client';
import { Link2 } from 'lucide-react';

import Input from '@/components/Input';
import { useState } from 'react';
import Modal from '@/components/Modal';
import Button from '@/components/Button';

type Swatch = { name: string; className: string; text?: string };

export default function StyleGuidePage() {
  const [businessNo, setBussinessNo] = useState('');
  const [password, setPassword] = useState('');
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1 className="text-display-2 font-bold">Style Guide</h1>
      <p className="mt-2 text-body-2 text-label-500">
        프로젝트에서 공통으로 사용하는 컬러, 타이포그래피, 컴포넌트, 레이아웃 샘플
      </p>
      <div className="space-y-10 flex flex-colum">
        <Button onClick={() => setOpen(true)} className="">
          내가 만드는 버튼test
        </Button>
        {/* 텍스트만 있는 버튼 */}
        <Button>회원가입test</Button>

        {/* 아이콘이 있는 버튼 */}
        <Button icon={<Link2 size={20} />}>공유하기test</Button>
      </div>

      {/* 모달 컴포넌트  */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-label-900 text-title-3 font-bold ">올라 가입을 환영합니다 🎉</h2>
          <p className="text-label-700 text-body-2 font-regular">
            이제 첫 정산을 신청해보세요!
            <br />
            정산금을 <strong className="text-secondary-400">30초만에 조회</strong>하고,{' '}
            <strong className="text-secondary-400">바로 신청</strong>할 수 있어요.
          </p>
        </div>
      </Modal>

      <div className="space-y-10">
        <button className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border bg-background-default text-label-800 hover:bg-label-100 active:bg-background-alternative disabled:border-line-400 disabled:text-status-disable h-[48px] gap-4 rounded-lg px-6 text-body-1 font-semibold">
          목록으로 돌아가기
        </button>
        <a
          className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border border-secondary-300 bg-background-default text-primary hover:border-secondary-300 hover:bg-label-100 active:bg-background-alternative disabled:border-status-disable disabled:bg-background-default disabled:text-status-disable h-[32px] gap-1 rounded-sm px-6 text-body-3 font-medium"
          href="/"
        >
          회원가입
        </a>
        <a
          className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border border-secondary-300 bg-background-default text-primary hover:border-secondary-300 hover:bg-label-100 active:bg-background-alternative disabled:border-status-disable disabled:bg-background-default disabled:text-status-disable h-[32px] gap-1 rounded-sm px-6 text-body-3 font-medium"
          href="/"
        >
          로그인
        </a>
        <a
          className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border border-secondary-300 bg-background-default text-primary hover:border-secondary-300 hover:bg-label-100 active:bg-background-alternative disabled:border-status-disable disabled:bg-background-default disabled:text-status-disable h-[32px] gap-1 rounded-sm px-6 text-body-3 font-medium"
          href="/sign-in?callbackUrl=%2Fblogs%3F"
        >
          로그인/회원가입
        </a>
        <button className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border border-secondary-300 bg-background-default text-primary hover:border-secondary-300 hover:bg-label-100 active:bg-background-alternative disabled:border-status-disable disabled:bg-background-default disabled:text-status-disable h-[48px] gap-4 rounded-lg px-6 text-body-1 font-semibold">
          <Link2 size={20} aria-hidden="true" />
          공유하기
        </button>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed bg-primary text-label-100 hover:bg-secondary-400 active:bg-secondary-600 disabled:bg-status-disable disabled:text-label-100 h-[48px] md:h-[56px] gap-4 rounded-lg md:rounded-xl px-6 text-title-4 font-semibold w-full"
          type="submit"
        >
          다음/비활성화
        </button>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border border-secondary-300 bg-background-default text-primary hover:border-secondary-300 hover:bg-label-100 active:bg-background-alternative disabled:border-status-disable disabled:bg-background-default disabled:text-status-disable gap-3 rounded-md px-6 text-body-2 font-semibold h-[48px] min-w-[96px]"
          type="button"
        >
          인증하기/비활성화
        </button>
        <button className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed bg-primary text-label-100 hover:bg-secondary-400 active:bg-secondary-600 disabled:bg-status-disable disabled:text-label-100 h-[48px] md:h-[56px] gap-4 rounded-lg md:rounded-xl px-6 text-title-4 font-semibold">
          가입하기/비활성화
        </button>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed bg-primary text-label-100 hover:bg-secondary-400 active:bg-secondary-600 disabled:bg-status-disable disabled:text-label-100 h-[48px] md:h-[56px] gap-4 rounded-lg md:rounded-xl px-6 text-title-4 font-semibold mt-5 w-full"
          type="button"
        >
          정산금 조회하기
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <Input
          id="search"
          name="search"
          labelHidden={true}
          leftIcon="search"
          rightIcon="clear"
          type="text"
          placeholder="검색어를 입력해주세요."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          clearable
          onClear={() => {
            setSearchText('');
          }}
          onSearch={() => {
            alert('검색어: ' + searchText);
          }}
        />

        <Input
          id="password"
          name="password"
          labelText="비밀번호"
          labelHidden={false}
          rightIcon="eye"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="ring-offset-background file:text-sm flex w-full rounded-md border border-line-200 bg-background-default px-6 py-[12.5px] file:border-0 file:bg-transparent file:font-medium placeholder:text-body-2 placeholder:text-label-500 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:border-0 disabled:bg-background-alternative disabled:text-status-disable disabled:placeholder:text-status-disable focus:ring-1 focus:ring-component-dark h-[48px] text-body-1"
          errorText="8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요"
        />

        <Input
          id="businessNo"
          name="businessNo"
          placeholder="숫자만 10자리 입력"
          autoComplete="username"
          type="text"
          labelText="사업자등록번호"
          rightIcon="clear"
          value={businessNo}
          onChange={(e) => {
            setBussinessNo(e.target.value);
          }}
          clearable
          onClear={() => {
            setBussinessNo('');
          }}
          errorText="사업자등록번호 10자리를 입력해 주세요."
          className="mb-[8px]"
        />
      </div>

      <div className="space-y-3">
        <Input
          id="password"
          name="password"
          labelHidden={true}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="ring-offset-background file:text-sm flex w-full rounded-md border border-line-200 bg-background-default px-6 py-[12.5px] file:border-0 file:bg-transparent file:font-medium placeholder:text-body-2 placeholder:text-label-500 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:border-0 disabled:bg-background-alternative disabled:text-status-disable disabled:placeholder:text-status-disable focus:ring-1 focus:ring-component-dark h-[48px] text-body-1"
          errorText="8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요"
        />
      </div>

      <div className="flex flex-col gap-6">
        <Input
          id="textInput"
          name="textInput"
          placeholder="문자 입력"
          type="text"
          labelText="텍스트 입력 input"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          clearable
          onClear={() => {
            setInputText('');
          }}
          errorText="입력해주세요"
        />
      </div>

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
