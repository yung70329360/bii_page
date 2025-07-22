import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle,
  Download,
  ArrowLeft,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
} from 'lucide-react';

const bookHighlights = [
  '揭示AI時代下的商業模式變革',
  '提供企業導入AI的實戰策略藍圖',
  '分析數據驅動決策的關鍵要素',
  '分享各產業成功轉型的實務案例',
  '探索人機協作的未來工作模式',
];

export default function WisdomStrategyPage() {
  return (
    <div className="bg-gray-50">
      <main className="bg-white">
        {/* Hero Section */}
        <section className="pt-12 md:pt-16 pb-16">
          <div className="max-w-5xl mx-auto px-8 sm:px-10 lg:px-12">
            <div className="mb-8">
              <Link
                href="/ebooks"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                返回電子書
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Column: Text content */}
              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                  智慧策略
                </h1>
                <p className="text-base text-gray-500">
                  企業智勝AI時代的策略祕鑰
                </p>
                <p className="text-sm text-gray-500">
                  作者：羅凱揚、鍾皓軒、黃揚博
                </p>
                <div className="pt-4">
                  <a
                    href="#" // 請替換成您的購買連結
                    className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    立即購買
                  </a>
                </div>
              </div>

              {/* Right Column: Book Image */}
              <div className="flex justify-center">
                <Image
                  src="/book/book_type1.png"
                  alt="《智慧策略》書籍封面"
                  width={450}
                  height={675}
                  className="rounded-lg w-auto max-w-sm md:max-w-md"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Book Details Section */}
        <section id="details" className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-8 sm:px-10 lg:px-12">
            <div>
              {/* Book Info & Highlights */}
              <div className="text-left">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  解鎖企業增長的AI驅動力
                </h2>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  本書深入探討企業如何在人工智慧的浪潮中，重新定義營運模式與競爭優勢。從基礎觀念到高階應用，提供一套完整、可執行的策略框架，協助領導者與團隊抓住轉型契機，實現可持續的業務增長。
                </p>
                <ul className="mt-8 space-y-4">
                  {bookHighlights.map((highlight, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="flex-shrink-0 h-6 w-6 text-blue-600 mr-3" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <a
                    href="/File/智慧策略/智慧策略-電子書.pdf"
                    download="智慧策略-電子書.pdf"
                    className="inline-flex items-center justify-center gap-x-2 w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Download className="w-5 h-5" />
                    立即獲取電子書
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 