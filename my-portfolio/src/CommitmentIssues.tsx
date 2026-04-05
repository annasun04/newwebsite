import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommitmentIssues = () => {
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
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#f4a460]">
              Stocks and Markets
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Commitment Issues
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>March 10, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>12 min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-[#8aac78]">
            <p>
              The learning curve behind holding stocks for the long term is steeper than most people realize. It's not just about picking the right companies—it's about managing emotions, understanding risk, and having conviction in your thesis.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Psychology of Commitment</h2>
            <p>
              As someone relatively new to investing, I've noticed that the hardest part isn't making the initial investment decision. It's holding through market volatility. When you buy a stock, you're entering into a commitment, and commitment requires discipline that most people don't have.
            </p>

            <p>
              I watch the market fluctuate daily. A 5% drop sends many investors into panic mode. But here's the thing: if you're investing in a company you genuinely believe in, the short-term noise is just that—noise.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Risk vs. Reward Dynamics</h2>
            <p>
              The risk in holding long-term is opportunity cost. While you're committed to one stock, another might be skyrocketing. But the reward is often greater. The companies that have generated the most wealth are those where investors stayed committed through multiple market cycles.
            </p>

            <p>
              I've been tracking several market trends, and the pattern is consistent: diversified portfolios with long holding periods beat market-timing strategies almost every time. The winners aren't those who make the most trades—they're those who stay the course.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Current Market Perspectives</h2>
            <p>
              Currently, I'm seeing interesting opportunities in tech stocks that have been oversold, along with some emerging opportunities in sustainable energy and AI infrastructure. But I'm not chasing these aggressively. Instead, I'm building positions incrementally and planning to hold.
            </p>

            <p>
              The commitment issues I initially had aren't about commitment to stocks—they're about commitment to a philosophy. Once I adopted a long-term mindset, holding became easier.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default CommitmentIssues;
