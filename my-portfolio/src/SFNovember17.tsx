import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const paragraphs = [
  `All right, let's get started. Today, I was kind of getting out of what I'm coining the term for right now, called SF fatigue.`,
  `I think there are so many events in SF, all very tech-oriented and social-oriented, because a lot of people, both new to the city and established here, are always trying to get to know each other before they have an established group, just like in any other city. In SF in particular, I think it's really easy to get fatigued by these events when you're not actually getting any value from them. Depending on the type of group, I guess the term in SF is really “curating the room,” or curating who you're around. I think it can get really, really tiring.`,
  `Especially as a woman—and this is something I personally don't talk about that much, even though it's really, really prominent here—if you're not careful about the rooms you're in, I think it's so much easier to become disillusioned and tired of the people. Sometimes, part of the room carries a lot of desperation in multiple forms. You have the dating aspect, where people go to these events, seek out women in the room, and sometimes maybe even prey on them or become very creepy. Maybe they don't intend to come across that way, but some of them may be intentionally entering these rooms, seeing women who are often new to the city, and finding a way to exploit that.`,
  `Yeah, it can get really tiring. The people doing this range from my age, in their early 20s, all the way to their mid-40s. A lot of these guys try to connect through LinkedIn and then use that connection as a way to turn it into something more—something I never asked for and that was never clearly communicated. That is simply not appropriate, and I think it has made me a little tired during my first two or three weeks in SF. It makes it really hard to enjoy events.`,
  `Another part of the desperation is that you have a lot of people coming here in search of funding and investors, and it feels like a very tiring hamster wheel to be around. I'm definitely not in that space since I'm not currently looking for investments. Sometimes, it can be inspiring to see that kind of grind. Other times, it can be very interesting to watch how people go about it, sometimes in unconventional ways, as they try to get what they came for.`,
  `From the outside looking in, what you hear about people in SF or California is that they're only here to be around people they think are successful, and that they're really picky about who they spend time with. Obviously, that's looked down upon from the outside. But after coming here, you realize how stressful it can feel. If you're meeting so many people, it becomes really tiring to spend time around those who have very conflicting viewpoints or who want something from you that isn't reciprocated.`,
  `I think that's true whether you're in SF or in any other city, but it's way more prominent here because the simple thing is, many people who are desperate come here.`,
  `I went to an event today sponsored by Genspark and the Bridges Social. It was the first event in the past three weeks that I went into without intending to stay the whole time beforehand. I planned to leave halfway through, and I ended up not leaving, which was really, really surprising to me because it was the only one where I thought, “Okay, I'm not going to stay for that long,” prior to going to the event.`,
  `It was also the first event where time flew by, where I actually felt like I got value from it, and where I wasn't tired after leaving or tired of being around people. It gave me a really strong indication of the type of people I like to surround myself with. Because I was able to let go of the idea that people were approaching me with the wrong or weird intentions, I could finally relax and get what I needed from the experience: learning how to really utilize AI agents in both my work life and my personal life.`,
  `I want to note some of the overarching themes that stood out to me personally:`,
  `1. Treating your agents as people. I think that makes the idea a lot less scary. Instead of thinking, “Oh, I'm going to have all these agents do all these things for me, and it's really hard to tell whether a task is worth giving to an agent,” you can see them as people and yourself as a manager—even outside of a work context. It becomes a way to learn how to lead without having actual people at stake. It makes the idea of using all these agents feel less abstract, technical, and dependent on perfect optimization. Obviously, token economics and costs are involved, but up to a point, I think there's a huge return in practicing leadership skills and learning to see things as a manager would, without needing years of industry experience to reach that level. I thought that was a really cool theme.`,
  `2. Utilizing agents day by day. Every day, apply them to something practical that you're actually doing. There's so much information out there, especially surrounding these models and agents, that doesn't really apply to me. I go to some of these conferences and learn, “Oh, this chip is better than this other type of chip.” But for me, as an individual who isn't currently working on something at that scale, all that information ends up going unused. Sure, I know the fact, but at the end of the day, it has no practical application for me.`,
  `3. Using your agent as a challenger. You're not only asking an agent questions; in a way, it's also training you. Use your agent as your own coach or trainer—something that challenges you in everything—because you don't want to lose your ability to think for yourself. For problem-solving in particular, you can shift the relationship so that the agent pushes back, questions your reasoning, and makes you defend your choices. That way, you're still critically thinking through every decision you're making instead of handing that thinking over completely.`,
  `I think practicing, even with a little bit of friction, is important. It's an inevitable path, but I just haven't recently put much thought into actually incorporating it. Finding the right tools and experimenting with different models is important, too. Obviously, I'm currently using some tools, but sometimes they introduce more friction into the things I need to do, which makes them harder to adopt and makes me less inclined to keep using them.`,
  `I think what I forget is that there's actually a plethora of tools out there. I should constantly be experimenting, keeping the ones that are genuinely useful for my use cases, and maybe retiring the ones that are harder to use or don't really apply to me.`,
  `I've been thinking about how I assumed it was a me thing—that I was getting really fatigued by so many of these interactions. But now that I know what the right interactions look like for me, I realize they get rid of that fatigue and feel genuine. I think that makes all the difference.`,
  `Going forward, I'm going to be really mindful about how I'm spending my time. Usually, you think about that in terms of work or output, but that's not necessarily the whole picture. I think a big part of it is social. That's what I've taken away from today, and even though I'm not walking away with 100 different lessons, the ones I did take away feel very important to me right now.`,
];

const SFNovember17 = () => (
  <div className="blog-minimal relative min-h-[100dvh] bg-black text-slate-300 font-sans selection:bg-white selection:text-black">
    <main className="relative z-10 w-full pb-24 pt-32">
      <article className="mx-auto w-[min(100%,72rem)] space-y-8 px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="space-y-6">
          <div className="inline-block border border-white/10 px-3 py-1 text-xs text-neutral-400">Experiences</div>
          <h1 className="text-4xl leading-tight text-white md:text-5xl">sf 11-17-2026</h1>
          <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
            <div className="flex items-center gap-2"><Calendar size={16} /><span>11-17-2026</span></div>
            <div className="flex items-center gap-2"><Clock size={16} /><span>7 min read</span></div>
          </div>
          <p className="text-xs tracking-wide text-neutral-600">Written with Wispr Flow</p>
        </div>

        <div className="w-full max-w-none space-y-8 text-base leading-[1.85] text-neutral-300 md:text-lg">
          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </article>
    </main>
  </div>
);

export default SFNovember17;
