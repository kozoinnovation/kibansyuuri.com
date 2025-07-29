import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* ヒーローセクション */}
      <section className="bg-blue-700/90 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            スマホの基板修理、<br className="sm:hidden" />プロにお任せください。
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            電源が入らない・データを取り出したいなど、<br className="sm:hidden" />
            他店で断られた症状も対応可能です。
          </p>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-start justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-100 transition duration-300"
            >
              今すぐ無料診断を申し込む
            </Link>
            <Link
              href="/repairs"
              className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition duration-300"
            >
              修理事例を見る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
