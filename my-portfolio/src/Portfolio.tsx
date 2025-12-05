import React, { useState, useEffect, useRef } from 'react'; 
import { Github, Linkedin, Mail, ArrowUpRight, Code2, Palette, Layers, ChevronDown, Sparkles } from 'lucide-react';
import citadel from "./assets/citadel_event_photo.jpg";
import wacm from "./assets/wacm_madhacks_2025.jpg";
import uchicago from "./assets/uchicago_team_photo.jpg";
import cardinal from "./assets/cardinal.jpg";
const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Global mouse tracker for spotlight and parallax
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // CHANGED: min-h-[100dvh] handles mobile browsers better than min-h-screen
    <div className="relative min-h-[100dvh] text-slate-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Solid base background */}
      <div className="fixed inset-0 bg-[#0a0a0a] z-0"></div>

      {/* Dynamic Animated Background - CHANGED: 'fixed' ensures it covers the full viewport always */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
        {/* Blobs */}
        <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-purple-900/20 rounded-full blur-[100px] animate-blob mix-blend-screen"></div>
        <div className="absolute top-[-20%] right-[-20%] w-[55vw] h-[55vw] bg-indigo-900/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute bottom-[-30%] left-[15%] w-[70vw] h-[70vw] bg-blue-900/20 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen"></div>

        {/* Mouse spotlight */}
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(118, 129, 227, 0.05), transparent 90%)`
          }}
        />

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Glass Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-black/40 backdrop-blur-xl border-b border-white/5 py-4' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 group-hover:to-purple-400 transition-all duration-300">
              
            </span>
          </div>
          <div className="flex gap-8 text-sm font-medium">
            {['About', 'Work', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())} 
                
                
                className="relative text-slate-400 hover:text-white transition-colors py-1 bg-transparent"

              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="min-h-screen flex flex-col justify-center px-6 relative max-w-7xl mx-auto pt-20 z-10">
        <div className="space-y-8 max-w-4xl">
          
          
          <div className="space-y-2">
            {/* CHANGED: leading-tight instead of leading-none prevents vertical clipping */}
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight leading-tight">
              {/*<span className="block mb-2">Software</span>*/}
              {/* CHANGED: Added Typewriter component here */}
              {/* CHANGED: Added pb-4 (padding bottom) to give the 'g' descender space */}
              <span className="block pb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 animate-gradient-x">
                <Typewriter text="Anna Sun" delay={400} />
              </span>
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-sm font-medium animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Software Engineer
          </div>
          
          <p className="max-w-2xl text-slate-400 text-lg md:text-xl leading-relaxed">
            I build end-to-end technical solutions spanning <span className="text-indigo-300">AI agents, RAG systems, big data infrastructure, and systems programming</span>, 
            with a strong interest in applying these tools to <span className="text-indigo-300">finance</span> and <span className="text-indigo-300">large-scale decision-making</span>.
          </p>
          
          <div className="pt-8 flex flex-wrap gap-4">
            <button onClick={() => scrollToSection('work')} className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              View Projects
              <ArrowUpRight size={20} />
            </button>
            <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all duration-300">
              Contact Me
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
          <ChevronDown size={24} />
        </div>
      </header>

      {/* Main Content - Added overflow-x-hidden here to prevent horizontal scrollbars from tilt cards */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 space-y-40 pb-40 overflow-x-hidden **text-center**">
        {/* Tech Stack / Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm **max-w-5xl mx-auto**">
            {[
              {
                label: 'Languages',
                items: 'Python (Pandas, NumPy, PyTorch), Java, C++, SQL, C, JavaScript, R',
                icon: <Code2 className="text-indigo-400" />,
              },
              {
                label: 'Tools & Frameworks',
                items: 'React, Docker, Kubernetes, Node.js, GitHub, Bash, React Native, REST APIs',
                icon: <Layers className="text-cyan-400" />,
              },
              {
                label: 'Systems',
                items: 'Spark, Kafka, Hadoop, Cassandra',
                icon: <Palette className="text-pink-400" />,
              },
              {
                label: 'Other Skills',
                items: 'Team Collaboration, Public Speaking, Project Management, Leadership',
                icon: <Sparkles className="text-yellow-400" />,
              },
            ].map((skill, i) => (
              <div key={i} className="space-y-2 text-center **md:text-left**">
                <div className="flex items-center **justify-center md:justify-start** gap-2 mb-2">
                  {skill.icon}
                  <span className="font-bold text-white">{skill.label}</span>
                </div>
                <p className="text-sm text-slate-400 font-mono">{skill.items}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Work Section */}
        <section id="work">
          <ScrollReveal>
            <div className="flex items-end **justify-center** mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Selected Work</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 **max-w-6xl mx-auto**">
            <TiltCard 
              title="IPO Momentum Trading System"
              category="Markets"
              description="Automated IPO momentum trading system using moving-average crossovers, RSI, and statistical volatility models. Includes risk-managed execution, options-based probability models, and a Markowitz-style portfolio optimizer built with Julia + JuMP."
              color="from-pink-500/20 to-rose-500/20"
              tags={['Python', 'Julia', 'JuMP']}
            />
             <TiltCard 
              title="RAG System"
              category="AI"
              description="AI assistant powered by a full-stack RAG pipeline using Granite, LLaMA, and Mistral models. Provides instant multilingual code samples and authentication flows, reducing developer onboarding time by 82% for enterprise teams."
              color="from-indigo-500/20 to-blue-500/20"
              tags={['RAG', 'LLMs', 'React', 'AI Agents']}
            />
            <TiltCard 
              title="Cloud Data Pipeline"
              category="Data"
              description="End-to-end ETL pipeline on GCP ingesting 2,000+ school records with geospatial joins. Automated with Dataform, BigQuery spatial functions, containerized services, and scalable orchestration across VMs and GCS."
              color="from-indigo-500/20 to-blue-500/20"
              tags={['Docker', 'SQL', 'GCP', 'BigQuery', 'ETL']}
            />
            <TiltCard 
              title="Bit by Bit"
              category="Systems"
              description="High-performance, multi-threaded data processing engine inspired by Apache Spark. Implements DAG scheduling, parallel execution, custom operators, and a Unix shell (wsh) supporting pipes, process management, and command parsing."
              color="from-cyan-500/20 to-teal-500/20"
              tags={['C', 'Concurrency', 'DAG', 'Systems Programming']}
            />
            
             <TiltCard 
              title="Flappy Bird"
              category="ML"
              description="Evolutionary neural network agent trained via genetic algorithms to autonomously play Flappy Bird. Uses population-based mutation, fitness evaluation, and iterative selection for improving play over generations."
              color="from-indigo-500/20 to-blue-500/20"
              tags={['Python', 'Neural Networks', 'NumPy', 'Genetic Algorithms']}
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-20">
                  <Code2 size={120} />
                </div>
                <p className="text-indigo-400 font-mono mb-6">Who am I?</p>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Design-driven Engineer based in Madison.
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  I’m a Computer Science and Statistics student at UW–Madison focused on building and maintaining intelligent systems. My journey started in web development which evolved into an interest in systems and machine learning.
                  
                </p>
                <p className="text-slate-400 leading-relaxed">
                  When I'm not coding, you can find me working out, drinking a caramel latte, playing sports or exploring new projects.
                </p>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="space-y-8">
              <div>
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  Experience
                </h4>
                <ul className="space-y-8 border-l border-white/10 ml-1 pl-8">
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-indigo-500"></span>
                    <p className="text-white font-bold">Software Engineer Intern</p>
                    <p className="text-sm text-slate-500 mb-2">IBM • May 2025 - Aug 2025</p>
                    <p className="text-slate-400 text-sm">Built an AI agent and full-stack RAG system powering multilingual code generation and authentication workflows, cutting developer turnaround time by 82% and supporting 500+ monthly queries.</p>
                  </li>

                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600"></span>
                    <p className="text-white font-bold">Undergraduate Teaching Assistant</p>
                    <p className="text-sm text-slate-500 mb-2">CS • Sep 2024 - Present</p>
                    <p className="text-slate-400 text-sm">Teach and mentor 100+ students in Data Structures and Java, helping them understand algorithmic problem-solving and core CS fundamentals.</p>
                  </li>

                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600"></span>
                    <p className="text-white font-bold">Undergraduate Researcher</p>
                    <p className="text-sm text-slate-500 mb-2">Theory • Jan 2025 - May 2025</p>
                    <p className="text-slate-400 text-sm">Worked with Professor Sandeep Silwal on density estimation algorithms using multiplicative weights, studying regret minimization and PAC learning theory.</p>
                  </li>

                   <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600"></span>
                    <p className="text-white font-bold">Lab Coordinator</p>
                    <p className="text-sm text-slate-500 mb-2">Undergraduate Projects Lab • Jan 2024 - Present</p>
                    <p className="text-slate-400 text-sm">Lead technical mentorship for student projects, advise on architecture and tech stacks, and organized MadHacks, one of the largest hackathons in the Midwest.</p>
                  </li>
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600"></span>
                    <p className="text-white font-bold">Academy of Math and Programming Fellow</p>
                    <p className="text-sm text-slate-500 mb-2">Jane Street • Jun 2023 - Aug 2023</p>
                    <p className="text-slate-400 text-sm">Selected from 1,500+ applicants to study combinatorics, number theory, and Python. Placed 10th in Jane Street’s trading competition using ETF and bond strategies.</p>
                  </li>
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600"></span>
                    <p className="text-white font-bold">Barista</p>
                    <p className="text-sm text-slate-500 mb-2">Starbucks • Jun 2023 - Aug 2023</p>
                    <p className="text-slate-400 text-sm">Learned all drink combinations (was not a coffee drinker previously).</p>
                  </li>
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600"></span>
                    <p className="text-white font-bold">Tennis Attendant</p>
                    <p className="text-sm text-slate-500 mb-2">RTC • Jun 2023 - Aug 2023</p>
                    <p className="text-slate-400 text-sm">Managed facilities, coordinated scheduling.</p>
                  </li>
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600"></span>
                    <p className="text-white font-bold">Petsitter</p>
                    <p className="text-sm text-slate-500 mb-2">Rover • Jun 2023 - Aug 2023</p>
                    <p className="text-slate-400 text-sm">Coordinated client communication, scheduling, and pet care.</p>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Events Section */}
        <section id="events" className="**max-w-6xl mx-auto**">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              
              {/* LEFT COLUMN: Timeline */}
              <div className="space-y-8">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  Events & Hackathons
                </h4>
                
                <ul className="space-y-8 border-l border-white/10 ml-1 pl-8">
                  {/* Event Item 1 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-indigo-500 bg-indigo-800"></span>
                    <p className="text-white font-bold">Madhacks</p>
                    <p className="text-sm text-slate-500 mb-2">Nov 2025</p>
                    <p className="text-slate-400 text-sm">Hackathon Organizer</p>
                  </li>

                  {/* Event Item 2 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600 bg-indigo-750"></span>
                    <p className="text-white font-bold">ICPC North Central Regionals</p>
                    <p className="text-sm text-slate-500 mb-2">Nov 2025</p>
                    <p className="text-slate-400 text-sm">Competitive Programmer</p>
                  </li>

                  {/* Event Item 3 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600 bg-indigo-700"></span>
                    <p className="text-white font-bold">Grace Hopper Celebration</p>
                    <p className="text-sm text-slate-500 mb-2">Oct 2025</p>
                    <p className="text-slate-400 text-sm">Attendee</p>
                  </li>

                  {/* Event Item 4 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600 bg-indigo-650"></span>
                    <p className="text-white font-bold">UChicago Trading Competition</p>
                    <p className="text-sm text-slate-500 mb-2">Apr 2025</p>
                    <p className="text-slate-400 text-sm">Algorithmic Trading and Portfolio Optimization</p>
                  </li>
                  {/* Event Item 5 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600 bg-indigo-600"></span>
                    <p className="text-white font-bold">Prosperity</p>
                    <p className="text-sm text-slate-500 mb-2">Apr 2025</p>
                    <p className="text-slate-400 text-sm">IMC</p>
                  </li>

                  {/* Event Item 5 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600 bg-indigo-550"></span>
                    <p className="text-white font-bold">Georgia Tech Trading Competition</p>
                    <p className="text-sm text-slate-500 mb-2">Feb 2025</p>
                    <p className="text-slate-400 text-sm">Manual and Algorithmic Trading</p>
                  </li>
                  {/* Event Item 1 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-indigo-500 bg-indigo-500"></span>
                    <p className="text-white font-bold">Madhacks</p>
                    <p className="text-sm text-slate-500 mb-2">Nov 2024</p>
                    <p className="text-slate-400 text-sm">Hackathon Organizer</p>
                  </li>

                  {/* Event Item 2 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600 bg-indigo-450"></span>
                    <p className="text-white font-bold">ICPC North Central Regionals</p>
                    <p className="text-sm text-slate-500 mb-2">Nov 2024</p>
                    <p className="text-slate-400 text-sm">Competitive Programmer</p>
                  </li>
                  {/* Event Item 7 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600 bg-indigo-400"></span>
                    <p className="text-white font-bold">SWE National Conference</p>
                    <p className="text-sm text-slate-500 mb-2">Oct 2024</p>
                    <p className="text-slate-400 text-sm">Society of Women Engineers</p>
                  </li>

                  {/* Event Item 6 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600 bg-indigo-350"></span>
                    <p className="text-white font-bold">Northwestern Trading Competition</p>
                    <p className="text-sm text-slate-500 mb-2">Oct 2024</p>
                    <p className="text-slate-400 text-sm">Algorithmic Trading</p>
                  </li>
                  {/* Event Item 7 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600 bg-indigo-300"></span>
                    <p className="text-white font-bold">SWE Regional Conference</p>
                    <p className="text-sm text-slate-500 mb-2">Sep 2024</p>
                    <p className="text-slate-400 text-sm">Society of Women Engineers</p>
                  </li>

                  {/* Event Item 7 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600 bg-indigo-250"></span>
                    <p className="text-white font-bold">Wall Street Direct</p>
                    <p className="text-sm text-slate-500 mb-2">Jun 2024 - Aug 2024</p>
                    <p className="text-slate-400 text-sm">Wall Street Bound Program</p>
                  </li>

                  {/* Event Item 7 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600 bg-indigo-200"></span>
                    <p className="text-white font-bold">FOCUS Chicago Trek</p>
                    <p className="text-sm text-slate-500 mb-2">Apr 2024</p>
                    <p className="text-slate-400 text-sm">CFA Chicago Trek</p>
                  </li>

                  {/* Event Item 7 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600 bg-indigo-150"></span>
                    <p className="text-white font-bold">Fast Track to Finance</p>
                    <p className="text-sm text-slate-500 mb-2">Feb 2024</p>
                    <p className="text-slate-400 text-sm">Forte Foundation Conference</p>
                  </li>

                  {/* Event Item 1 */}
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-indigo-100"></span>
                    <p className="text-white font-bold">Madhacks</p>
                    <p className="text-sm text-slate-500 mb-2">Nov 2023</p>
                    <p className="text-slate-400 text-sm">Hackathon Participant</p>
                  </li>


                </ul>
              </div>

              {/* RIGHT COLUMN: Photo Gallery */}
              {/* sticky top-24 makes it scroll with you until the section ends */}
              <div className="hidden md:flex flex-col gap-6 sticky top-24">
                 
                 {/* Photo 1 */}
                 <div className="group relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 hover:border-white/20 transition-all duration-500 rotate-1 hover:rotate-0 hover:shadow-2xl hover:shadow-indigo-500/20">
                    <div className="absolute inset-0 z-10 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                    <img 
                      src = {citadel}
                      alt="Coding Event" 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                    />
                 </div>

                 {/* Photo 2 */}
                 <div className="group relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 hover:border-white/20 transition-all duration-500 -rotate-1 hover:rotate-0 hover:shadow-2xl hover:shadow-cyan-500/20">
                    <div className="absolute inset-0 z-10 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                    <img 
                      src= {wacm}
                      alt="Team Collaboration" 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                    />
                 </div>

                 {/* Photo 3 */}
                 <div className="group relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 hover:border-white/20 transition-all duration-500 rotate-2 hover:rotate-0 hover:shadow-2xl hover:shadow-purple-500/20">
                    <div className="absolute inset-0 z-10 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                    <img 
                      src={uchicago}
                      alt="Conference" 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                    />
                 </div>

                 {/* Photo 4 */}
                 <div className="group relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 hover:border-white/20 transition-all duration-500 -rotate-2 hover:rotate-0 hover:shadow-2xl hover:shadow-pink-500/20">
                    <div className="absolute inset-0 z-10 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                    <img 
                      src={cardinal}
                      alt="Hackathon" 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                    />
                 </div>

                 

              </div>
            </div>
          </ScrollReveal>
        </section>
        {/* Contact CTA */}
        <section id="contact" className="text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Let's build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">extraordinary.</span>
            </h2>
            <div className="flex justify-center gap-6">
              <SocialButton icon={<Mail />} href="mailto:@gmail.com" label="Email" />
              <SocialButton icon={<Github />} href="https://github.com/" label="GitHub" />
              <SocialButton icon={<Linkedin />} href="https://www.linkedin.com/in/" label="LinkedIn" />
            </div>
          </ScrollReveal>
        </section>
      </main>

      <footer className="py-8 text-center text-slate-600 text-sm relative z-10">
        <p>© 2025 Wendy Sun. Crafted with React & Tailwind.</p>
      </footer>

      {/* Custom Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-move 5s ease infinite;
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

// --- Components ---

// Typewriter Component for Dynamic Text
interface TypewriterProps { text: string; speed?: number; delay?: number; }
const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 150, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => text.slice(0, prev.length + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, started]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-indigo-400">|</span>
    </span>
  );
};

interface ScrollRevealProps { children: React.ReactNode; delay?: number; }
const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface TiltCardProps { title: string; category: string; description: string; color: string; tags: string[]; }
const TiltCard: React.FC<TiltCardProps> = ({ title, category, description, color, tags }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: -yPct * 20, y: xPct * 20 });
  };

  const handleMouseLeave = () => { setRotation({ x: 0, y: 0 }); setIsHovered(false); };

  return (
    <div className="perspective-1000">
      <div 
        ref={ref}
        onMouseMove={(e) => { handleMouseMove(e); setIsHovered(true); }}
        onMouseLeave={handleMouseLeave}
        className="relative h-full bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-200 ease-out group overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-white/20"
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})` }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
        <div className="flex justify-between items-start mb-8">
          <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10 transition-colors">
            <Layers className="text-indigo-400" size={24} />
          </div>
          <span className="text-slate-400 font-mono text-sm">{category}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 text-xs text-indigo-400 font-mono">
          {tags.map((tag, i) => <span key={i} className="px-2 py-1 bg-white/5 rounded">{tag}</span>)}
        </div>
      </div>
    </div>
  );
};

interface SocialButtonProps { icon: React.ReactNode; href: string; label: string; }
const SocialButton: React.FC<SocialButtonProps> = ({ icon, href, label }) => (
  <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full hover:bg-white/5 transition-all duration-300">
    {icon} <span>{label}</span>
  </a>
);

export default Portfolio;
