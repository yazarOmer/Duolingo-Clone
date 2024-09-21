import { z } from "zod";

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Kullanıcı adı 3 karakterden uzun olmalı" }),
  email: z
    .string()
    .email({ message: "Lütfen geçerli bir e-posta adresi girin" }),
  password: z.string().min(4, { message: "Parola 4 karakterden uzun olmalı" }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Lütfen geçerli bir e-posta adresi girin" }),
  password: z.string().min(4, { message: "Parola 4 karakterden uzun olmalı" }),
});
