import RepairExamplesClient from '@/components/RepairExamplesClient';

export default function RepairsPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        修理事例一覧
      </h1>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <RepairExamplesClient />
      </div>
    </main>
  );
}