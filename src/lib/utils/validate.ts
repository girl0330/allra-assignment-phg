/** 정규식 REGEX */
export const EMAIL_PATTERN_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const ONLY_NUMBER_10_RE = /^\d{10}$/;
export const ONLY_NUMBER_8_RE = /^\d{8}$/;
export const PHONE_PATTERN_RE = /^010\d{8}$/;

/** 날짜: YYYYMMDD 유효성 */
export const isValidDateYYYYMMDD = (v: string) => {
  if (!ONLY_NUMBER_8_RE.test(v)) return false;
  const y = +v.slice(0, 4),
    m = +v.slice(4, 6),
    d = +v.slice(6, 8);
  if (y < 1900 || y > 2100 || m < 1 || m > 12) return false;
  const last = new Date(y, m, 0).getDate();
  return d >= 1 && d <= last;
};

/** 비밀번호: 8~15 / 영문, 숫자, 특수문자 */
export const isValidPassword = (v: string) =>
  v.length >= 8 && v.length <= 15 && /[A-Za-z]/.test(v) && /\d/.test(v) && /[^A-Za-z0-9]/.test(v);

/**
 * 공백 제거 후 1자 이상인지
 */
export const isNotBlank = (v?: string | null) => !!v && v.trim().length > 0;

/**
 * 이메일 형식 검증
 */
export const isValidEmail = (v?: string | null) => !!v && EMAIL_PATTERN_RE.test(v);

/**
 * 사업자등록번호(숫자 10자리) 검증
 */
export const isValidBizNo = (v?: string | null) => !!v && ONLY_NUMBER_10_RE.test(v);

/**
 * 휴대폰 010-******** 형식(합계 11자리) 검증
 */
export const isValidPhoneNo = (v?: string | null) => !!v && PHONE_PATTERN_RE.test(v);

/**
 * 생년월일 8자리 + 달력 유효성까지 검증
 * 1) isValidDateYYYYMMDD로 실제 달력 날짜 여부 판단(윤년/월말 등)
 */
export const isValidBirth = (s?: string | null) => !!s && ONLY_NUMBER_8_RE.test(s) && isValidDateYYYYMMDD(s);
