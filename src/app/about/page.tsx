'use client';

import Image from 'next/image';
import { Users, X, BookOpen, BrainCircuit, TrendingUp } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CtaBanner from '@/components/CtaBanner';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function Counter({ end, duration = 2000, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number | null = null;
          const startValue = 0;
          
          function animate(currentTime: number) {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;
            
            if (progress < 1) {
              const currentCount = Math.floor(startValue + (end - startValue) * progress);
              setCount(currentCount);
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          }
          
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={countRef} className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900">
      {count}{suffix}
    </span>
  );
}

const stats = [
  {
    number: 400,
    suffix: '+',
    label: '授課學員',
  },
  {
    number: 10,
    suffix: '+',
    label: '服務企業',
  },
  {
    number: 30,
    suffix: '%',
    label: '營業額提升',
  },
];

interface Leader {
  name: string;
  title: string;
  avatar: string;
  fullBio: string;
}

const leaders: Leader[] = [
  {
    name: '黃揚博',
    title: '創辦人兼執行長',
    avatar: '/Image/team/bg/黃揚博.png',
    fullBio: `台灣大學 商業研究所 策略組博士班
政治大學 企業管理研究所 碩士

現任連鎖教育集團 業務轉型顧問
任十餘間中小品牌 品牌銷售顧問
於半年內，協助某ToC企業業務銷售成交率從27%提升至57%

BenQ、Momo、外貿協會等知名機構培訓講師
具備十場培訓與演講經歷

出版：《智慧策略：企業智勝AI時代的策略祕鑰》`,
  },
  {
    name: 'Peter',
    title: '共同創辦人',
    avatar: '/Image/team/bg/Peter.png',
    fullBio: `台灣科技大學 管理學 博士

曾擔任國內大型服務業連鎖體系總經理、執行長近20年
曾管理超過600人以上之事業
實際管理經驗超過20年

台灣科技大學兼任助理教授，主要教授管理學、行銷管理及行銷研究等
超過20年以上之教學經驗
獲台科大教學優良獎

有三次以上實際創業經驗
輔導並投資16企業`,
  },
  {
    name: 'Stanley',
    title: '共同創辦人',
    avatar: '/Image/team/bg/Stanley.png',
    fullBio: `台灣科技大學 管理研究所 碩士/博士
台灣大學 電機系 博士班
台灣大學 網媒所 博士候選人
台灣大學 土木系 博士候選人

曾任職國內中大型公司與國際知名外商公司
實際工作經驗超過20年，橫跨製造業與服務業

提供國內上市公司與知名企業顧問服務超過10年
協助公司擬定營運策略與經營管理相關顧問工作
協助上市集團與新創公司進行數位轉型與商模建立

台灣科技大學兼任副教授，曾授課創業學、電子商務等`,
  },
];

function LeaderModal({ leader, onClose }: { leader: Leader | null; onClose: () => void; }) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!leader) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 z-10 transition-colors">
          <X className="h-6 w-6" />
        </button>
        
        <div className="md:w-1/3 relative flex-shrink-0 bg-slate-100">
           <Image src={leader.avatar} alt={leader.name} fill className="object-cover object-top" />
        </div>

        <div className="md:w-2/3 p-8 md:p-12 flex flex-col overflow-y-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{leader.name}</h3>
          <p className="text-lg font-medium text-gray-600 mb-6">{leader.title}</p>
          <div className="text-gray-700 whitespace-pre-line leading-relaxed text-base">
            {leader.fullBio}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


const whyChooseUsItems = [
  {
    title: '啟動AI革新的行動派夥伴',
    description: '我們與渴望突破現狀、追求成長的企業合作，重新定義 AI 時代的可能性。從客戶挖掘到提案應對，打造真正以數據與智能驅動的業績成長模式，而非紙上談兵的工具教學。',
  },
  {
    title: '整合策略、技術與現場經驗的實踐引擎',
    description: '我們的團隊橫跨產業顧問、頂尖大學教授、總經理，從學術、企業經營與創業者視角，提供AI 工具與流程設計，為企業量身打造可落地、可擴張的智能銷售解決方案。',
  },
  {
    title: '專注於「結果」的系統性成效實現',
    description: '我們的價值不在於傳授一套知識，而是協助企業用 AI 真正解決問題：精準找客、提升提案勝率、強化客戶對話應變、加速成交。我們衡量自身成功的標準，來自每一位客戶轉化成果的具體數據與實證回報。',
  },
];


export default function AboutPage() {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
          alt="Our Team in a meeting"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">引領變革，共創價值</h1>
          <p className="text-lg md:text-xl text-gray-200">我們不僅是顧問，更是與您並肩作戰的夥伴，致力於將您的願景化為現實。</p>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-lg text-gray-700 leading-relaxed space-y-6">
          <p>當今的銷售現場變化快速，顧客資訊更透明、決策鏈條更複雜，傳統話術與經驗法則已無法支撐穩定的成交結果。企業需要一種新的方式，讓團隊在高壓、高速、高複雜度的銷售環境中仍能穩定產出成果。</p>
          <p>走在變革前沿的企業，正在渴望：新人可以更快站穩、不再漫無章法；資深業務能持續進化、說服力更強；主管則期待讓團隊的經驗與產出可被觀察、複製與優化。</p>
          <p>我們所做的，是協助他們將AI導入至實際銷售工作中，從理解顧客、設計對話、產出提案、處理異議、完成成交，到會後追蹤，每個環節都有可用、有效、可教的AI應用策略。</p>
          <p className="font-semibold text-gray-900">我們服務的，從不只是對AI感到新奇的人，而是對成效有要求、對未來有企圖的銷售實踐者。我們以此為使命，陪伴這些真正要「做出成績」的人，打造屬於他們的AI銷售工作模式。</p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[200px] md:min-h-[250px]">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                以智慧驅動成長，<br />與實踐者共創未來。&rarr;
              </h2>
            </div>
            <div className="hidden md:block md:w-1/2">
              <div className="relative w-full h-full flex items-center justify-end">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-blue-900 via-pink-900 to-red-900 opacity-30 blur-2xl"></div>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tl from-blue-700 via-purple-700 to-pink-700 opacity-40 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers Section */}
      <section className="pt-20 md:pt-28 pb-10 md:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="mb-2">
                  <Counter end={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-xl text-gray-600 mt-4">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Our Leadership</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader) => (
              <div key={leader.name} className="cursor-pointer group text-center" onClick={() => setSelectedLeader(leader)}>
                <div className="relative mx-auto aspect-square w-full bg-slate-100 p-8 transition-shadow duration-300 ease-in-out group-hover:shadow-[0_0_25px_8px_rgba(59,130,246,0.25)]">
                  <Image
                      src={leader.avatar} 
                      alt={leader.name}
                      fill
                      className="object-contain object-center"
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{leader.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{leader.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <h2 className="bg-white px-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  為何選擇我們？
                </h2>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="space-y-12">
            {whyChooseUsItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedLeader && <LeaderModal leader={selectedLeader} onClose={() => setSelectedLeader(null)} />}
      </AnimatePresence>
      
      <CtaBanner />
    </div>
  );
} 