'use client';

import React, { useState, useRef } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { CircuitBoard, Menu, X, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Tailwind 用ユーティリティ
const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ');

// Button コンポーネント
type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
>(function Button({ className, variant = 'default', size = 'default', ...props }, ref) {
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-600/90',
    destructive: 'bg-red-500 text-white hover:bg-red-500/90',
    outline: 'border border-gray-200 bg-transparent hover:bg-gray-100',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-100/80',
    ghost: 'hover:bg-gray-100',
    link: 'text-blue-600 underline-offset-4 hover:underline',
  };
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
Button.displayName = 'Button';

// Input コンポーネント
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50',
        props.className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

// Textarea コンポーネント
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  (props, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[120px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50',
        props.className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';

// ヘッダー
const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { name: 'ホーム', href: '/' },
    { name: '修理事例', href: '/cases' },
    { name: '技術コラム', href: '/blog' },
    { name: 'お問い合わせ', href: '/contact' },
  ];
  return (
    <header className="bg-white/90 sticky top-0 z-50 border-b backdrop-blur">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-2">
          <CircuitBoard className="h-7 w-7 text-blue-600" />
          <span className="text-xl font-bold">基板修理.com</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-gray-500 hover:text-blue-600">
              {l.name}
            </Link>
          ))}
        </nav>
        <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              {l.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
Header.displayName = 'Header';

// フッター
const Footer: React.FC = () => (
  <footer className="bg-gray-50 border-t py-6 mt-12">
    <div className="container mx-auto text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} kibansyuuri.com. All Rights Reserved.
    </div>
  </footer>
);
Footer.displayName = 'Footer';

// フォームのバリデーションスキーマ
const formSchema = z.object({
  name: z.string().min(1, { message: 'お名前は必須です。' }),
  phone: z
    .string()
    .min(10)
    .regex(/^([0-9]{10,11})$/, { message: '電話番号の形式が正しくありません。' }),
  email: z.string().email({ message: '有効なメールアドレスを入力してください。' }),
  device: z.string().min(1, { message: '機種名は必須です。' }),
  message: z.string().min(10, { message: 'ご相談内容は10文字以上で入力してください。' }),
  attachment: z.any().optional(),
});
type FormValues = z.infer<typeof formSchema>;

// InputGroupProps を input/textarea で分岐
type InputGroupInputProps = {
  label: string;
  id: string;
  error?: string;
  isTextarea?: false;
} & UseFormRegisterReturn &
  React.InputHTMLAttributes<HTMLInputElement>;

type InputGroupTextareaProps = {
  label: string;
  id: string;
  error?: string;
  isTextarea: true;
} & UseFormRegisterReturn &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type InputGroupProps = InputGroupInputProps | InputGroupTextareaProps;

const InputGroup: React.FC<InputGroupProps> = (props) => {
  const { label, id, error, isTextarea, ...rest } = props;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-1">
        {label}
      </label>
      {isTextarea ? (
        <Textarea id={id} {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <Input id={id} {...(rest as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
InputGroup.displayName = 'InputGroup';

// ContactForm
const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setStatus({ status: 'loading', message: '' });
    if (!formRef.current) return;
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus({ status: 'success', message: 'お問い合わせありがとうございます。確認後、担当者よりご連絡いたします。' });
      reset();
    } catch {
      setStatus({ status: 'error', message: '送信に失敗しました。時間をおいて再度お試しください。' });
    }
  });

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">お問い合わせ</h1>
          <p className="text-center mb-6 text-gray-600">
            修理のご相談、お見積もり依頼など、お気軽にお問い合わせください。&quot;データを残したい&quot;などのご要望もOKです。
          </p>

          {status.status === 'success' && (
            <div className="bg-green-50 border border-green-200 p-4 rounded mb-6">
              <p className="text-green-800">{status.message}</p>
            </div>
          )}
          {status.status === 'error' && (
            <div className="bg-red-50 border border-red-200 p-4 rounded mb-6">
              <p className="text-red-800">{status.message}</p>
            </div>
          )}

          <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
            <InputGroup label="お名前" id="name" error={errors.name?.message} {...register('name')} />
            <InputGroup label="電話番号" id="phone" error={errors.phone?.message} {...register('phone')} />
            <InputGroup label="メールアドレス" id="email" error={errors.email?.message} {...register('email')} />
            <InputGroup label="機種名" id="device" error={errors.device?.message} {...register('device')} placeholder="例: iPhone 13 Pro" />
            <InputGroup
              label="故障内容・ご相談内容"
              id="message"
              isTextarea
              error={errors.message?.message}
              {...register('message')}
            />
            <div>
              <Button type="submit" className="w-full" disabled={status.status === 'loading'}>
                {status.status === 'loading' ? <><Loader2 className="animate-spin mr-2" />送信中...</> : '同意して送信する'}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            <Link href="/">ホームに戻る</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
ContactForm.displayName = 'ContactForm';

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactForm />
      <Footer />
    </>
  );
}
