import React from 'react';
import { ArrowLeft, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const Blog = () => {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Learning to Fail Fast',
      excerpt: 'Do you have a fear of failing? So do I. This is how bouldering has taught me to take more calculated risk',
      date: 'March 15, 2024',
      readTime: '8 min read',
      category: 'Rock Climbing'
    },
    {
      id: '2',
      title: 'Commitment Issues',
      excerpt: 'The learning curve behind holding stocks for longer term. The risk, the reward, and trends I currently see in the markets',
      date: 'March 10, 2024',
      readTime: '12 min read',
      category: 'Markets'
    },
    {
      id: '3',
      title: 'The Only One in the Room',
      excerpt: 'My reflections on competitive programming competitions and lessons learned.',
      date: 'March 5, 2024',
      readTime: '10 min read',
      category: 'Competitive Programming'
    },
    {
      id: '4',
      title: 'Trading Competitions',
      excerpt: 'Reflections and analysis on trading competitions [UChicago, Northwestern, Georgia Tech, Prosperity]',
      date: 'February 28, 2024',
      readTime: '15 min read',
      category: 'Experiences'
    },
     {
      id: '5',
      title: '21 Life Lessons at 21',
      excerpt: 'My thoughts on classes at UW-Madison ',
      date: 'February 15, 2024',
      readTime: '9 min read',
      category: 'Opinion'
    },
    {
      id: '7',
      title: 'College Course Map and General Advice',
      excerpt: 'My thoughts on classes at UW-Madison ',
      date: 'February 15, 2024',
      readTime: '9 min read',
      category: 'Opinion'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Rock Climbing': 'bg-[#8aac78]/20 text-[#8aac78]',
      'Markets': 'bg-[#d4874c]/20 text-[#f4a460]',
      'Competitive Programming': 'bg-[#9880b4]/20 text-[#d4a5d4]',
      'Experiences': 'bg-[#7a9e7b]/20 text-[#9ebf9e]',
      'Opinion': 'bg-[#a86868]/20 text-[#d99999]',
      'Data Engineering': 'bg-[#5a8050]/20 text-[#8aac78]',
      'DevOps': 'bg-[#9880b4]/20 text-[#d4a5d4]',
      'AI/ML': 'bg-[#d4874c]/20 text-[#f4a460]',
      'Architecture': 'bg-[#7a9e7b]/20 text-[#9ebf9e]',
      'Security': 'bg-[#a86868]/20 text-[#d99999]'
    };
    return colors[category] || 'bg-white/10 text-white';
  };

  const navigate = useNavigate();

  const handlePostClick = (postId: string) => {
    const routes: Record<string, string> = {
      '1': '/blog/1',
      '2': '/blog/2',
      '3': '/blog/3',
      '4': '/blog/4',
      '5': '/blog/5',
      '7': '/blog/7'
    };
    if (routes[postId]) {
      navigate(routes[postId]);
    }
  };

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
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-[#c4d4b8] hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
          <h1 className="text-2xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">blog</h1>
          <div className="w-24"></div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="space-y-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">my blog.</h1>
            <p className="text-lg text-[#8aac78]">thoughts on experiences, technology, markets and more</p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#c4d4b8]/30 transition-all duration-300 hover:bg-white/[0.08] cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Category Tag */}
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white group-hover:text-[#c4d4b8] transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-[#8aac78] line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-[#c4d4b8] text-sm font-medium pt-2 group-hover:gap-3 transition-all">
                    Read More
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;