export const metadata = {
  title: '特定商取引法に基づく表記 | 基板修理.com',
  description: '当サイトにおける特定商取引法に基づく表記です。',
};

export default function LegalPage() {
  return (
    <main className="bg-white">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-3">
            特定商取引法に基づく表記
          </h1>

          <div className="prose prose-neutral prose-lg max-w-none">
            <ul>
              <li><strong>販売事業者：</strong>構造Innovation株式会社（基板修理.com）</li>
              <li><strong>運営責任者：</strong>新山 浩季（にいやま ひろき）</li>
              <li><strong>所在地：</strong>〒301-0041 茨城県龍ケ崎市若柴町2240-1003 カシハラビル203</li>
              <li><strong>電話番号：</strong>080-9058-9906</li>
              <li><strong>メールアドレス：</strong>info@kibansyuuri.com</li>
              <li><strong>販売価格：</strong>各サービス・修理ごとに税込価格を表示</li>
              <li><strong>商品代金以外の必要料金：</strong>送料、振込手数料など</li>
              <li><strong>お支払い方法：</strong>現金、銀行振込、クレジットカード（対応予定）</li>
              <li><strong>お引き渡し時期：</strong>修理完了後、速やかにご返送</li>
              <li><strong>キャンセル・返金：</strong>作業前であればキャンセル可。作業後の返金は不可。</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
