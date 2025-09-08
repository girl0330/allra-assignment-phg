import { z } from 'zod';
import { isValidDateYYYYMMDD, isValidPassword } from '@/lib/utils/validate';

export const LoginSchema = z.object({
  businessNumber: z.string().regex(/^\d{10}$/, '사업자등록번호 10자리를 입력해 주세요.'),
  password: z
    .string()
    .min(8, '8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요')
    .max(15, '8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요')
    .refine(isValidPassword, '8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요'),
  saveId: z.boolean(),
});

export type LoginForm = z.infer<typeof LoginSchema>;
