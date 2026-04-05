import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CollegeCourseMap = () => {
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
              College Course Map
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
              When I arrived at UW-Madison, I had no idea what I was doing. I had interests in computer science, mathematics, and economics, but I didn't have a clear picture of how to navigate the computer science curriculum while exploring adjacent fields. This post is my attempt to create a course map for future students (and for my own reference).
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Foundation Courses</h2>
            <p>
              Start with the fundamentals: Intro to Computer Science, Data Structures, and Discrete Math. These courses teach you how to think algorithmically and are prerequisites for everything else. Don't rush through these—getting them right sets you up for success.
            </p>

            <p>
              I also recommend taking Calculus and Linear Algebra early. These appear in more places than you'd expect: machine learning, graphics, optimization, and more. Understanding them conceptually, not just procedurally, pays dividends.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Core Computer Science Track</h2>
            <p>
              After foundations, your choices expand. The core CS courses that feel worth taking: Algorithms, Computer Organization, Operating Systems, and Databases. These are the backbone of CS and appear in interviews and real-world work.
            </p>

            <p>
              Each of these courses teaches you something different about how systems work. Algorithms teaches you optimization. Computer Organization teaches you hardware thinking. Operating Systems teaches you concurrency and resource management. Databases teaches you about data and queries. Together, they form a holistic understanding of computing.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Specialization Options</h2>
            <p>
              Once you have the core down, choose your specialization based on interest: AI/ML, Systems, Graphics, Security, or others. I went heavy into AI/ML and systems, which has served me well in my projects and internships.
            </p>

            <p>
              My recommendation: pick one or two specializations and go deep. Don't try to take every elective. Depth matters more than breadth for expertise.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Adjacent Fields</h2>
            <p>
              Take courses outside of CS. Economics gave me perspective on markets. Philosophy taught me to think critically. Statistics is invaluable for almost everything. These adjacent courses make you a more well-rounded engineer and often lead to interesting intersections.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Practical Angle</h2>
            <p>
              Don't just take classes. Do projects. Participate in competitions. Intern. These experiences complement coursework and are often what employers actually care about. Use classes as a foundation, but build your actual expertise outside of them.
            </p>

            <p>
              Plan your courses, but stay flexible. As you learn, your interests will evolve, and your course map should too.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default CollegeCourseMap;
