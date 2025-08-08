import {
  Header,
  Footer,
  Button,
} from '@/components/Layout';
import Link from 'next/link';
import {
  Wrench,
  Droplets,
  Star,
  ChevronRight,
  PowerOff,
  Database,
} from 'lucide-react';


const Hero = () => (
  <section className="bg-white dark:bg-gray-900">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
        <span className="text-blue-600 dark:text-blue-400">データ復旧率90%以上。</span>
        <br />
        他店で断られたスマホ・PC基板修理
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300">
        リンゴループ、起動不良、水没で諦めていた大切なデータ。専門の技術者があなたのデバイスを救います。
      </p>
      <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link href="/contact">
          <Button variant="primary">今すぐ無料診断を申し込む</Button>
        </Link>
        <Link href="#features">
          <Button variant="secondary">サービス内容を見る</Button>
        </Link>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-20 sm:py-24 bg-gray-50 dark:bg-gray-800/50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          あらゆる基板トラブルに対応
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          スマートフォンからPCまで、他店で修理不可と診断された重度の故障もお任せください。
        </p>
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: PowerOff, title: '起動しない', description: '突然電源が入らなくなった' },
          { icon: Droplets, title: '水没・液体こぼし', description: 'コーヒーや雨で濡れてしまった' },
          { icon: Database, title: 'データ復旧', description: '写真や連絡先を取り出したい' },
          { icon: Wrench, title: '他店修理不可', description: '「修理できない」と言われた' },
        ].map(({ icon: Icon, title, description }) => (
          <div key={title} className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-transform hover:scale-105">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mx-auto mb-6">
              <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-20 sm:py-24 bg-white dark:bg-gray-900">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          お客様の声・修理事例
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          多くのお客様から感謝の声をいただいています。
        </p>
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            name: '佐藤様',
            quote: 'リンゴループで完全に諦めていたiPhoneから、子供の写真データが全て戻ってきました。本当に感謝しています。',
            device: 'iPhone 12 Pro',
          },
          {
            name: '鈴木様',
            quote: '別の修理店では基板交換で高額になると言われましたが、こちらでは安く修理していただき、データもそのままでした。',
            device: 'Galaxy S21',
          },
          {
            name: '高橋様',
            quote: '水没で電源が入らなくなったPCから、大事な仕事のファイルを取り出してもらえました。迅速な対応に感謝です。',
            device: 'MacBook Air',
          },
        ].map(({ name, quote, device }) => (
          <div key={name} className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl shadow-lg flex flex-col">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            {/* ✅ 引用符をHTMLエンティティに修正 */}
            <blockquote className="flex-grow text-gray-700 dark:text-gray-200 italic">&ldquo;{quote}&rdquo;</blockquote>
            <p className="mt-6 text-sm font-semibold text-gray-600 dark:text-gray-400 text-right">
              {name}様（{device}）
            </p>
          </div>
        ))}
      </div>
      <div className="text-center mt-16">
        <Link href="/repairs">
          <Button variant="secondary">
            すべての修理事例を見る <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="bg-blue-600 dark:bg-blue-700">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          大切なデータを諦めないでください
        </h2>
        <p className="mt-4 text-lg text-white">
          まずは無料診断から。専門スタッフがあなたの状況を詳しくお伺いし、最適な修理方法をご提案します。
        </p>
        <div className="mt-8">
          <Link href="/contact">
            <Button
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-gray-100 dark:text-blue-700 dark:hover:bg-blue-100"
            >
              お問い合わせフォームへ進む
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
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
