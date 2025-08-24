'use client';

import { useState } from 'react';
import type React from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export type InputStatus = 'none' | 'error' | 'success';
export type InputIcon = 'clear' | 'eye' | 'none' | 'check';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  labelHidden?: boolean;
  errorText?: string;
  status?: InputStatus;
  icon?: InputIcon; // clear | eye | none
  clearable?: boolean;
  // showCheckOnValid?: boolean;
  onClear?: () => void;
  containerClassName?: string;
  className?: string;
  autoComplete?: string;
}

const Input = ({
  id,
  name,
  type = 'text',
  labelText,
  labelHidden = false,
  autoComplete = 'off',
  value,
  onChange,
  status = 'none',
  errorText,
  clearable = false,
  icon = 'none',
  // showCheckOnValid = false,
  className,
  containerClassName,
  onClear,
  ...props
}: InputProps) => {
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPwd ? 'text' : 'password') : type;
  const [isFocused, setIsFocused] = useState(false);

  // input상태 설정
  const hasValue = typeof value === 'string' ? value.length > 0 : typeof value === 'number' ? true : false;
  const effectiveStatus: InputStatus = hasValue ? 'none' : 'error';
  const isError = !hasValue || effectiveStatus === 'error';
  const isSuccess = !isError && status === 'success';
  const handleFocus = () => setIsFocused(true);

  // 초기화 이벤트
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClear?.();
    onChange?.({ target: { value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  // 페스워드 토글 이벤트
  const handlePasswordToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPwd((prev) => !prev);
  };

  return (
    <div className={`space-y-3 ${containerClassName ?? ''}`}>
      {labelText && (
        <label
          className={`peer-disabled:cursor-not-allowed peer-disabled:text-status-disable text-body-3 font-medium text-label-700 ${
            labelHidden ? 'sr-only' : ''
          }`}
          htmlFor={id}
        >
          {labelText}
        </label>
      )}

      <div className="relative w-full">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          aria-invalid={isError || undefined}
          autoComplete={autoComplete}
          className={[
            'ring-offset-background flex w-full rounded-md border border-line-200 bg-background-default px-6 py-[12.5px] text-body-3 h-[48px]',
            'file:font-medium file:text-sm flex w-full ',
            'placeholder:text-body-2 placeholder:text-label-500',
            'focus-visible:outline-hidden',
            'disabled:cursor-not-allowed disabled:border-0 disabled:bg-background-alternative disabled:text-status-disable disabled:placeholder:text-status-disable',
            'focus:ring-1 focus:ring-component-dark h-[48px]',
            isFocused && isError ? 'border-red-500 focus:ring-red-500' : '',
            isSuccess ? 'border-green-500' : '',
            icon !== 'none' ? 'pr-12' : '',
            // 커스텀 확장
            className ?? '',
          ].join(' ')}
          {...props}
        />

        {/* 오른쪽 아이콘 영역 */}
        {(icon !== 'none' || isSuccess) && (
          <div className="absolute top-1/2 right-7 -translate-y-1/2 flex items-center gap-2">
            {icon === 'clear' && hasValue && (
              <button type="button" onClick={handleClear} className="cursor-pointer" aria-label="입력 내용 지우기">
                <X className="w-[24px] h-[24px] text-neutral-400 hover:text-neutral-600" />
              </button>
            )}

            {/* 성공 아이콘 */}
            {isSuccess && <Check className="w-[20px] h-[20px] text-status-correct" aria-label="인증 성공" />}

            {icon === 'eye' && (
              <button
                type="button"
                onClick={handlePasswordToggle}
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
        )}
      </div>

      {/* 에러 문구 */}
      {isFocused && !hasValue ? <p className="text-xs text-red-600">{errorText}</p> : null}
    </div>
  );
};

export default Input;
