import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CollegeCourseMap = () => {
  return (
    <div className="relative min-h-[100dvh] text-slate-300 font-sans selection:bg-[#f3ede4] selection:text-[#3a2a1e]">
      {/* Solid base background */}
      <div className="fixed inset-0 bg-[#f0f4ee] z-0"></div>

      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
        <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-[#FFFFFF] rounded-full blur-[100px] animate-blob mix-blend-screen"></div>
        <div className="absolute top-[-20%] right-[-20%] w-[55vw] h-[55vw] bg-[#FFFFFF] rounded-full blur-[100px] animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute bottom-[-30%] left-[15%] w-[70vw] h-[70vw] bg-[#FFFFFF] rounded-full blur-[100px] animation-delay-4000 mix-blend-screen"></div>
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
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#80a478]">
              Opinion
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#000000] leading-tight">
              CS College Course Map
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-[#3e6034]">
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
          <div className="prose prose-invert max-w-none space-y-6 text-[#0e1e0c]">
            <p>
              I came into college with no prior experience to coding so when it came to mapping out my schedule, advice from the people around me really helped give me the option to graduate in 2 years (even though I ultimately decided to not do this). I've decided to return the favor but keep in mind that it is unique to my own experiences and are subjective.
            </p>
            <h2 className="text-2xl font-bold text-[#1a3016] mt-8 mb-4">My Roadmap</h2>
            <table className="w-full border-collapse my-6">
              <thead>
                <tr className="border-b border-[#0a2e20]">
                  <th className="text-left py-3 px-4 text-[#164430] font-semibold">Year, Semester</th>
                  <th className="text-left py-3 px-4 text-[#164430] font-semibold">Courses</th>
                  
                </tr>
              </thead>
              <tbody>


                <tr className="border-b hover:bg-white/[0.03] transition-colors">
                  <td className="py-3 px-4 text-[#275a42]">Year 1, Fall</td>
                  <td className="py-3 px-4 text-[#275a42]">Chinese: ASIALANG101</td>
                  <td className="py-3 px-4 text-[#275a42]">International Business: INTLBUS200</td>
                  <td className="py-3 px-4 text-[#275a42]">Programming I: CS200</td>
                  <td className="py-3 px-4 text-[#275a42]">Critical Thinking and Expression: ILS200</td>
                  <td className="py-3 px-4 text-[#275a42]">Calculus 2: MATH222</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="py-3 px-4 text-[#275a42]">Year 1, Spring</td>
                   <td className="py-3 px-4 text-[#275a42]">Computer Engineering: CS252</td>
                  <td className="py-3 px-4 text-[#275a42]">Programming II: CS300</td>
                  <td className="py-3 px-4 text-[#275a42]">Linear Algebra: MATH340</td>
                  <td className="py-3 px-4 text-[#275a42]">Biological Anthropology: ANTHRO105</td>
                  <td className="py-3 px-4 text-[#275a42]">Afro Asian Improv: DANCE319</td>
                  <td className="py-3 px-4 text-[#275a42]">Insects and Human Culture: ENTOM201</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="py-3 px-4 text-[#275a42]">Year 1, Summer</td>
                   <td className="py-3 px-4 text-[#275a42]">Discrete Mathematics: CS240</td>
                  <td className="py-3 px-4 text-[#275a42]">Artificial Intelligence: CS540</td>
                  <td className="py-3 px-4 text-[#275a42]">Programming III: CS400</td>
                </tr>
                

                <tr className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="py-3 px-4 text-[#275a42]">Year 2, Fall</td>
                   <td className="py-3 px-4 text-[#275a42]">Machine Organization and Programming: CS354</td>
                  <td className="py-3 px-4 text-[#275a42]">Algorithms: CS577</td>
                  <td className="py-3 px-4 text-[#275a42]">Theater and Dramatic Literature: ENGL120</td>
                  <td className="py-3 px-4 text-[#275a42]">Combinatorics: CS475</td>
                </tr>

                

                <tr className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="py-3 px-4 text-[#275a42]">Year 2, Spring</td>
                   <td className="py-3 px-4 text-[#275a42]">Theory of Computing: CS520</td>
                  <td className="py-3 px-4 text-[#275a42]">Optimization: CS524</td>
                  <td className="py-3 px-4 text-[#275a42]">Big Data Systems: CS544</td>
                  <td className="py-3 px-4 text-[#275a42]">Operating Systems: CS537</td>
                </tr>

                <tr className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="py-3 px-4 text-[#275a42]">Year 3, Fall</td>
                   <td className="py-3 px-4 text-[#275a42]">R for Statistics I: STAT303</td>
                  <td className="py-3 px-4 text-[#275a42]">Databases: CS564</td>
                  <td className="py-3 px-4 text-[#275a42]">Calculus 3: MATH234</td>
                </tr>


                


              </tbody>
            </table>

            <p>
              Important context was that I came in with 43 credits, almost all gen ed credits, so I was able to (for better or for worse) compact major related classes early.
            </p>

            <h2 className="text-2xl font-bold text-[#1a3016] mt-8 mb-4">Foundation Courses</h2>
            <p>
              The foundational courses I would say give a good introduction and emphasize learning concepts (rather than comparing concepts more which happens later on). I will say initially, computer science may feel boring and uninituitive (which it is). After being an undergraduate teaching assistant for CS200 and CS300 later, I noticed in introductory classes, a lot of people tend to doubt themselves over simple setbacks and take it as a sign to stop. Whether it be making self deprecating comments or showing verbal or physical frustruation, it's important to trust the process. I would 
              say I didn't particularly enjoy cs until the later classes. Also something to note, that because people in college are from vastly different backgrounds where a person with 5 years of programming experiences and a community and resources to support it and a person who is just starting and doesn't come from an academic background or community pre college are in the same class 
            </p>

            <p>
              I also recommend taking Calculus and Linear Algebra early. These appear in more places than you'd expect: machine learning, graphics, optimization, and more. Understanding them conceptually, not just procedurally, pays dividends.
            </p>

            <h2 className="text-2xl font-bold text-[#1a3016] mt-8 mb-4">Core Computer Science Track</h2>
            <p>
              After foundations, your choices expand. The core CS courses that feel worth taking: Algorithms, Computer Organization, Operating Systems, and Databases. These are the backbone of CS and appear in interviews and real-world work.
            </p>

            <p>
              Each of these courses teaches you something different about how systems work. Algorithms teaches you optimization. Computer Organization teaches you hardware thinking. Operating Systems teaches you concurrency and resource management. Databases teaches you about data and queries. Together, they form a holistic understanding of computing.
            </p>

            <h2 className="text-2xl font-bold text-[#1a3016] mt-8 mb-4">Specialization Options</h2>
            <p>
              Once you have the core down, choose your specialization based on interest: AI/ML, Systems, Graphics, Security, or others. I went heavy into AI/ML and systems, which has served me well in my projects and internships.
            </p>

            <p>
              My recommendation: pick one or two specializations and go deep. Don't try to take every elective. Depth matters more than breadth for expertise.
            </p>

            <h2 className="text-2xl font-bold text-[#1a3016] mt-8 mb-4">Adjacent Fields</h2>
            <p>
              Take courses outside of CS. Economics gave me perspective on markets. Philosophy taught me to think critically. Statistics is invaluable for almost everything. These adjacent courses make you a more well-rounded engineer and often lead to interesting intersections.
            </p>

            <h2 className="text-2xl font-bold text-[#1a3016] mt-8 mb-4">The Practical Angle</h2>
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
