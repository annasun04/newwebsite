import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const LessonsAsACollegeStudent = () => {
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
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#d99999]">
              Opinion
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Lessons as a College Student
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>February 15, 2024</span>
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
              College is often sold as a path to better job prospects and higher earnings. While there's truth to that, I've learned that the real value of college lies elsewhere. My time at UW-Madison has taught me lessons that no lecture could capture.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Importance of Choosing Your Environment</h2>
            <p>
              You are the average of the five people you spend the most time with. This isn't just motivational speak—I've observed it concretely. When I surrounded myself with ambitious, intellectually curious people, I became more ambitious and curious. When I was in an environment where people were content coasting, I felt that pressure too.
            </p>

            <p>
              College gives you the unique opportunity to choose your environment. Pick your roommates, join clubs, select your study groups. This choice might matter more than which school you attend.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Classes Are Not Education</h2>
            <p>
              This took me a while to learn. Some of my most valuable knowledge came from conversations in the dorm, projects I did for competitions, and books I read out of curiosity—not from lecture halls. Classes provide structure and credentials, but they're not the primary source of education.
            </p>

            <p>
              The classes I found most valuable were those where the instructor created space for discussion and critical thinking. The classes I regret are those where I mindlessly transcribed information into my notebook without engaging with the material.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Specialization vs. Breadth</h2>
            <p>
              I spent my first year trying to master every class. I wanted to be good at everything. But I eventually realized that's not how learning works. You get better by going deep in areas you care about. You need both breadth (to discover what you care about) and depth (to become competent in something meaningful).
            </p>

            <p>
              My advice: take diverse classes early, but once you find something compelling, go deep. That depth is what differentiates you in the job market and in your own intellectual development.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Hidden Curriculum</h2>
            <p>
              The most valuable lessons in college aren't in the syllabus. They're in navigating ambiguity, dealing with failure, learning to work with difficult people, and figuring out what you actually care about. These are messy, non-linear processes, and they can't be taught directly. They can only be experienced.
            </p>

            <p>
              If you're in college, make the most of this time not just for credentials, but for building yourself into someone capable of navigating a complex world. That's the real education.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default LessonsAsACollegeStudent;
