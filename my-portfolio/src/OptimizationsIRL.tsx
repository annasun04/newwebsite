import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const OptimizationsIRL = () => {
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
      <main className="relative z-10 w-full pt-32 pb-24">
        <article className="mx-auto w-[min(100%,72rem)] px-4 sm:px-6 lg:px-10 xl:px-12 space-y-8">
          {/* Header */}
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#d99999]">
              Opinion
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Optimizations IRL
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>06-28, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>9 min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full max-w-none space-y-10 text-[#8aac78] text-lg md:text-xl leading-[1.9]">
             <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Car First</h2>
            <p>
              <br></br>
              <br></br>
              Sometimes when you are about to cross the sidewalk and theres one or two cars, signal and let them go first.
              Let's say it takes you 10 seconds to cross that road and 1 second for a car to drive to continue on the road.
              If you go first it is 10 seconds for you to cross, 10 seconds the driver waits, and 1 second for the driver to continue on.
              Approximating 21 seconds of time used and 10 seconds of wasted time for the driver.<br></br>
              If you go second, it takes 1 second for the driver to continue, 1 second for you to wait, and 10 seconds for you to cross
              coming to a total of 12 seconds and a waited time for you of 1 second. Almost always it is a better tradeoff for both you and 
              the driver unless you really need to get someone and that tradeoff value doesn't match. Plus it's a nice thing to do and most
              drivers are grateful and it may make their day better.
              <br></br>
              <br></br>
            </p>
             <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Diagonals</h2>
            <p>
              <br></br>
              <br></br>
              If you need to get someone fast or faster than the estimated google maps time, at every point possible,
              try to cross in a diagonal. Based off of the Triangle Inequality Theorem, a+b have to be greater or equal to c
              where a and b are horizontal and vertical sides and c is the diagonal interesting the two. So when you walk in 
              a diagonal, even by a little bit, it is less physical distance to walk and compounded over your entire journey,
              each diagonal will make the difference increase. (I used to to maximize the amount of time i could sleep and minimize the amount of 
              walk time to my classes my first year of college, taking usually 10 minutes for a 15-20 minute route)
              <br></br>
              <br></br>
            </p>
             <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Binary Handout</h2>
            <p>
              <br></br>
              <br></br>
              Whenever someone disperses paper to a relatively large group (say to a class) it almost always
              trickles down semi linearly. Using what we know from binary search and the more extended b-trees
              or trees in general, we can disperse the papers way faster by splitting the stack up and handing it to different
              people. If multiple people do it, it becomes a way faster process and if it is a test, make things more fair
              in terms of starting time. If you are the only person doing it, it still helps by making it (say you split it into two) reach
              the last person faster by almost twice the original amount.
              <br></br>
              <br></br>
            </p>
            

          
            
          </div>
        </article>
      </main>
    </div>
  );
};

export default OptimizationsIRL;
