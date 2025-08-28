import { useQueryClient } from '@tanstack/react-query';
import { clearTokens } from '@/store/tokenStore';

export function useLogout() {
  const qc = useQueryClient();

  return () => {
    clearTokens();
    // 캐시 삭제
    qc.removeQueries({ queryKey: ['auth', 'me'] });
  };
}
