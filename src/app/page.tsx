'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CircuitBoard,
  Wrench,
  Droplets,
  Star,
  Menu,
  X,
  ChevronRight,
  PowerOff,
  Database
} from 'lucide-react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
};
type CardProps = React.HTMLAttributes<HTMLDivElement>;
type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  name: string;
  device: string;
}

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'default', size = 'default', ...props },
  ref
) {
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
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

const Card = ({ className, children, ...props }: CardProps) => (
  <div className={cn('rounded-xl border bg-white text-gray-900 shadow-sm', className)} {...props}>
    {children}
  </div>
);
const CardHeader = ({ className, children, ...props }: CardHeaderProps) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>{children}</div>
);
const CardContent = ({ className, children, ...props }: CardContentProps) => (
  <div className={cn('p-6 pt-0', className)} {...props}>{children}</div>
);
const CardFooter = ({ className, children, ...props }: CardFooterProps) => (
  <div className={cn('flex items-center p-6 pt-0', className)} {...props}>{children}</div>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: 'サービス', href: '#features' },
    { name: '修理事例', href: '/repairs' },
    { name: '技術コラム', href: '/blog' },
    { name: 'お問い合わせ', href: '/contact' },
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
          <div className="hidden md:block">
            <Link href="/contact">
              <Button>無料相談・お見積もり</Button>
            </Link>
          </div>
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
              <Link key={link.name} href={link.href} className="px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <Link href="/contact" className="w-full mt-2">
              <Button className="w-full">無料相談・お見積もり</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

const Hero = () => (
  <section className="bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
        <span className="text-blue-600">データ復旧率90%以上。</span><br />
        他店で断られたスマホ・PC基板修理
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
        リンゴループ、起動不良、水没で諦めていた大切なデータ。専門の技術者があなたのスマホを救います。
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/contact"><Button size="lg">今すぐ無料診断を申し込む</Button></Link>
        <a href="#features"><Button size="lg" variant="outline">サービス内容を見る</Button></a>
      </div>
    </div>
  </section>
);

const Features = () => {
  const features: Feature[] = [
    { icon: PowerOff, title: '起動しない', description: '突然電源が入らなくなった、充電しても反応がない端末を復旧させます。' },
    { icon: Droplets, title: '水没してしまった', description: 'お風呂や海で水没した端末から、写真や連絡先を救出します。' },
    { icon: Database, title: 'データ復旧', description: '他店で修理不可とされた端末でも、高確率でデータを取り出します。' },
    { icon: Wrench, title: '他店修理不可', description: '「基板が原因」と言われた難易度の高い修理もお任せください。' },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">あらゆる基板トラブルに対応</h2>
          <p className="mt-4 text-lg text-gray-600">あなたの「困った」を解決します。</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    { quote: 'リンゴループで完全に諦めていたiPhoneから、子供の写真データが全て戻ってきました。本当に感謝しています。', name: '佐藤様', device: 'iPhone 12 Pro' },
    { quote: '別の修理店では基板交換で高額になると言われましたが、こちらでは安く修理していただき、データもそのままでした。', name: '鈴木様', device: 'iPhone SE2' },
    { quote: '水没させてしまい電源が入らなくなったスマホ。LINEの履歴も復元できて、仕事に支障が出ずに済みました。', name: '高橋様', device: 'iPhone 13 mini' },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">お客様の声・修理事例</h2>
          <p className="mt-4 text-lg text-gray-600">数々の修理を成功させてきました。※これはサンプルです。</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name}>
              <CardContent className="pt-6">
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-700">&quot;{item.quote}&quot;</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm font-semibold text-gray-900">{item.name} <span className="text-gray-500 font-normal">({item.device})</span></p>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/repairs">
            <Button variant="outline">すべての修理事例を見る <ChevronRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="bg-gray-900">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          大切なデータを諦めないでください
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          まずは無料診断から。専門スタッフがあなたの状況を詳しくお伺いし、最適な修理方法をご提案します。
        </p>
        <Link href="/contact">
          <Button size="lg" className="mt-8">お問い合わせフォームへ進む</Button>
        </Link>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-50 border-t">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center space-x-2">
            <CircuitBoard className="h-7 w-7 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">基板修理.com</span>
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            スマートフォン・PC等の基板修理とデータ復旧の専門サービス。
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">サイトマップ</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="#features" className="text-sm text-gray-500 hover:text-gray-900">サービス</a></li>
            <li><Link href="/repairs" className="text-sm text-gray-500 hover:text-gray-900">修理事例</Link></li>
            <li><Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900">技術コラム</Link></li>
            <li><Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">お問い合わせ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">サポート</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">運営会社</a></li>
            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">プライバシーポリシー</a></li>
            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">特定商取引法に基づく表記</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} kibansyuuri.com. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default function HomePage() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
