'use client';

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import {
  CircuitBoard, Menu, X,
  Loader2, AlertCircle, CheckCircle
} from 'lucide-react';
import Link from 'next/link';

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ');

// ✅ 修正済み Button（variantとsizeを限定）
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }
>(function Button({ className, variant = 'default', size = 'default', ...props }, ref) {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-600/90",
    destructive: "bg-red-500 text-white hover:bg-red-500/90",
    outline: "border border-gray-200 bg-transparent hover:bg-gray-100",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80",
    ghost: "hover:bg-gray-100",
    link: "text-blue-600 underline-offset-4 hover:underline",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: "ホーム", href: "/" },
    { name: "修理事例", href: "/cases" },
    { name: "技術コラム", href: "/blog" },
    { name: "お問い合わせ", href: "/contact" },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <CircuitBoard className="h-7 w-7 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">基板修理.com</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="md:hidden">
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-600">
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="bg-gray-50 border-t">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} kibansyuuri.com. All Rights Reserved.</p>
    </div>
  </footer>
);

const formSchema = z.object({
  name: z.string().min(1, { message: "お名前は必須です。" }),
  phone: z.string().min(10).regex(/^([0-9]{10,11})$/, { message: "電話番号の形式が正しくありません。" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください。" }),
  device: z.string().min(1, { message: "機種名は必須です。" }),
  message: z.string().min(10, { message: "ご相談内容は10文字以上で入力してください。" }),
  attachment: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState({ status: 'idle', message: '' });
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const onSubmit = (data: FormValues) => {
    setFormStatus({ status: 'loading', message: '' });
    if (!formRef.current) return;

    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
      .then(() => {
        setFormStatus({ status: 'success', message: 'お問い合わせありがとうございます。確認後、担当者よりご連絡いたします。' });
        reset();
      })
      .catch(() => {
        setFormStatus({ status: 'error', message: '送信に失敗しました。時間をおいて再度お試しください。' });
      });
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">お問い合わせ</h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">修理のご相談、お見積もり依頼など、お気軽にお問い合わせください。</p>
          </div>

          {formStatus.status === 'success' && (
            <div className="mt-8 rounded-md bg-green-50 p-4 flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
              <p className="ml-3 text-sm font-medium text-green-800">{formStatus.message}</p>
            </div>
          )}

          {formStatus.status === 'error' && (
            <div className="mt-8 rounded-md bg-red-50 p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-400 mt-1" />
              <p className="ml-3 text-sm font-medium text-red-800">{formStatus.message}</p>
            </div>
          )}

          {formStatus.status !== 'success' && (
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
              <InputGroup label="お名前" id="name" error={errors.name?.message} {...register('name')} />
              <InputGroup label="電話番号" id="phone" error={errors.phone?.message} {...register('phone')} />
              <InputGroup label="メールアドレス" id="email" error={errors.email?.message} {...register('email')} />
              <InputGroup label="機種名" id="device" error={errors.device?.message} {...register('device')} placeholder="例: iPhone 13 Pro" />
              <InputGroup label="故障内容・ご相談内容" id="message" error={errors.message?.message} isTextarea {...register('message')} />
              <InputGroup label="添付ファイル" id="attachment" type="file" {...register('attachment')} />
              <div className="mt-10">
                <Button type="submit" className="w-full" disabled={formStatus.status === 'loading'}>
                  {formStatus.status === 'loading' ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />送信中...</> : '同意して送信する'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, id, error, isTextarea = false, ...props }: any) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold leading-6 text-gray-900">{label}</label>
    <div className="mt-2.5">
      {isTextarea ? <Textarea id={id} {...props} /> : <Input id={id} {...props} />}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  </div>
);

export default function ContactPage() {
  return (
    <div className="bg-white">
      <Header />
      <main><ContactForm /></main>
      <Footer />
    </div>
  );
}
