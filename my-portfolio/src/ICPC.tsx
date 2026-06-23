import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ICPC = () => {
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
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#d4a5d4]">
              Competitive Programming
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              ICPC
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Month Day, Year</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>10 min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-[#8aac78]">
            <p>
              The International Collegiate Programming Contest (ICPC) has been one of the most challenging and rewarding experiences of my college career. It's more than just a competition—it's a masterclass in problem-solving, teamwork, and mental resilience.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Preparation Journey</h2>
            <p>
              Preparing for ICPC is intense. Our team would spend hours working through past problems, building up our competitive programming toolkit. We had to master data structures, algorithm optimization, and mathematical problem-solving all while working under time pressure.
            </p>

            <p>
              What surprised me most wasn't the difficulty of the problems themselves, but the mental game. When you're in a 5-hour contest and you've been stuck on a problem for 90 minutes, you need to decide: do you keep pushing, or do you pivot? Those decisions, made correctly or incorrectly, determine outcomes.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Team Dynamics</h2>
            <p>
              ICPC is a team sport. You have three people and one computer, and you need to work seamlessly together. Communication becomes critical. One person codes while two others are thinking. You have to trust your teammates' problem-solving approaches and validate each other's ideas quickly.
            </p>

            <p>
              I learned more about collaboration through ICPC than through most of my engineering projects. You're not just building something—you're solving novel problems on the fly with people who think differently than you do.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Key Lessons</h2>
            <p>
              The biggest lesson from ICPC is that consistency beats brilliance. The teams that consistently performed well weren't necessarily the smartest—they were the ones who practiced regularly, knew their tools inside out, and didn't panic under pressure.
            </p>

            <p>
              I also learned the importance of debugging efficiently. In a contest, time is your scarcest resource. Being able to quickly identify why code isn't working separates good teams from great teams.
            </p>

            <p>
              ICPC has shaped how I approach engineering problems today. I think more algorithmically, I value efficiency, and I'm more comfortable tackling unfamiliar problems head-on.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default ICPC;
