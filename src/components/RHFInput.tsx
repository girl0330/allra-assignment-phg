'use client';

import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import Input, { type InputStatus, type InputIcon } from '@/components/Input';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  leftIcon?: InputIcon;
  rightIcon?: InputIcon;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  containerClassName?: string;
  displayValue?: (v: string) => string;
  normalize?: (v: string) => string;
  successWhen?: (value: string) => boolean;
  onClear?: () => void;
};

export default function RHFInput<T extends FieldValues>({
  control,
  name,
  label,
  leftIcon = 'none',
  rightIcon = 'none',
  type = 'text',
  autoComplete = 'off',
  placeholder,
  disabled,
  readOnly,
  className,
  containerClassName,
  displayValue,
  normalize,
  successWhen,
  onClear,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const raw = (field.value ?? '') as string;
        const shown = displayValue ? displayValue(raw) : raw;

        const isError = !!fieldState.error;
        const isSuccess = !isError && successWhen?.(raw) === true;

        const status: InputStatus = isError ? 'error' : isSuccess ? 'success' : 'none';
        const errorText = fieldState.error?.message;

        return (
          <Input
            id={name}
            name={name}
            type={type}
            autoComplete={autoComplete}
            labelText={label}
            status={status}
            errorText={errorText}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            value={shown}
            onChange={(e) => {
              const v = (e.target as HTMLInputElement).value;
              const normalized = normalize ? normalize(v) : v;
              field.onChange(normalized);
            }}
            onBlur={field.onBlur}
            className={className}
            containerClassName={containerClassName}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            onClear={() => {
              onClear?.();
              field.onChange('');
            }}
          />
        );
      }}
    />
  );
}
