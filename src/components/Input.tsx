'use client';

import { useRef, useState } from 'react';
import type React from 'react';
import { Eye, EyeOff, Check, X, Search } from 'lucide-react';

export type InputStatus = 'none' | 'error' | 'success';
export type InputIcon = 'clear' | 'eye' | 'none' | 'search';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  labelHidden?: boolean;
  errorText?: string;
  status?: InputStatus;
  // icon?: InputIcon; // clear | eye | none
  leftIcon?: InputIcon;
  rightIcon?: InputIcon;
  clearable?: boolean;
  //   showPasswordToggle?: boolean;
  showCheckOnValid?: boolean;
  onClear?: () => void;
  onSearch?: (value: string) => void;
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
  onSearch,
  status = 'none',
  errorText,
  clearable = false,
  // icon = 'none',
  leftIcon = 'none',
  rightIcon = 'none',
  showCheckOnValid = false,
  className,
  containerClassName,
  onClear,
  ...props
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
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

  // 아이콘 설정
  const needRightIcon = isPassword || (clearable && hasValue) || (showCheckOnValid && isSuccess && hasValue);

  // 초기화 이벤트
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClear?.();
    onChange?.({ target: { value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  // 검색 이벤트
  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onSearch && inputRef.current) {
      onSearch(inputRef.current.value);
    }
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
        {/* 왼쪽 아이콘 영역 */}
        {leftIcon !== 'none' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pl-6">
            <button
              type="button"
              onClick={handleSearch}
              disabled={!hasValue}
              className="cursor-pointer"
              aria-label="검색하기"
            >
              {leftIcon === 'search' && (
                <Search className="w-[16px] h-[16px] text-neutral-400 hover:text-neutral-600" />
              )}
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          aria-invalid={isError || undefined}
          autoComplete={autoComplete}
          className={[
            'ring-offset-background file:text-sm flex w-full rounded-md border border-line-200 bg-background-default px-6 py-[12.5px]',
            'file:border-0 file:bg-transparent file:font-medium',
            'placeholder:text-body-2 placeholder:text-label-500',
            'focus-visible:outline-hidden disabled:cursor-not-allowed disabled:border-0',
            'disabled:bg-background-alternative disabled:text-status-disable disabled:placeholder:text-status-disable',
            'focus:ring-1 focus:ring-component-dark h-[48px]',
            isFocused && isError ? 'border-red-500 focus:ring-red-500' : '',
            isSuccess ? 'border-green-500' : '',
            leftIcon !== 'none' ? 'pl-12' : '',
            rightIcon !== 'none' ? 'pr-12' : '',

            // 커스텀 확장
            className ?? '',
          ].join(' ')}
          {...props}
        />

        {/* 오른쪽 아이콘 영역 */}
        {rightIcon !== 'none' && (
          <div className="absolute top-1/2 right-7 -translate-y-1/2 flex items-center gap-2">
            {rightIcon === 'clear' && hasValue && (
              <button type="button" onClick={handleClear} className="cursor-pointer" aria-label="입력 내용 지우기">
                <X className="w-[24px] h-[24px] text-neutral-400 hover:text-neutral-600" />
              </button>
            )}

            {rightIcon === 'eye' && (
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
            {status === 'success' && <Check className="w-[24px] h-[24px] text-green-500" />}
          </div>
        )}
      </div>

      {/* 에러 문구 */}
      {isFocused && !hasValue ? <p className="text-xs text-red-600">{errorText}</p> : null}
    </div>
  );
};

export default Input;
