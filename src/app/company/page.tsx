export const metadata = {
  title: '会社概要 | 基板修理.com',
  description: '当サイトの運営会社情報を掲載しています。',
};

export default function CompanyPage() {
  return (
    <main className="bg-white">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-3">
            会社概要
          </h1>

          <div className="prose prose-neutral prose-lg max-w-none">
            <ul>
              <li><strong>会社名：</strong>構造Innovation株式会社</li>
              <li><strong>サイト名：</strong>基板修理.com</li>
              <li><strong>代表者：</strong>新山 浩季（にいやま ひろき）</li>
              <li><strong>所在地：</strong>〒301-0041 茨城県龍ケ崎市若柴町2240-1003 カシハラビル203</li>
              <li><strong>電話番号：</strong>080-9058-9906</li>
              <li><strong>メール：</strong>info@kibansyuuri.com</li>
              <li><strong>事業内容：</strong>スマートフォン・PC基板修理、データ復旧、Web制作</li>
              <li><strong>設立年月：</strong>2025年（予定）</li>
              <li><strong>営業時間：</strong>8:00〜20:00（年中無休）</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
