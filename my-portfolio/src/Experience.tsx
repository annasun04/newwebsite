import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Layers, Palette, Sparkles } from 'lucide-react';
import citadel from './assets/citadel_event_photo.jpg';
import wacm from './assets/wacm_madhacks_2025.jpg';
import uchicago from './assets/uchicago_team_photo.jpg';
import cardinal from './assets/cardinal.jpg';

const experience = [
  ['Summer Engineering Analyst', 'Goldman Sachs · Structured Products · Jun 2026 – Present', 'Automated Process...'],
  ['Software Engineer Co-op', 'IBM · Mobile Badge · Feb 2026 – Jun 2026', 'Diagnosed and resolved provisioning/PACS database sync defects in an MVP digital badge microservice across multi-region datacenters for 2,500+ active users scaling to 300,000+ IBM employees globally.'],
  ['Software Engineer Intern', 'IBM · May 2025 – Aug 2025', 'Built an AI agent and full-stack RAG system powering multilingual code generation and authentication workflows, cutting developer turnaround time by 82% and supporting 500+ monthly queries.'],
  ['Undergraduate Teaching Assistant', 'Computer Science · Sep 2024 – Present', 'Teach and mentor 100+ students in Data Structures and Java, helping them understand algorithmic problem-solving and core CS fundamentals.'],
  ['Undergraduate Researcher', 'Theory · Jan 2025 – May 2025', 'Worked with Professor Sandeep Silwal on density estimation algorithms using multiplicative weights, studying regret minimization and PAC learning theory.'],
  ['Lab Coordinator', 'Undergraduate Projects Lab · Jan 2024 – Present', 'Lead technical mentorship for student projects, advise on architecture and tech stacks, and organized MadHacks, one of the largest hackathons in the Midwest.'],
  ['Academy of Math and Programming Fellow', 'Jane Street · Jun 2023 – Aug 2023', 'Selected from 1,500+ applicants to study combinatorics, number theory, and Python. Placed 10th in Jane Street’s trading competition using ETF and bond strategies.'],
  ['Barista', 'Starbucks · Jun 2023 – Aug 2023', 'Learned all drink combinations (was not a coffee drinker previously).'],
  ['Tennis Attendant', 'RTC · Jun 2023 – Aug 2023', 'Managed facilities and coordinated scheduling.'],
  ['Petsitter', 'Rover · Jun 2023 – Aug 2023', 'Coordinated client communication, scheduling, and pet care.'],
];

const events = [
  ['MadHacks', 'Nov 2025', 'Hackathon Organizer'],
  ['ICPC North Central Regionals', 'Nov 2025', 'Competitive Programmer'],
  ['Grace Hopper Celebration', 'Oct 2025', ''],
  ['UChicago Trading Competition', 'Apr 2025', 'Algorithmic Trading and Portfolio Optimization'],
  ['Prosperity III', 'Apr 2025', 'US Top 100 Algorithmic'],
  ['Georgia Tech Trading Competition', 'Feb 2025', 'Manual and Algorithmic Trading'],
  ['MadHacks', 'Nov 2024', 'Hackathon Organizer'],
  ['ICPC North Central Regionals', 'Nov 2024', 'Competitive Programmer'],
  ['SWE National Conference', 'Oct 2024', 'Society of Women Engineers'],
  ['Northwestern Trading Competition', 'Oct 2024', 'Algorithmic Trading'],
  ['SWE Regional Conference', 'Sep 2024', 'Society of Women Engineers'],
  ['Wall Street Direct', 'Jun 2024 – Aug 2024', 'Wall Street Bound Program'],
  ['FOCUS Chicago Trek', 'Apr 2024', 'CFA Chicago Trek'],
  ['Fast Track to Finance', 'Feb 2024', 'Forte Foundation Conference'],
  ['MadHacks', 'Nov 2023', 'Hackathon Participant'],
];

