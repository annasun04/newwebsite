import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortfolioGame from './PortfolioGame';

const SyncedTrendVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const syncAudio = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const expectedAudioTime = video.currentTime;
    if (Math.abs(audio.currentTime - expectedAudioTime) > 0.12) {
      audio.currentTime = Math.min(expectedAudioTime, Math.max(0, audio.duration - 0.05));
    }
  };

  const prepareAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.preservesPitch = true;
    audio.playbackRate = 1;
    syncAudio();
  };

  useEffect(() => () => audioRef.current?.pause(), []);

  return (
    <figure className="overflow-hidden rounded-3xl border border-[#f4a460]/20 bg-black/30 shadow-2xl shadow-black/30">
      <video
        ref={videoRef}
        className="aspect-video w-full bg-black object-contain"
        src="/intro/intro.mp4"
        controls
        muted
        playsInline
        preload="metadata"
        poster="/intro/hero-after-intro.png"
        onLoadedMetadata={syncAudio}
        onPlay={() => {
          syncAudio();
          void audioRef.current?.play();
        }}
        onPause={() => audioRef.current?.pause()}
        onSeeking={syncAudio}
        onTimeUpdate={syncAudio}
        onEnded={() => {
          const audio = audioRef.current;
          if (audio) {
            audio.pause();
            audio.currentTime = 0;
          }
        }}
      />
      <audio ref={audioRef} src="/intro/intro.mp3" preload="metadata" onLoadedMetadata={prepareAudio} />
      <figcaption className="space-y-1 border-t border-white/10 px-5 py-4">
        <strong className="block text-sm font-medium text-[#f4a460]">Later version: the TikTok audio trend</strong>
        <span className="block text-sm text-slate-400">The newer audio treatment is synchronized to the original Higgsfield video. Press play on the video to hear the paired version.</span>
      </figcaption>
    </figure>
  );
};

const HiggsfieldAI = () => (
  <div className="blog-minimal relative min-h-[100dvh] overflow-hidden bg-[#101b0d] text-slate-300 font-sans selection:bg-[#c4d4b8] selection:text-[#1e1610]">
    <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(70,105,55,0.45),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(25,50,20,0.8),transparent_48%),#101b0d]" />

    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/40 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center px-6">
        <Link to="/blog" className="flex items-center gap-2 text-[#c4d4b8] transition-colors hover:text-white">
          <ArrowLeft size={20} /><span className="text-sm font-medium">Back to Blog</span>
        </Link>
      </div>
    </nav>

    <main className="relative z-10 w-full pb-64 pt-32">
      <article className="mx-auto w-[min(100%,72rem)] space-y-12 px-4 sm:px-6 lg:px-10 xl:px-12">
        <header className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f4a460]/20 bg-[#d4874c]/15 px-3 py-1 text-xs font-medium text-[#f4a460]">
            <Sparkles size={13} /> AI / Creative Process
          </div>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">Higgsfield AI</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-[#9ebf9e] md:text-xl">
            I used Higgsfield AI to explore a cinematic opening for this portfolio. The experiment became a lesson in visual storytelling, iteration, and knowing when an idea belongs in the work rather than in front of it.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Calendar size={16} /> August 24, 2026</span>
            <span className="flex items-center gap-2"><Clock size={16} /> 6 min read</span>
          </div>
        </header>

        <figure className="overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-2xl shadow-black/30">
          <video className="aspect-video w-full bg-black object-contain" src="/intro/intro.mp4" controls playsInline preload="metadata" poster="/intro/hero-after-intro.png" />
          <figcaption className="border-t border-white/10 px-5 py-4 text-sm text-slate-400">
            The original portfolio opening, now preserved as part of this case study instead of gating the main site.
          </figcaption>
        </figure>

        <div className="max-w-3xl space-y-10 text-lg leading-[1.85] text-[#9ebf9e] md:text-xl">
          <section className="space-y-4"><h2 className="text-2xl font-bold text-white">The idea</h2><p>I wanted the site to begin like a short film: atmospheric, personal, and more memorable than a standard loading screen. Higgsfield made it possible to prototype that mood quickly and turn a visual direction into motion.</p></section>
          <section className="space-y-4"><h2 className="text-2xl font-bold text-white">What worked</h2><p>Generative video was strongest as a creative sketchbook. It helped me test composition, pacing, lighting, and transitions before committing to the surrounding interface. The final frame also gave me a visual anchor for the rest of the experience.</p></section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">The real cost of generating a video</h2>
            <p>I first paid for the original plan, only to discover that it did not include access to Seedance 2.5—the model I needed to generate video from my prompts. I then paid for Plus Pro. Although the plan is presented as $59 per month, what that meant in practice for me was paying $59 for 1,200 generation credits.</p>
            <p>Those credits disappear quickly. A single generation can cost around 100 credits, even when the result contains major issues, incorrect actions, or footage that cannot be used. The cheapest option I found was around 30 credits for only four or five seconds of video on a less capable model. That makes experimentation expensive: one imperfect prompt can consume a meaningful portion of the plan before producing anything usable.</p>
            <p>The experience taught me that prompting needs to be unusually deliberate from the first attempt. There is little room for casual trial and error when every revision has a direct cost.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Prompting like a director and a programmer</h2>
            <p>The most effective prompts felt like a mixture of film direction and coding. I had to think like a director when describing framing, camera movement, timing, lighting, blocking, and the sequence of actions. At the same time, I had to think like a programmer by turning images and references into clearly defined variables, then assigning attributes and behaviors to each one.</p>
            <p>Instead of asking generally for a scene, I learned to identify which reference controlled the character, environment, composition, or style; describe how those references related to one another; and use precise filmmaking language to define what the camera and subjects should do. The more structured the prompt was, the less room the model had to invent the wrong action—and the less likely I was to spend another hundred credits correcting it.</p>
          </section>
          <section className="space-y-4"><h2 className="text-2xl font-bold text-white">What I learned</h2><p>A cinematic idea can be successful on its own and still add friction in the wrong place. Requiring every visitor to watch or skip an intro delayed the portfolio’s actual purpose. Moving it here lets the experiment breathe without standing between a visitor and my work.</p><p>I also learned that AI output still needs human direction: selecting takes, shaping sound, matching the ending to the page, and deciding where the result belongs were the parts that made the piece feel intentional.</p></section>
          <section className="space-y-4"><h2 className="text-2xl font-bold text-white">A second life through a TikTok trend</h2><p>Later, I revisited the same sequence with a new audio track inspired by a TikTok trend. Keeping the visual edit while changing the sound showed me how much music can reshape the pacing and emotional meaning of identical footage.</p></section>
          <SyncedTrendVideo />
          <section className="space-y-4"><h2 className="text-2xl font-bold text-white">An interactive extension</h2><p>The game-like character was another experiment in making a portfolio feel playful. It now lives with this post as part of the same exploration. Use the arrow keys or A/D to move, and Space, W, or the up arrow to jump.</p></section>
        </div>
      </article>
    </main>

    <PortfolioGame />
  </div>
);

export default HiggsfieldAI;
