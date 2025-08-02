import { Header, Footer } from '@/components/Layout';

export const metadata = {
  title: 'プライバシーポリシー | 基板修理.com',
  description: '当サイトのプライバシーポリシーをご案内します。',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-3">
              プライバシーポリシー
            </h1>

            <div className="prose prose-neutral prose-lg max-w-none text-gray-800">
              <p>
                基板修理.com（以下「当サイト」）では、ユーザーの皆様のプライバシーを尊重し、個人情報の保護に努めています。
                本ポリシーでは、当サイトにおける個人情報の取り扱いについてご説明いたします。
              </p>

              <h2>1. 個人情報の利用目的</h2>
              <p>
                当サイトでは、お問い合わせやサービス申込時に以下の目的で個人情報を取得・利用します。
              </p>
              <ul>
                <li>サービス提供および修理業務の遂行</li>
                <li>ご連絡・ご案内のためのメール送信やお電話</li>
                <li>サービス改善のための分析</li>
              </ul>

              <h2>2. 個人情報の第三者提供</h2>
              <p>
                ユーザーの同意がある場合、または法令に基づく場合を除き、第三者に個人情報を提供することはありません。
              </p>

              <h2>3. 外部サービスとの連携</h2>
              <p>
                当サイトでは、Google Analytics等のアクセス解析ツールを使用する場合があります。これにより収集される情報には、個人を特定するものは含まれません。
              </p>

              <h2>4. お問い合わせ</h2>
              <p>
                本ポリシーに関するお問い合わせは、以下までご連絡ください。
              </p>
              <p>
                代表者：新山 浩季（にいやま ひろき）<br />
                メール：info@kibansyuuri.com<br />
                電話番号：080-9058-9906
              </p>

              <h2>5. 改定について</h2>
              <p>
                本ポリシーは、必要に応じて予告なく変更される場合があります。最新のプライバシーポリシーは常に本ページにて公開されます。
              </p>

              <p className="text-sm text-gray-500 mt-12">制定日：2025年8月2日</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}