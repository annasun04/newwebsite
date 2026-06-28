import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Bouldering = () => {
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
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#8aac78]">
              Rock Climbing
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Bouldering
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>06-28, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>8 min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full max-w-none space-y-10 text-[#8aac78] text-lg md:text-xl leading-[1.9]">
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Background</h2>
            <p>
              So when I moved to Austin to do a spring coop, bouldering was the last activity I thought I would get into. As someone
              who has developed a fear of heights towards the end of highschool (realizing by a valley fair amusement park trip) and who is risk adverse especially
              when it comes to things that could cause injury, I ended up being a regular. 
              <br></br>
              <br></br>
              Safe to say your environment moulds you and some of the people I had met, other interns and full timers, had or started to climb regularly.
              Every tuesday and thursday from 8pm to 11pm (closing time) became the rhythm incorporated into the 5-9 from the 9-5.
              I am grateful to have met the community ended up finding in Austin and through bouldering. So here is some knowledge that I've learned
              from the 16 or so weeks climbing both technical and not.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">V0: the initial climb</h2>
            <p>
              Obviously when you first climb, it'll be terrifying...or least at it should be. We, as humans, probably aren't supposed to feel no fear when trusting
              a mat and free falling a good 15 feet. There are two main hurdles when starting out.
              <br></br>
              <br></br>
              First, is the more obvious fear of height. Getting used to the height takes some time. So despite maybe the first time climbing
              it may not give the exact type of dopamine some other sports may induce and more cortisol and adrenaline than the latter, it's important
              to give it a couple of chances before completely ruling it out as a sport. It also may seem, since usually there are a lot of climbers at different
              levels climbing at the same time, that it is unnatural to feel the amount of fear you may experience, but once you give it a couple of tries, you'll
              start to come out the other end and start to understand maybe it is something that takes getting used to.
              <br></br>
              <br></br>
              The second most "hurdle" and hurdle is in quotes since it isn't really something to get over, more of something to learn, is how to fall. How you fall makes the difference between
              avoiding common injuries and getting them. First you want to land on your feet and immediately roll back. Don't use your hands to brace you as that can result in 
              wrist sprains and alike injuries. You want your legs to be relaxed rather than stiff since that will lead to a lot of force. You'll almost emulate a turtle rolling
              on its back. Best way to visualize it is to search up a couple of videos on how to fall on youtube and try it out from a relatively low distance yourself.
              <br></br>
              <br></br>
              <small>
                Lesson 1: In rock climbing there are two main types - top rope and bouldering. Top rope is what
                many may typically think when referring to rock climbing. The climber has a harness and usually the focus is more on
                height rather than the complexity of the route, or at least the route setting less emphasized. Bouldering is
                the climbing without a rope with a stronger focus the route rather than height. Also there are many other sub types
                like free soloing (Alex Honnold is a great example and extreme of this), buildering, deep water soloring, etc.
              </small>
              <br></br>
              <br></br>
         
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">V1-V3: Gaining Interest</h2>
            <p>
              After getting a bit more comfortable with the concept of bouldering and trying it out, the focus will shift to
              what type of problems you can do. Usually grades/levels vary from gym to gym but in general you'll start to know
              by looking at the types of holds, which ones you can probably managably do. Things become more fast paced
              where you get dopamine hits whenever you are able to flash-complete a full climb on the first try, or send-complete a 
              full climb after multiple tries, or complete a project-complete a climb after working on it for a while.
              <br></br>
              <br></br>
              You'll know that when you start a climb, you have to be stable and have your hands on the labeled starting points and during 
              the climb, you cannot touch other holds that are not the route you're completing. Completion of the climb is also the ability
              to be stable for a couple of seconds either by holding the edge of the wall at the top or the labeled top hold.
              <br></br>
              <br></br>
              Some terminology that is used around the gym especially when talking to others (bouldering turns out to be a fairly social sport)
              is that "beta" refers to the optimal and intended way to climb the route as there are almost always multiple ways
              also viability depending on possible factors like height, strength and flexibility. The "crux" refers to a bottleneck or
              point in the climbing route that is the toughest or relatively tough part. "Beta break" refers to finding loopholes that the route setter
              may have not intended for it to be climbed that way but essentially makes the climb easier.
              <br></br>
              <br></br>
              <small>
                Lesson 2: There are 2 main types of bouldering hold categorizations. Hand hold and foot hold. A hand hold
                is usually something with deeper divits (and cheatcode a hold that you make see more chalk on from past climbers). A foot hold
                is typically smaller or narrow without divits and is hard to hold onto with your hand. These holds can sometimes be both
                but it helps in figuring out what you may need to do by looking at the route first and mapping out where your feet and hands will
                go throughout the climb.
              </small>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">V4+: Stagnation</h2>
            <p>
              This may not be true for all climbers as everyone progresses at different paces but at some point, you'll start to stagnate as
              the problems get harder and the strength, flexibility, balance, etc become more and more necessary for climbs. Here
              chalk will begin to really make a difference and calluses will begin the ongoing cycle of falling off and gaining more on top.
              Because there might come a point where the climbs you can do are too easy and the climbs you can't do are too hard for me, bouldering
              became a little boring. Seeing the limited options I couldn't do, I spent a lot more time focused on socializing.
              In Austin, I ended up doing a soft V5 before having to leave for New York and having been on possibly a 4 week break from climbing
              may get back into it but just in a different city.
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Brief Technical Advice</h2>
            <p>
              - Keep your body and your arms straight and loose. Rely on the tension perpendicular to the hold and this will allow you 
              to spend less energy on holding yourself up.
              <br></br>
              <br></br>
              - Work your hands up as much as you can, then work your feet up as much as you can. Continue this process over and over. <br></br>
              - Try to have most of the work with your legs and feet. They are naturally stronger and able to support more than your arms can and it will help
              you again in saving energy.
               <br></br>
               <br></br>
              - Don't be afraid to look around during the climb at all the potential holds to utilize. It's ice to go for a hold that you
              didn't realize was there for you to use before.
              <br></br>
              <br></br>
              - Don't be afraid to backtrack. You might get stuck at a point in the climb, dont be afraid to backtrack and try another way from there.
              <br></br>
              <br></br>
              - If you find yourself having trouble on a climb, you can try to complete the climb in parts. So try the first chunk. Then for the second chunk, you can use other holds
              to get there and try completing the second chunk. And so on and so forth. Then when you're able to complete each section fully, you can try piecing it together.
              <br></br>
              <br></br>
              - If you're having trouble figuring out how to do a climb whether how to start it or at some point how to get to the next hold, you can observe others and the ways they are
              going about it. Also don't be afraid to ask for help while your on the wall for people to guide you or if someone you know has completed it, to get their advice or beta/route.
              <br></br>
              <br></br>
              - There are many technical skills; smearing is an example where you smear your shoe against the wall to climb up, control your movement, etc. You can gradually learn these some of these skills (smearing, toe hook, heel hook,
               flagging, matching, etc) which can help you with control, balance, conserving energy, and more allowing you to complete more complex climbs.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Other Lessons</h2>
            <p>
              As I briefly mentioned, bouldering is surprisingly a very social sport (of course you can also choose not to socialize).
              When you climb, you engage a lot of forearm strength and this leads to blood rushing into your forearms. They will get
              pumped, super full of blood and feel really stiff and tight, where you need to stretch and take breaks in between climbs. Because
              you need to take breaks in between climbs to let your body rest up for the next climb, a lot of the time most people are socializing instead
              of climbing. Especially if you become a regular and start going at the same times, most others will stick to their climbing schedules as well and
              this creates a community that you'll see on a regular basis. Everyone usually tends to be problem solvers, goal oriented and self challening, always willing to help,
              and have their own climbing styles. The community I found was super kind and supportive, cheering when you completed a climb and having at most times, more belief than
              you'll have in yourself. A true supportive community (as one who isn't supportive probably wouldn't last and really be able to progress on climbs) is easy to find. 
              <br></br>
              <br></br>

              Also another thing that I didn't expect to learn was being comfortable with failure. Because you probably won't be successful at every climb you do,
              you get comfortable with falling. With knowing your limits and comfortability with going to the next hold and being okay if you know it is not doable for you. I guess
              it's also a lesson in setting your own boundaries with yourself as well. A side effect of falling and not being able to complete every climb is also humility.
              Because it often is a social sport, it's not uncommon to be working and trying a climb in front of many others, people you may or may not know. They could be cheering you on or observing how
              you face the crux of the climb but all you need to know that failing and falling or what you look like on the wall is not embarassing. Everyone has fallen and gone
              through the exact same feelings so no one will be judging you because they once were in your exact position. I realized while I progressed, my confidence in general and my apetite for risk became much higher
              because I had been practicing risk taking through taking leaps of faith during climbing as well as the constant accomplishment of routes you maybe a week or two ago thought were an impossibility. Also becoming one with your body
              and limits was a big proportion of what I took away from bouldering
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Summary: So Far</h2>
            <p>
              All in all I'm grateful for all the lessons, technical and not, I've learned from this sport. It
              has led to such genuine and interesting people, a community, and what I believe may be some life long friends.
              From V0 to V5 it has surely been a journey and has came into my life during a time where a community, and restored belief
              in myself has allowed the so called spark, to finally come back.
              <br></br>
              <br></br>
              <small>
                Lesson 3: Trying and failing does not equate to failure, it equates to progress.
              </small>

            </p>


           
          </div>
        </article>
      </main>
    </div>
  );
};

export default Bouldering;
