'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { CircuitBoard, Menu, X, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// utility for Tailwind classes
const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ');

// Button component with dark mode support
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }
>(function Button({ className, variant = 'default', size = 'default', ...props }, ref) {
  const variants = {
    default: 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 transform transition-transform hover:-translate-y-1',
    destructive: 'bg-red-500 text-white shadow-sm hover:bg-red-500/90',
    outline: 'border border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    link: 'text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline',
  };
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-lg px-8 text-base',
    icon: 'h-10 w-10',
  };
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white dark:ring-offset-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
Button.displayName = 'Button';

// Input and Textarea with enhanced visibility
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:ring-offset-gray-900 dark:placeholder:text-gray-500', // Dark mode styles
        props.className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  (props, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[120px] w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:ring-offset-gray-900 dark:placeholder:text-gray-500', // Dark mode styles
        props.className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';

// Header
const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { name: 'ホーム', href: '/' },
    { name: '修理事例', href: '/repairs' },
    { name: '技術コラム', href: '/blog' },
    { name: 'お問い合わせ', href: '/contact' },
  ];
  return (
    <header className="bg-white/90 dark:bg-gray-900/90 sticky top-0 z-50 border-b dark:border-gray-800 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <CircuitBoard className="h-7 w-7 text-blue-600" />
          <span className="text-xl font-bold text-gray-800 dark:text-gray-100">基板修理.com</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              {l.name}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </Button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-4 py-3 text-base hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
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

// Footer
const Footer: React.FC = () => (
  <footer className="bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 py-8 mt-12">
    <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
      &copy; {new Date().getFullYear()} kibansyuuri.com. All Rights Reserved.
    </div>
  </footer>
);
Footer.displayName = 'Footer';

// Form schema
const formSchema = z.object({
  name: z.string().min(1, { message: 'お名前は必須です。' }),
  phone: z
    .string()
    .min(10, { message: '電話番号は10桁以上で入力してください。'})
    .regex(/^([0-9]{10,11})$/, { message: '電話番号の形式が正しくありません。' }),
  email: z.string().email({ message: '有効なメールアドレスを入力してください。' }),
  device: z.string().min(1, { message: '機種名は必須です。' }),
  message: z.string().min(10, { message: 'ご相談内容は10文字以上で入力してください。' }),
  attachment: z.any().optional(),
});
type FormValues = z.infer<typeof formSchema>;

// InputGroup
type InputGroupProps = {
  label: string;
  id: keyof FormValues;
  error?: string;
  isTextarea?: boolean;
  register: UseFormRegisterReturn;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;


const InputGroup: React.FC<InputGroupProps> = ({ label, id, error, isTextarea, register, ...rest }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
      {label}
    </label>
    {isTextarea ? (
      <Textarea id={id} {...register} {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
    ) : (
      <Input id={id} {...register} {...(rest as React.InputHTMLAttributes<HTMLInputElement>)} />
    )}
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);
InputGroup.displayName = 'InputGroup';

// ContactForm
const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ status: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: '',
  });
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // 予約フォームスクリプトの読み込み
  useEffect(() => {
    // 既にスクリプトが読み込まれているかチェック
    const existingScript = document.querySelector('script[src="https://www.yokareserve.com/embed.js"]');
    if (existingScript) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.yokareserve.com/embed.js';
    script.async = true;
    script.onerror = () => {
      console.error('予約フォームスクリプトの読み込みに失敗しました');
    };
    document.body.appendChild(script);

    return () => {
      // クリーンアップ（必要に応じて）
      const scriptToRemove = document.querySelector('script[src="https://www.yokareserve.com/embed.js"]');
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, []);

  const onSubmit = handleSubmit(async () => {
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
    } catch (e) {
      console.error(e);
      setStatus({ status: 'error', message: '送信に失敗しました。時間をおいて再度お試しください。' });
    }
  });

  return (
    <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-gray-50">お問い合わせ</h1>
          <p className="text-center mb-8 text-gray-600 dark:text-gray-300">
            修理のご相談、お見積もり依頼など、お気軽にお問い合わせください。
          </p>

          {status.status === 'success' && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg mb-6">
              <p className="text-green-800 dark:text-green-300 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />{status.message}</p>
            </div>
          )}
          {status.status === 'error' && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-6">
              <p className="text-red-800 dark:text-red-300 flex items-center"><AlertCircle className="w-5 h-5 mr-2" />{status.message}</p>
            </div>
          )}

          <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
            <InputGroup label="お名前" id="name" error={errors.name?.message} register={register('name')} />
            <InputGroup label="電話番号" id="phone" error={errors.phone?.message} register={register('phone')} />
            <InputGroup label="メールアドレス" id="email" error={errors.email?.message} register={register('email')} />
            <InputGroup label="機種名" id="device" error={errors.device?.message} register={register('device')} placeholder="例: iPhone 13 Pro" />
            <InputGroup label="故障内容・ご相談内容" id="message" isTextarea error={errors.message?.message} register={register('message')} />
            <div>
              <Button type="submit" size="lg" className="w-full" disabled={status.status === 'loading'}>
                {status.status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    送信中...
                  </>
                ) : (
                  '同意して送信する'
                )}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:underline">ホームに戻る</Link>
          </div>

          {/* 予約フォーム */}
          <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50">予約フォーム</h2>
            <div data-yoka-form="f12f8f17-fb95-4e5a-8899-13274866fe61"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
ContactForm.displayName = 'ContactForm';

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />
      <ContactForm />
      <Footer />
    </div>
  );
}
