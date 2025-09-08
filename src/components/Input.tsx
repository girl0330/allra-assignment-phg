'use client';

import React, { useId, useRef, useState, forwardRef } from 'react';
import { Eye, EyeOff, Check, X, Search } from 'lucide-react';

export type InputStatus = 'none' | 'error' | 'success';
export type InputIcon = 'clear' | 'eye' | 'none' | 'search';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  labelHidden?: boolean;
  errorText?: string;
  status?: InputStatus;
  leftIcon?: InputIcon;
  rightIcon?: InputIcon;
  clearable?: boolean;
  onClear?: () => void;
  onSearch?: (value: string) => void;
  containerClassName?: string;
  className?: string;
  autoComplete?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
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
    leftIcon = 'none',
    rightIcon = 'none',
    className,
    containerClassName,
    onClear,
    ...props
  },
  ref
) {
  const innerRef = useRef<HTMLInputElement>(null);
  const inputRef = (ref as React.RefObject<HTMLInputElement>) || innerRef;

  const [showPwd, setShowPwd] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const generatedId = useId();
  const inputId = id ?? generatedId;

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPwd ? 'text' : 'password') : type;

  const hasValue = typeof value === 'string' ? value.length > 0 : typeof value === 'number' ? true : false;

  const isError = status === 'error';
  const isSuccess = status === 'success';

  const willHaveRightAdornment = rightIcon !== 'none' || isPassword || isSuccess;

  // 공통 검색 실행
  const runSearch = () => {
    if (onSearch && inputRef && 'current' in inputRef && inputRef.current) {
      onSearch(inputRef.current.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') runSearch();
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClear?.();
    if (onChange) {
      onChange({ target: { value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>);
    } else if (inputRef && 'current' in inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-3 ${containerClassName ?? ''}`}>
      {labelText && (
        <label className={`text-body-3 font-medium text-label-700 ${labelHidden ? 'sr-only' : ''}`} htmlFor={inputId}>
          {labelText}
        </label>
      )}

      <div className="relative w-full">
        {/* 왼쪽 아이콘 */}
        {leftIcon !== 'none' && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center  px-4">
            {leftIcon === 'search' && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  runSearch();
                }}
                disabled={!onSearch}
                className="pointer-events-auto cursor-pointer"
              >
                <Search className="w-[24px] h-[24px] text-neutral-400 hover:text-neutral-600" />
              </button>
            )}
          </div>
        )}

        <input
          ref={inputRef as any}
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          autoComplete={autoComplete}
          className={[
            'ring-offset-background file:text-sm flex h-[48px] w-full rounded-md border border-line-200 bg-background-default mx-4 py-[12.5px]',
            'file:border-0 file:bg-transparent file:font-medium',
            'placeholder:text-body-2 placeholder:text-label-500',
            'focus-visible:outline-hidden disabled:cursor-not-allowed disabled:border-0',
            'disabled:bg-background-alternative disabled:text-status-disable disabled:placeholder:text-status-disable',
            'focus:ring-1 focus:ring-component-dark',
            isError ? 'border-red-500 focus:ring-red-500' : '',
            isSuccess ? 'border-green-500' : '',
            leftIcon !== 'none' ? 'pl-[34px]' : 'pl-4',
            willHaveRightAdornment ? 'pr-[12px]' : 'pr-4',
            className ?? '',
          ].join(' ')}
          {...props}
        />

        {/* 오른쪽 아이콘 */}
        {(rightIcon !== 'none' || isPassword || isSuccess) && (
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 px-4">
            {rightIcon === 'clear' && hasValue && (
              <button type="button" onClick={handleClear} className="cursor-pointer">
                <X className="w-[24px] h-[24px] text-neutral-400 hover:text-neutral-600" />
              </button>
            )}

            {rightIcon === 'eye' && isPassword && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPwd((p) => !p);
                }}
                className="cursor-pointer"
              >
                {showPwd ? (
                  <EyeOff className="w-[24px] h-[24px] text-neutral-400 hover:text-neutral-600" />
                ) : (
                  <Eye className="w-[24px] h-[24px] text-neutral-400 hover:text-neutral-600" />
                )}
              </button>
            )}

            {isSuccess && <Check className="w-[24px] h-[24px] text-green-500" />}
          </div>
        )}
      </div>

      {/* 에러 문구 */}
      {isFocused && isError && errorText ? <p className="text-xs text-red-600">{errorText}</p> : null}
    </div>
  );
});

export default Input;
