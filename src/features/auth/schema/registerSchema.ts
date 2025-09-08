import { z } from 'zod';
import { isValidDateYYYYMMDD, isValidPassword } from '@/lib/utils/validate';

// Zod Schema
export const SignUpSchema = z
  .object({
    // Step1 (약관)
    terms: z.boolean(),
    privacy: z.boolean(),
    manage: z.boolean(),
    inquiry: z.boolean(),
    isMarketingConsent: z.boolean(),

    // Step2
    businessNumber: z.string().regex(/^\d{10}$/, '사업자등록번호 10자리를 입력해 주세요.'),
    password: z
      .string()
      .min(8, '8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요')
      .max(15, '8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요')
      .refine(isValidPassword, '8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요'),
    passwordConfirm: z.string(),
    userName: z.string().min(1, '대표자명을 입력해주세요'),
    birthDate: z
      .string()
      .regex(/^\d{8}$/, '생년월일은 YYYYMMDD 형식입니다.')
      .refine(isValidDateYYYYMMDD, '생년월일이 올바르지 않거나 미래 날짜입니다.'),
    phone: z.string().regex(/^010\d{8}$/, '휴대폰 번호는 01012345678 형식입니다.'),
    email: z.string().email('이메일 형식이 올바르지 않습니다.'),

    companyName: z.string(),
    companyAutoLock: z.boolean(),
    bizVerified: z.boolean(),
    businessNumberVerifyToken: z.string().min(1, '사업자 인증이 필요합니다.'),
  })
  .superRefine((data, ctx) => {
    if (data.passwordConfirm !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['passwordConfirm'],
        message: '위에 입력된 비밀번호와 다르게 입력되었어요',
      });
    }
    if (data.bizVerified && !data.companyAutoLock) {
      if (!data.companyName || data.companyName.trim().length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['companyName'], message: '상호명을 입력해주세요' });
      }
    }
  });

export type FormData = z.infer<typeof SignUpSchema>;

export const defaultValues: FormData = {
  // Step1
  terms: false,
  privacy: false,
  manage: false,
  inquiry: false,
  isMarketingConsent: false,
  // Step2
  businessNumber: '',
  password: '',
  passwordConfirm: '',
  userName: '',
  birthDate: '',
  phone: '',
  email: '',
  companyName: '',
  companyAutoLock: false,
  bizVerified: false,
  businessNumberVerifyToken: '',
};
