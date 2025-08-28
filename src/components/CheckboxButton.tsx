'use client';

import React from 'react';
import { Check } from 'lucide-react';

export default function CheckboxButton({
  checked,
  onClick,
  ariaLabel,
}: {
  checked: boolean;
  onClick: () => void;
  ariaLabel: string;
}) {
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <button
      type="button"
      role="checkbox"
      aria-label={ariaLabel}
      aria-checked={checked}
      data-state={checked ? 'checked' : 'unchecked'}
      onKeyDown={onKeyDown}
      onClick={onClick}
      className="size-7 shrink-0 overflow-hidden rounded-xs border border-component-dark data-[state=checked]:bg-component-default data-[state=checked]:text-background-dark"
    >
      {checked && (
        <span className="flex items-center justify-center text-current pointer-events-none">
          <Check aria-hidden="true" className="absolute size-[13px]" strokeWidth={2} />
        </span>
      )}
    </button>
  );
}
