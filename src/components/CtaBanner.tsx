import Image from 'next/image';

export default function CtaBanner() {
    return (
        <section className="relative bg-blue-700 overflow-hidden">
            {/* Background shapes */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-96 h-96 bg-blue-600/30 rounded-full -top-20 -left-40"></div>
                <div className="absolute w-[40rem] h-[40rem] bg-blue-600/30 rounded-full -bottom-56 -right-48"></div>
                <div className="absolute w-[30rem] h-[30rem] bg-blue-500/30 -top-48 right-10 transform rotate-45"></div>
                <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full bottom-0 left-10"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-white">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                        立即開始與我們<br />
                        合作擴展業務
                    </h2>
                    <a href="/contact" className="mt-8 inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
                        聯絡我們
                    </a>
                    </div>
                    <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-2xl">
                    <Image
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                        alt="Team working together"
                        fill
                        className="object-cover"
                    />
                    </div>
                </div>
            </div>
        </section>
    );
} 