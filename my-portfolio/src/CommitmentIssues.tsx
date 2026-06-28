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
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#f4a460]">
              Stocks and Markets
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Commitment Issues
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>April 15, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>12 min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full max-w-none space-y-10 text-[#8aac78] text-lg md:text-xl leading-[1.9]">
            <p>
              Trading as an average person in the stock market can sound so simple yet can also be simultanteously complex. 
              Here I give my thoughts and observations (not necessarily advice) on the market primarily tickers on the NASDAQ and NYSE. Also a 
              brief dive into my change in patterns when going about buying and selling.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">My Limited Experience</h2>
          
           
            <p>
              So investing for around less than a year.
              Started with a couple of dollars
              moved to maybe 100 max
              then recently picked it up since raelized sitting in checking and
              prolly good that I start early to understanding the markets if i am
              to interact with it for the rest of my career
              for me, as a bingger and not a lot of capital to lose, I can take mroe risks (more in the riss seciton)

            </p>

           

            
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Risk vs. Reward</h2>
            <p>
             A key component is understanding how much risk vs reward you want to take on. It seems people is different
             situations but genreally older you are, take less risk since you have retirement and younger you have less to lose
             why I choose my risk level (pretty high?)
             now I am tryong to hold things for longer term (thus the title "commitment issues") since I tend to be risk adverse and panick sell or buy 
             which just seems to only lead to breaking even So looking bigger picture and holding things for a week to a couple of months is what I
             am testing.
            </p>

            <p>
              practice of hedging, and generally go on bigger companeis that wont go bankrupt overnight or else there will be bigger orblems than just losing my money
              also depends on how invested attention wise you want to be in the market. most people choose s& p and that is usually the return benchmark
            </p>


            <h2 className="text-2xl font-bold text-white mt-8 mb-4">What do you listen to?</h2>
            <p>
             One thing about the stock market that is sort of unique is the most simpel strategy can have the same returns as a complex ones for better or for worse.
              I think when you first start, everything seems relatively simple (buy low sell high) but as you keep on going, 
              there are a billion indicators from news, events, industries to focus on 
              so it can get convoluted. Plus if you have a strategy that works, chances are it wont work 100% of the time
              or has downsides like it doesnt last or takes a long time.
            </p>

           
  

             <h2 className="text-2xl font-bold text-white mt-8 mb-4">Current Outlook</h2>
            <p>
              AI Boom


            </p>
             <p>
           
              World Events
           

            </p>
             <p>
             
              Consumerism

            </p>

            

          </div>
        </article>
      </main>
    </div>
  );
};

export default CommitmentIssues;
