'use client';

import { useState } from 'react';
import type React from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export type InputStatus = 'none' | 'error' | 'success';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorText?: string;
  status?: InputStatus;
  clearable?: boolean;
  showPasswordToggle?: boolean;
  showCheckOnValid?: boolean;
  onClear?: () => void;
  containerClassName?: string;
  className?: string;
  autoComplete?: string;
}

const Input = ({
  id,
  name,
  type = 'text',
  label,
  autoComplete = 'none',
  value,
  onChange,
  status = 'none',
  errorText,
  clearable = false,
  showPasswordToggle = false,
  showCheckOnValid = false,
  className,
  containerClassName,
  onClear,
  ...props
}: InputProps) => {
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = showPasswordToggle || type === 'password';
  const inputType = isPassword ? (showPwd ? 'text' : 'password') : type;

  // input상태 설정
  const hasValue = typeof value === 'string' ? value.length > 0 : typeof value === 'number' ? true : false;
  const effectiveStatus: InputStatus = hasValue ? 'none' : 'error';
  const isError = !hasValue || effectiveStatus === 'error';
  const isSuccess = !isError && status === 'success';

  // 아이콘 설정
  const needRightIcon = isPassword || (clearable && hasValue) || (showCheckOnValid && isSuccess && hasValue);

  // 초기화 이벤트
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClear?.();
    onChange?.({ target: { value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={`space-y-3 ${containerClassName ?? ''}`}>
      {label && (
        <label
          className="peer-disabled:cursor-not-allowed peer-disabled:text-status-disable text-body-3 font-medium text-label-700"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          aria-invalid={isError || undefined}
          autoComplete={autoComplete}
          className={[
            'ring-offset-background file:text-sm flex w-full rounded-md border border-line-200 bg-background-default px-6 py-[12.5px]',
            'file:border-0 file:bg-transparent file:font-medium',
            'placeholder:text-body-2 placeholder:text-label-500',
            'focus-visible:outline-hidden disabled:cursor-not-allowed disabled:border-0',
            'disabled:bg-background-alternative disabled:text-status-disable disabled:placeholder:text-status-disable',
            'focus:ring-1 focus:ring-component-dark h-[48px]',
            isError ? 'border-red-500 focus:ring-red-500' : '',
            isSuccess ? 'border-green-500' : '',
            needRightIcon ? 'pr-12' : '',
            // 커스텀 확장
            className ?? '',
          ].join(' ')}
          {...props}
        />

        {/* 오른쪽 아이콘 영역 */}
        <div className="absolute top-1/2 right-7 -translate-y-1/2 flex items-center gap-2">
          {/* 유효성 체크 아이콘 */}
          {showCheckOnValid && isSuccess && hasValue && (
            <Check className="w-[24px] h-[24px] text-green-600" aria-hidden="true" />
          )}

          {/* 클리어 버튼 */}
          {clearable && hasValue && (
            <button type="button" onClick={handleClear} className="cursor-pointer" aria-label="입력 내용 지우기">
              <X className="w-[24px] h-[24px] text-neutral-400 hover:text-neutral-600" />
            </button>
          )}

          {/* 비밀번호 표시/숨김 토글 */}
          {isPassword && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPwd((s) => !s);
              }}
              className="cursor-pointer"
              aria-label={showPwd ? '비밀번호 숨기기' : '비밀번호 표시'}
            >
              {showPwd ? (
                <EyeOff className="w-[24px] h-[24px] text-neutral-400 hover:text-neutral-600" />
              ) : (
                <Eye className="w-[24px] h-[24px] text-neutral-400 hover:text-neutral-600" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* 에러 문구 */}
      {!hasValue ? <p className="text-xs text-red-600">{errorText}</p> : null}
    </div>
  );
};

export default Input;
