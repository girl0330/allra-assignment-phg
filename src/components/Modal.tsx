'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  const router = useRouter();
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg flex flex-col gap-[34px]">
        {children}
        <Button
          className="w-full bg-primary"
          onClick={() => {
            onClose();
            router.push('/');
          }}
        >
          <p className=" text-background-default">닫기</p>
        </Button>
      </div>
    </div>
  );
}
