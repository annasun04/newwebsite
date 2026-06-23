import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearningToFailFast = () => {
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
          <Link to="/blog" className="flex items-center gap-2 text-[#c4d4b8] hover:text-white transition-colors">
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
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#8aac78]">
              Rock Climbing
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Learning to Fail Fast
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Month Day, Year</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>8 min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-[#8aac78]">
            <p>
              Do you have a fear of failing? So do I. For years, I would avoid situations where I might fail, constantly seeking the path of least resistance. It wasn't until I started bouldering that I began to understand the value of calculated failure.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Beginning</h2>
            <p>
              When I first started bouldering, I was terrified. Every time I looked at a wall, all I could see were the ways I could fall. But what I eventually realized is that falling is the entire point. You don't improve by only climbing routes you can already do. You improve by pushing yourself to the edge of your abilities.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Embracing Failure</h2>
            <p>
              Bouldering taught me that failure isn't a destination—it's a checkpoint. Each time I failed at a route, I gained information. I learned what techniques didn't work, which holds I could trust, and where my limits actually were. This rapid feedback loop became invaluable.
            </p>

            <p>
              The key insight is that bouldering failures are low-stakes. If I can't do a v5, the worst that happens is I go back to the gym tomorrow and try again. There's a safety net—literally (mats) and figuratively (it's just climbing). This environment encouraged me to experiment and take risks.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Beyond Climbing</h2>
            <p>
              I've started applying this mentality to other areas of my life. In engineering, I'm more willing to propose solutions that might not work, knowing we can iterate. In conversations, I'm more willing to voice opinions that might be unpopular, knowing I can learn from the feedback. In career decisions, I'm more willing to take calculated risks.
            </p>

            <p>
              The bouldering gym is teaching me that the fast path to mastery goes through failure. Not reckless failure, but calculated, intentional failure with feedback loops. Currently working towards v7, and I can feel the compounding effect of this philosophy.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default LearningToFailFast;