const projects = [
  ['IPO Momentum Trading System', 'Markets', 'Automated IPO momentum trading system using moving-average crossovers, RSI, and statistical volatility models. Includes risk-managed execution, options-based probability models, and a Markowitz-style portfolio optimizer built with Julia + JuMP.'],
  ['RAG System', 'AI', 'AI assistant powered by a full-stack RAG pipeline using Granite, LLaMA, and Mistral models. Provides instant multilingual code samples and authentication flows, reducing developer onboarding time by 82% for enterprise teams.'],
  ['Cloud Data Pipeline', 'Data', 'End-to-end ETL pipeline on GCP ingesting 2,000+ school records with geospatial joins. Automated with Dataform, BigQuery spatial functions, containerized services, and scalable orchestration across VMs and GCS.'],
  ['Bit by Bit', 'Systems', 'High-performance, multi-threaded data processing engine inspired by Apache Spark. Implements DAG scheduling, parallel execution, custom operators, and a Unix shell supporting pipes, process management, and command parsing.'],
  ['Flappy Bird', 'ML', 'Evolutionary neural network agent trained via genetic algorithms to autonomously play Flappy Bird. Uses population-based mutation, fitness evaluation, and iterative selection for improving play over generations.'],
];

type TerminalEntry = { path: string; command: string; output: string[] };
type TerminalNode =
  | { kind: 'directory'; children: Record<string, TerminalNode> }
  | { kind: 'file'; content: string[] };

