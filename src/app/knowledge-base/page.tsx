import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import client from '@/lib/contentful';
// Correcting the import path assuming utils.ts is in lib directory
import { formatDate } from '../../lib/utils';
import CtaBanner from '@/components/CtaBanner';

type ArticleFields = {
    title: string;
    slug: string;
    category: string;
    publishDate: string;
    description: string;
    featuredImage: any;
    author?: string;
    source?: string;
    featured?: boolean;
}

async function getArticles() {
  try {
    const res = await client.getEntries({ content_type: 'article' });
    return res.items;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function KnowledgeBasePage() {
  const articles = await getArticles();

  if (!articles || articles.length === 0) {
    return (
      <div className="bg-white text-gray-800">
        <section className="bg-gray-50 pt-24 md:pt-32 pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              知識庫
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              探索AI、銷售與商業策略的前沿洞見，為您的企業賦能。
            </p>
          </div>
        </section>
        <div className="text-center py-20">
          <p>目前沒有任何文章。</p>
        </div>
      </div>
    );
  }

  // 安全地獲取第一篇文章作為精選文章
  const featuredArticle = articles[0]?.fields as ArticleFields;
  const otherArticles = articles.slice(1);

  // 如果沒有精選文章，顯示錯誤
  if (!featuredArticle) {
    return (
      <div className="bg-white text-gray-800">
        <section className="bg-gray-50 pt-24 md:pt-32 pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              知識庫
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              探索AI、銷售與商業策略的前沿洞見，為您的企業賦能。
            </p>
          </div>
        </section>
        <div className="text-center py-20">
          <p>無法載入文章內容。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-50 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            知識庫
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            探索AI、銷售與商業策略的前沿洞見，為您的企業賦能。
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="搜尋文章..."
              />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Featured Insights Section */}
          <div className="border-b pb-10">
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
              Featured Insights
            </h2>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden group">
              <Image
                src={featuredArticle.featuredImage ? `https:${featuredArticle.featuredImage.fields.file.url}` : '/placeholder-hero.jpg'}
                alt={featuredArticle.title || 'Featured Article'}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 max-w-2xl text-white">
                <h3 className="text-3xl font-bold mb-2">
                  {featuredArticle.title}
                </h3>
                <p className="text-gray-200 mb-4">{featuredArticle.description}</p>
                <Link href={`/knowledge-base/${featuredArticle.slug}`} className="inline-flex items-center gap-2 font-semibold text-white hover:text-blue-300 transition-colors">
                  Read the report <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {otherArticles.map((article) => {
                const fields = article?.fields as ArticleFields;
                if (!fields) return null;
                
                return (
                  <div key={article.sys.id} className="group">
                    <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden mb-4">
                      <Image
                        src={fields.featuredImage ? `https:${fields.featuredImage.fields.file.url}` : '/placeholder-hero.jpg'}
                        alt={fields.title || 'Article Image'}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{fields.category}</p>
                      <Link href={`/knowledge-base/${fields.slug}`}>
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {fields.title} <span className="text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">&rsaquo;</span>
                        </h4>
                      </Link>
                      <p className="text-sm text-gray-600 mt-2">{formatDate(fields.publishDate)} - {fields.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
      <CtaBanner />
    </div>
  );
} 