import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }).trim(),
  password: z.string().min(1, { message: "กรุณากรอกรหัสผ่าน" }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร" })
      .trim(),
    email: z.string().email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }).trim(),
    password: z
      .string()
      .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" })
      .regex(/[a-zA-Z]/, { message: "ต้องมีตัวอักษรอย่างน้อย 1 ตัว" })
      .regex(/[0-9]/, { message: "ต้องมีตัวเลขอย่างน้อย 1 ตัว" }),
    confirmPassword: z.string().min(1, { message: "กรุณายืนยันรหัสผ่าน" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
