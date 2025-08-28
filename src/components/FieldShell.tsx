'use client';

import React from 'react';

export default function FieldShell({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      {children}
      {!!error && <p className="mt-1 text-xs text-status-error">{error}</p>}
    </div>
  );
}