const terminalFolderName = (...parts: string[]) => parts
  .join('-')
  .replace(/&/g, 'and')
  .replace(/[^a-zA-Z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const terminalRoot: TerminalNode = {
  kind: 'directory',
  children: {
    'selected-work': {
      kind: 'directory',
      children: Object.fromEntries(projects.map(([title, category, description]) => [
        `${terminalFolderName(title, category.toLowerCase())}.txt`,
        { kind: 'file', content: [`${title} — ${category}`, description] } satisfies TerminalNode,
      ])),
    },
    experience: {
      kind: 'directory',
      children: Object.fromEntries(experience.map(([role, place, description]) => [
        `${terminalFolderName(role, place.split(' · ')[0])}.txt`,
        { kind: 'file', content: [place, description] } satisfies TerminalNode,
      ])),
    },
    events: {
      kind: 'directory',
      children: Object.fromEntries(events.map(([name, date, detail]) => [
        `${terminalFolderName(name, date.replace(/[^0-9–-]/g, ''))}.txt`,
        { kind: 'file', content: [date, detail || 'Attended'] } satisfies TerminalNode,
      ])),
    },
    skills: {
      kind: 'directory',
      children: {
        'Languages.txt': { kind: 'file', content: ['Python, Java, C++, SQL, C, JavaScript, R'] },
        'Tools-and-Frameworks.txt': { kind: 'file', content: ['React, Docker, Kubernetes, Node.js, GitHub, Bash, React Native, REST APIs'] },
        'Systems.txt': { kind: 'file', content: ['Spark, Kafka, Hadoop, Cassandra'] },
        'Interests.txt': { kind: 'file', content: ['Bouldering, Tennis, Pickleball, Swimming, Ballet'] },
      },
    },
  },
};

const terminalNodeAt = (path: string[]) => path.reduce<TerminalNode | undefined>((node, segment) => {
  if (!node || node.kind !== 'directory') return undefined;
  return node.children[segment];
}, terminalRoot);

const terminalDirectoryContents = (directory: Extract<TerminalNode, { kind: 'directory' }>) =>
  Object.entries(directory.children).flatMap(([fileName, node]) => node.kind === 'file'
    ? [`--- ${fileName} ---`, ...node.content, '']
    : [`--- ${fileName}/ ---`, ...terminalDirectoryContents(node), '']);

const ExperienceTerminal = () => {
  const [command, setCommand] = useState('');
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [path, setPath] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayPath = (segments = path) => `~/${segments.join('/')}`;

  const runCommand = (rawCommand: string) => {
    const normalized = rawCommand.trim().toLowerCase();
    if (!normalized) return;
    const [name, ...argumentsList] = normalized.split(/\s+/);
    const currentNode = terminalNodeAt(path);
    let output: string[];

    if (name === 'ls' && argumentsList.length === 0) {
      output = currentNode?.kind === 'directory'
        ? [Object.entries(currentNode.children).map(([childName, child]) => `${childName}${child.kind === 'directory' ? '/' : ''}`).join('   ')]
        : ['ls: current path is not a directory'];
    } else if (name === 'cd') {
      const requested = argumentsList.join('-').replace(/\/$/, '');
      if (!requested || requested === '~' || requested === '/') {
        setPath([]);
        output = [];
      } else if (requested === '..') {
        setPath((current) => current.slice(0, -1));
        output = [];
      } else if (currentNode?.kind === 'directory') {
        const match = Object.keys(currentNode.children).find((child) => child.toLowerCase() === requested);
        if (match && currentNode.children[match].kind === 'directory') {
          setPath((current) => [...current, match]);
          output = [];
        } else {
          output = [`cd: ${requested}: no such directory`];
        }
      } else {
        output = [`cd: ${requested}: no such directory`];
      }
    } else if (name === 'cat') {
      const requested = argumentsList.join('-').replace(/^\.\//, '').replace(/\/$/, '');
      const match = currentNode?.kind === 'directory' && requested !== '.'
        ? Object.keys(currentNode.children).find((child) => child.toLowerCase() === requested)
        : undefined;
      const target = requested === '.' ? currentNode : match && currentNode?.kind === 'directory' ? currentNode.children[match] : undefined;
      output = !requested
        ? ['usage: cat <file|directory>']
        : target?.kind === 'file'
          ? target.content
          : target?.kind === 'directory'
            ? terminalDirectoryContents(target)
            : [`cat: ${requested}: no such file`];
    } else {
      output = [`command not found: ${normalized}`, 'available commands: ls, cd, cat'];
    }

    setEntries((current) => [...current, { path: displayPath(), command: rawCommand.trim(), output }]);
    setCommand('');
  };

  return (
    <main className="experience-terminal" onClick={() => inputRef.current?.focus()}>
      <div className="experience-terminal__window">
        <div className="experience-terminal__heading">
          <span>~/</span>
          <span>interactive directory</span>
        </div>
        <div className="experience-terminal__body" aria-live="polite">
          <p className="experience-terminal__muted">type ls, cd &lt;directory&gt;, or cat &lt;file|directory&gt;</p>
          {entries.map((entry, entryIndex) => (
            <div className="experience-terminal__entry" key={`${entry.command}-${entryIndex}`}>
              <p><span>anna@portfolio:{entry.path}$</span> {entry.command}</p>
              {entry.output.map((line, lineIndex) => <p key={`${line}-${lineIndex}`}>{line}</p>)}
            </div>
          ))}
          <form
            className="experience-terminal__prompt"
            onSubmit={(event) => { event.preventDefault(); runCommand(command); }}
          >
            <label htmlFor="experience-command">anna@portfolio:{displayPath()}$</label>
            <input
              ref={inputRef}
              id="experience-command"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              aria-label="Experience terminal command"
              autoFocus
            />
          </form>
        </div>
      </div>
    </main>
  );
};

const Experience = () => {
  const [view, setView] = useState<'terminal' | 'page'>('terminal');

  return (
  <div className="experience-minimal relative min-h-screen overflow-hidden bg-black text-[#c7c7c7] selection:bg-white selection:text-black">

    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-normal tracking-tight text-white transition-opacity hover:opacity-60">Anna Sun</Link>
        <div className="flex items-center gap-8 text-sm font-normal">
          <a href="/#work" className="text-neutral-400 transition-colors hover:text-white">Work</a>
          <a href="/#contact" className="text-neutral-400 transition-colors hover:text-white">Contact</a>
          <Link to="/experience" className="text-white">Experience</Link>
          <Link to="/blog" className="text-neutral-400 transition-colors hover:text-white">Blog</Link>
        </div>
      </div>
    </nav>

    <button
      className="experience-view-toggle"
      type="button"
      onClick={() => setView((current) => current === 'terminal' ? 'page' : 'terminal')}
    >
      {view === 'terminal' ? 'page view' : 'terminal view'}
    </button>

    {view === 'terminal' ? <ExperienceTerminal /> : (
    <main className="relative z-10 mx-auto max-w-6xl px-6 pb-32 pt-36">
      <header className="mb-16">
        <h1 className="text-4xl font-normal tracking-tight text-white md:text-6xl">Experience</h1>
      </header>

      <section className="mb-24 max-w-4xl">
        <h2 className="mb-6 text-xs font-normal uppercase tracking-[0.12em] text-neutral-500">Selected Work</h2>
        <div>
          {projects.map(([title, category, description]) => (
            <article key={title} className="experience-project py-4">
              <div className="mb-1 flex items-baseline justify-between gap-6"><h3 className="text-sm font-normal text-white">{title}</h3><span className="text-xs text-neutral-600">{category}</span></div>
              <p className="max-w-3xl text-xs leading-5 text-neutral-400">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-32 max-w-4xl">
        <h2 className="mb-8 text-3xl font-bold text-white">Work</h2>
        <ul className="ml-1 space-y-8 border-l border-white/10 pl-8">
          {experience.map(([role, place, description]) => (
            <li key={`${role}-${place}`} className="relative">
              <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-2 border-[#dce8d8] bg-[#a0bc98] shadow-[0_0_10px_#dce8d8]" />
              <p className="font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.45)]">{role}</p>
              <p className="mb-2 text-sm text-white">{place}</p>
              <p className="mb-5 max-w-3xl text-sm leading-6 text-white/85">{description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-8 text-3xl font-bold text-white">Events</h2>
            <ul className="ml-1 space-y-8 border-l border-white/10 pl-8">
              {events.map(([name, date, detail]) => (
                <li key={`${name}-${date}`} className="relative">
                  <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-2 border-[#f6c14a] bg-[#8aac78] shadow-[0_0_10px_#e8a020]" />
                  <p className="font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.45)]">{name}</p>
                  <p className="mb-2 text-sm text-white">{date}</p>
                  {detail && <p className="mb-5 text-sm text-white/85">{detail}</p>}
                </li>
              ))}
            </ul>
          </div>

          <div className="sticky top-24 hidden flex-col gap-6 md:flex">
            {[
              [citadel, 'Coding event', 'rotate-1'],
              [wacm, 'Team collaboration', '-rotate-1'],
              [uchicago, 'Trading competition', 'rotate-2'],
              [cardinal, 'Hackathon', '-rotate-2'],
            ].map(([src, alt, rotation]) => (
              <div key={src} className={`group relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 transition-all duration-500 hover:rotate-0 hover:border-white/20 hover:shadow-2xl ${rotation}`}>
                <div className="absolute inset-0 z-10 bg-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <img src={src} alt={alt} className="h-full w-full object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-32 border-t border-white/10 pt-12">
        <h2 className="mb-8 text-3xl font-bold text-white">Skills</h2>
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Languages', items: 'Python (Pandas, NumPy, PyTorch), Java, C++, SQL, C, JavaScript, R', icon: <Code2 className="text-[#9880b4]" /> },
            { label: 'Tools & Frameworks', items: 'React, Docker, Kubernetes, Node.js, GitHub, Bash, React Native, REST APIs', icon: <Layers className="text-[#d4874c]" /> },
            { label: 'Systems', items: 'Spark, Kafka, Hadoop, Cassandra', icon: <Palette className="text-[#d88878]" /> },
            { label: 'Interests', items: 'Bouldering, Tennis, Pickleball, Swimming, Ballet', icon: <Sparkles className="text-[#708898]" /> },
          ].map((skill) => (
            <div key={skill.label} className="space-y-2">
              <div className="flex items-center gap-2">{skill.icon}<span className="font-bold text-white">{skill.label}</span></div>
              <p className="font-mono text-sm leading-6 text-slate-400">{skill.items}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
    )}
  </div>
  );
};

export default Experience;
