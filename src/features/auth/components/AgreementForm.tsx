'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { FormData } from '@/features/auth/schema/registerSchema';
import { AgreementItem } from '@/features/auth/hooks/register.shared';

import CheckboxButton from '@/components/CheckboxButton';
import { ChevronRight } from 'lucide-react';

export default function AgreementSection({
  agreements,
  allChecked,
  allRequiredChecked,
  onToggleAll,
  onNext,
}: {
  agreements: AgreementItem[];
  allChecked: boolean;
  allRequiredChecked: boolean;
  onToggleAll: () => void;
  onNext: () => void;
}) {
  const { control } = useFormContext<FormData>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <div className="flex items-center gap-4">
        <input id="agreeAll" type="checkbox" className="sr-only" checked={allChecked} onChange={onToggleAll} />
        <CheckboxButton ariaLabel="전체 동의" checked={allChecked} onClick={onToggleAll} />
        <label htmlFor="agreeAll" className="text-body-1 font-medium sm:text-title-4" onClick={onToggleAll}>
          전체 동의
        </label>
      </div>

      <div role="none" className="my-7 h-px w-full shrink-0 bg-line-400" />

      <div className="flex flex-col gap-7">
        {agreements.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Controller
                control={control}
                name={item.id}
                render={({ field }) => (
                  <>
                    <input
                      id={item.id}
                      type="checkbox"
                      className="sr-only"
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                    <CheckboxButton
                      ariaLabel={item.label}
                      checked={!!field.value}
                      onClick={() => field.onChange(!field.value)}
                    />
                    <label
                      htmlFor={item.id}
                      className="flex cursor-pointer items-baseline text-body-2 text-label-700 md:text-body-1"
                      onClick={() => field.onChange(!field.value)}
                    >
                      {item.label}
                    </label>
                  </>
                )}
              />
            </div>
            {item.href && (
              <a target="_blank" rel="noopener noreferrer" href={item.href}>
                <ChevronRight aria-hidden="true" width={24} height={24} stroke="#9CA3AF" strokeWidth={2} />
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10">
        <button
          className="inline-flex h-[48px] w-full items-center justify-center gap-4 rounded-lg bg-primary px-6 text-title-4 font-semibold text-label-100 hover:bg-secondary-400 active:bg-secondary-600 disabled:cursor-not-allowed disabled:bg-status-disable disabled:text-label-100 md:h-[56px] md:rounded-xl"
          disabled={!allRequiredChecked}
          type="submit"
        >
          다음
        </button>
      </div>
    </form>
  );
}
