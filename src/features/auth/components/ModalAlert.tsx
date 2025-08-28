'use client';

import React, { useEffect } from 'react';
import { createRoot, Root } from 'react-dom/client';

type UnmountFn = () => void;

type AlertProps = {
  title: string;
  message: React.ReactNode;
  buttonText: string;
  onAction?: () => void;
  unmount: UnmountFn;
};

function Alert({ title, message, buttonText, onAction, unmount }: AlertProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') unmount();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [unmount]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      unmount();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onMouseDown={onBackdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-label-900 text-title-3 font-bold">{title}</h2>
          <div className="text-label-700 text-body-2 font-regular">{message}</div>
        </div>

        <button
          type="button"
          className="w-full bg-primary rounded-lg py-3 font-medium h-11.5"
          onClick={() => {
            try {
              onAction?.();
            } finally {
              unmount();
            }
          }}
        >
          <p className="text-background-default">{buttonText}</p>
        </button>
      </div>
    </div>
  );
}

let currentRoot: Root | null = null;
let currentHost: HTMLDivElement | null = null;

export function customAlert(title: string, message: React.ReactNode, buttonText: string, onAction?: () => void) {
  if (typeof window === 'undefined') return;

  if (currentRoot && currentHost) {
    currentRoot.unmount();
    currentHost.remove();
    currentRoot = null;
    currentHost = null;
  }

  const host = document.createElement('div');
  document.body.appendChild(host);
  const root = createRoot(host);

  const unmount: UnmountFn = () => {
    if (currentRoot) {
      currentRoot.unmount();
      currentRoot = null;
    }
    if (currentHost) {
      currentHost.remove();
      currentHost = null;
    }
  };

  currentRoot = root;
  currentHost = host;

  root.render(<Alert title={title} message={message} buttonText={buttonText} onAction={onAction} unmount={unmount} />);
}
