import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI SPIN 銷售法｜顧問式銷售內訓課程',
    description: '本課程專為頂尖銷售團隊設計，將全球公認最有效的顧問式銷售法，與當代最強大的 AI 工具深度整合，打造一套可複製、可量化的高效銷售作業系統。',
};

export default function AiSpinTrainingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        {children}
    </>
  )
} 