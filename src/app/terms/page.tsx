export const metadata = {
  title: '利用規約 | 基板修理.com',
  description: '当サイトのご利用にあたっての規約です。',
};

export default function TermsPage() {
  return (
    <main className="bg-white">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-3">
            利用規約
          </h1>

          <div className="prose prose-neutral prose-lg max-w-none">
            <p>
              本利用規約（以下「本規約」）は、基板修理.com（以下「当サイト」）が提供するすべてのサービスの利用条件を定めるものです。
            </p>

            <h2>第1条（適用）</h2>
            <p>
              本規約は、利用者が当サイトを利用するすべての行為に適用されます。
            </p>

            <h2>第2条（禁止事項）</h2>
            <ul>
              <li>虚偽の情報の提供</li>
              <li>他人の権利を侵害する行為</li>
              <li>不正アクセスやサーバーへの攻撃</li>
              <li>当サイトの運営を妨げる行為</li>
            </ul>

            <h2>第3条（免責事項）</h2>
            <p>
              当サイトは、提供する情報・サービスについて正確性を保証するものではありません。利用者が被った損害について一切の責任を負いません。
            </p>

            <h2>第4条（変更）</h2>
            <p>
              本規約は予告なく変更されることがあります。最新の内容は本ページをご確認ください。
            </p>

            <p className="text-sm text-gray-500 mt-12">制定日：2025年8月2日</p>
          </div>
        </div>
      </section>
    </main>
  );
}
