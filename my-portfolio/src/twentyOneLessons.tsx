import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const TwentyOneLessons = () => {
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
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#d99999]">
              Opinion
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              21 Lessons by 21
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>April 5, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>9 min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-[#8aac78]">
            <p>
             Here are a list of 21 lessons that I've emphasized as I get older.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. You are who you surround yourself with</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Respect yourself</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. It's okay to be lonely</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Advocate for yourself</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Empathy is valuable</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. You can create impact now</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Take risk and don't fear failure</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Learn from the mistakes of others</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. You yourself and your values</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. You and your experiences are not unique</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">11. It's okay not to get along with others</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">12. Being confrontational is good</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">13. Work hard, play hard is better than just work hard</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">14. Humility is underrated</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">15. Healing is a process that doesn't end</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">16. Learn to be comfortable in the uncomfortable</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">17. We are all human</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">18. Do you really know yourself</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">19. Things are not that serious</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">20. You are not perfect and that's okay</h2>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">21. Perspective defines everything</h2>
            <p>
              1. you are who you surround yourself with
              2. what respecting yourself looks like and means (boundaries)
              3. okay with being lonely
              4. advocate for yourself
              5. practice empathy. its a good investment
              6. what change and influence looks like (dont wait until youre successful for impact, it compunds over time)
              7. you miss 100% of the shots you dont take
              8. learn from others mistakes
              9. dont fear failure
              10. know yourself and your values
              11. what it means to have different values than others and how to go about it (i.e. distance)
              12. confrontation. being direct but depends
              13. find waht you enjoy (allows work hard play hrad without burining out)
              14. humility and confidence
              15. getting over things or reflecting is a continous process, it doesnt end
              16. take good risks to be uncomfortable
              17. everyone is going through something. everyone is human, makes mistakes, and "othering" people just makes us more distanced
              18. take time to learn about yourself (style, personality, etc.) 
              19. things are not that serious. no matter what obstacle, mindset shift (not being delusional but being optimistic)
              20. try new things
              21. Im not perfect and thats okay. that means i just have more to grow

            </p>

            
          </div>
        </article>
      </main>
    </div>
  );
};

export default TwentyOneLessons;
