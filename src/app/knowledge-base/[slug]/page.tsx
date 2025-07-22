import CtaBanner from '@/components/CtaBanner';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import client from '@/lib/contentful';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

type ArticleFields = {
    title: string;
    slug: string;
    category: string;
    publishDate: string;
    description: string;
    featuredImage: any;
    content: any;
    author?: string;
    source?: string;
    featured?: boolean;
}

export async function generateStaticParams() {
  const res = await client.getEntries({ content_type: 'article' });
  return res.items.map((item) => ({
    slug: (item.fields as ArticleFields).slug,
  }));
}

async function getArticle(slug: string) {
  const res = await client.getEntries({
    content_type: 'article',
    'fields.slug': slug,
    limit: 1,
  });
  return res.items[0];
}


const renderOptions: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { url, fileName } = node.data.target.fields.file;
        return <Image src={`https:${url}`} alt={fileName} width={1200} height={675} className="my-10 rounded-lg" />;
      },
      [BLOCKS.PARAGRAPH]: (node, children) => <p className="leading-relaxed mb-6">{children}</p>,
    },
};


export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return <div className="text-center py-40">Article not found.</div>;
  }

  const { title, publishDate, category, featuredImage, content, description, author, source } = article.fields as ArticleFields;

  const heroImageUrl = featuredImage ? `https:${featuredImage.fields.file.url}` : '/placeholder-hero.jpg';

  return (
    <div className="bg-white">
      
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center text-white">
        <Image
            src={heroImageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <div className="mb-4">
                <Link href={`/knowledge-base/category/${category}`} className="text-sm font-semibold bg-white/10 backdrop-blur-sm text-white py-1 px-3 rounded-full uppercase tracking-wider hover:bg-white/20 transition-colors">
                {category}
                </Link>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                {title}
            </h1>
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-200">
                {author && (
                <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{author}</span>
                </div>
                )}
                <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(publishDate)}</span>
                </div>
            </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          {documentToReactComponents(content, renderOptions)}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          {source && (
            <div className="text-sm text-gray-500">
              <span className="font-semibold">資料來源：</span>{source}
            </div>
          )}
           {/* You can add Author Bio card or related articles here in the future */}
        </footer>
      </div>
      <CtaBanner />
    </div>
  );
} 