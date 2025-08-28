// 사업자등록번호 포맷터
export const formatBizNo = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 10);
  const a = d.slice(0, 3),
    b = d.slice(3, 5),
    c = d.slice(5);
  return [a, b, c].filter(Boolean).join('-');
};

// 생년월일 포맷터
export const formatBirth = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 8);
  const y = d.slice(0, 4),
    m = d.slice(4, 6),
    da = d.slice(6, 8);
  return [y, m, da].filter(Boolean).join('-');
};

// 휴대폰 번호 포맷터
export const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
};

// 페이지네이션 번호 계산
export function getPageNumbers(page: number, totalPages: number, windowSize = 5) {
  if (!totalPages) return [];
  const block = Math.floor((page - 1) / windowSize);
  const start = block * windowSize + 1;
  const end = Math.min(totalPages, start + windowSize - 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// 날짜 포맷터
export function formatDate(dateString: string) {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(d)
    .replace(/\.$/, '');
}
