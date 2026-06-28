import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CollegeTradingCompetitions = () => {
  return (
    <div className="relative min-h-[100dvh] text-slate-300 font-sans selection:bg-[#f3ede4] selection:text-[#3a2a1e]">
      {/* Solid base background */}
      <div className="fixed inset-0 bg-[#f0f4ee] z-0"></div>

      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
        <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-[#FFFFFF] rounded-full blur-[100px] animate-blob mix-blend-screen"></div>
        <div className="absolute top-[-20%] right-[-20%] w-[55vw] h-[55vw] bg-[#FFFFFF] rounded-full blur-[100px] animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute bottom-[-30%] left-[15%] w-[70vw] h-[70vw] bg-[#FFFFFF] rounded-full blur-[100px] animation-delay-4000 mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center gap-4">
          <Link to="/blog" className="flex items-center gap-2 text-[#c4d4b8] hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 w-full pt-32 pb-24">
        <article className="mx-auto w-[min(100%,72rem)] px-4 sm:px-6 lg:px-10 xl:px-12 space-y-8">
          {/* Header */}
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#9ebf9e]">
              Experiences
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a3016] leading-tight">
              College: Trading Competitions
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Month Day, Year</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>15 min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full max-w-none space-y-10 text-[#3e6034] text-lg md:text-xl leading-[1.9]">
            <p>
              Trading competitions have been some of the most intense and educational experiences of my college career. I've participated in competitions at UChicago, Northwestern, Georgia Tech, and Prosperity, each offering unique insights into financial markets and decision-making under pressure.
            </p>

            <h2 className="text-2xl font-bold text-[#2a4822] mt-8 mb-4">Northwestern (NUTC)</h2>
            <p>
              Trading competitions are where theory meets practice. In the classroom, you learn about efficient markets and rational actors. In competitions, you see human psychology in action. Every decision carries immediate consequences—you make money or lose it in real-time.
            </p>
            <h2 className="text-2xl font-bold text-[#2a4822] mt-8 mb-4">Georgia Tech (</h2>
            <p>
              Trading competitions are where theory meets practice. In the classroom, you learn about efficient markets and rational actors. In competitions, you see human psychology in action. Every decision carries immediate consequences—you make money or lose it in real-time.
            </p>
            <h2 className="text-2xl font-bold text-[#2a4822] mt-8 mb-4">UChicago</h2>
            <p>
              Trading competitions are where theory meets practice. In the classroom, you learn about efficient markets and rational actors. In competitions, you see human psychology in action. Every decision carries immediate consequences—you make money or lose it in real-time.
            </p>
            <h2 className="text-2xl font-bold text-[#2a4822] mt-8 mb-4">Prosperity III</h2>
            <p>
              Trading competitions are where theory meets practice. In the classroom, you learn about efficient markets and rational actors. In competitions, you see human psychology in action. Every decision carries immediate consequences—you make money or lose it in real-time.
            </p>


           
            

            
          </div>
        </article>
      </main>
    </div>
  );
};

export default CollegeTradingCompetitions;
