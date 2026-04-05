import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CollegeTradingCompetitions = () => {
  return (
    <div className="relative min-h-[100dvh] text-slate-300 font-sans selection:bg-[#f3ede4] selection:text-[#3a2a1e]">
      {/* Solid base background */}
      <div className="fixed inset-0 bg-[#1a3016] z-0"></div>

      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
        <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-[#2a4822] rounded-full blur-[100px] animate-blob mix-blend-screen"></div>
        <div className="absolute top-[-20%] right-[-20%] w-[55vw] h-[55vw] bg-[#3e6034] rounded-full blur-[100px] animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute bottom-[-30%] left-[15%] w-[70vw] h-[70vw] bg-[#0e1e0c] rounded-full blur-[100px] animation-delay-4000 mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center gap-4">
          <Link to="/about" className="flex items-center gap-2 text-[#c4d4b8] hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-20">
        <article className="space-y-8">
          {/* Header */}
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#9ebf9e]">
              Experiences
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              College: Trading Competitions
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>February 28, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>15 min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-[#8aac78]">
            <p>
              Trading competitions have been some of the most intense and educational experiences of my college career. I've participated in competitions at UChicago, Northwestern, Georgia Tech, and Prosperity, each offering unique insights into financial markets and decision-making under pressure.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">The UChicago Experience</h2>
            <p>
              Trading competitions are where theory meets practice. In the classroom, you learn about efficient markets and rational actors. In competitions, you see human psychology in action. Every decision carries immediate consequences—you make money or lose it in real-time.
            </p>

            <p>
              What struck me most at UChicago was how different markets behave under different information sets. When everyone has the same data, prices move logically. But as you introduce asymmetric information, the dynamics become complex. Trading becomes less about knowing the "right" answer and more about understanding what others think the right answer is.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Northwestern and Georgia Tech</h2>
            <p>
              Each competition taught me that there's no single "right" trading strategy. What works depends on market conditions, your risk tolerance, and your understanding of market microstructure. At Northwestern, I focused on volatility arbitrage. At Georgia Tech, our team pivoted to directional strategies based on market sentiment.
            </p>

            <p>
              The most valuable lesson came from losses. In competitive trading, you will lose money. How you respond to losses matters more than the losses themselves. Do you become risk-averse? Do you double down? Do you recalibrate your model? Your psychological response determines your future performance.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Prosperity Competition</h2>
            <p>
              Prosperity was different—it wasn't just about profit maximization. The competition introduces dynamic market conditions where players have to adapt constantly. This taught me that real trading isn't static. Markets evolve, and traders must evolve with them.
            </p>

            <p>
              Through these competitions, I've learned that successful trading requires a combination of skills: quantitative analysis to identify opportunities, psychology to manage risk, and adaptability to respond to changing conditions.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Reflections</h2>
            <p>
              Trading competitions won't make me a trader, but they've given me profound insights into how markets work and how people make decisions under uncertainty. These lessons apply far beyond trading—they're useful in software engineering, business decisions, and life.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default CollegeTradingCompetitions;
