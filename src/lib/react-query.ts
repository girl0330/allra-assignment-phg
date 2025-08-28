'use client';

import { QueryClient } from '@tanstack/react-query';

// 앱 전체에서 하나만 쓰는 전역 인스턴스
export const queryClient = new QueryClient();
