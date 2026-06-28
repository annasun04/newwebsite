import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const TwentyOne = () => {
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
              21 Lessons by 21
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Month Day, Year</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>9 min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full max-w-none space-y-10 text-[#8aac78] text-lg md:text-xl leading-[1.9]">
           

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. You are who you surround yourself with</h2>
            <p>
              <br></br>
              <br></br>
              When you spend a lot of time around someone, you begin to pick up little quirks here and there from the other person
              subconsiously or consiously. This can be good when they are attributes you admire and like however it can also go the other
              way around as well. This is why you should be mindful about who you spend your time around and how they change and affect you. And if it
              is someone that you don't want to become and don't admire, understand what it means to keep them around and stay and to distance yourself.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Respect yourself</h2>
            <p>
              <br></br>
              <br></br>
              Respecting yourself can look like many things. One of those things that many people struggle with is boundaries.
              Whether self imposing or from an external source, know what that looks like. For me, it looked like distancing myself from
              people who seemed conditional with their support as well instilling better self discipline in taking care of my health and my goals.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. It's okay to be lonely</h2>
            <p>
              <br></br>
              <br></br>
              Once you have the freedom of loneliness taken away, can you appreciate the privilage of loneliness. Although obviously it doesn't feel nice, it
              is a type of freedom that many don't realize. Loneliness is an important feeling similar to grief where feeling what's not there is a sign
              that you've felt what was there before and makes you value it more. A bit of loneliness from time to time also helps with self reflection, independence, and growth.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Advocate for yourself</h2>
            <p>
              <br></br>
              <br></br>
              Oftentimes it may be easier to advocate for someone else than yourself. That for some reason we're taught to be humble to the point
              of not advocating for ourselves. The truth is that there is no knight in shining armor. The fairytale and waiting game for someone else to do something, to follow
              along with the crowd because of the potential pushback overshadows what you may think is an a good tradeoff when it is
              detrimental to your potential and ability to reach it.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Empathy is valuable</h2>
            <p>
              <br></br>
              <br></br>
              I've met people who believe the empathy and vulnerability is a weakness. Something for others and bad actors to exploit.
              Despite countless situations where it is easier to shut these skills away, it has reaped much more in return when I keep those doors open, at the 
              risk of facing unfortunate circumstances. Empathy allows for connection, real connection, and a genuiness far beyond words. It allows for people to be seen
              and remember the feeling of not being alone or misunderstood. Empathy at times might be an investment, once that may take a while to yield returns but when it
              inevitably comes back, it comes back tenfold in more ways than one.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. You can create impact now</h2>
            <p>
              <br></br>
              <br></br>
              I hear this and used to think "oh, when I make X amount of money, I can solve these problems. I can finally make impact." But this is a narrative
              that I've retired. Waiting on a metric like money is almost an excuse to push making an impact to tomorrow. I've found that if you make an impact in the now,
              doesn't need to be some sparkly large scale action, that it compounds over time. From the people you meet everyday to the way you lead by example in how you live your
              life, makes making a difference a privilage and something you can do in the now. Like how empathy reaps benefits, the impact you make day to day will impact the opportunities
              that you have for yourself and others.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Take risk and don't fear failure</h2>
            <p>
              <br></br>
              <br></br>
              I used to, and still do a bit, fear failure. The idea that you should fail fast sounds good but is tough in practice. Signing yourself
              up for tough situations, tough feelings, and tough obstacles is the only thing that's going to enable growth. The human ability
              to experience something and learn from it and continue until you completely change for the better is a beautiful thing. Obviously don't take every risk,
              take ones that you know will be good for you, calculated and strategic ones. 
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Learn from the mistakes of others</h2>
            <p>
              <br></br>
              <br></br>
              When others make mistakes, it can be easy to brush off as something specific to them however what makes us that different than each other?
              It's all our first time living, its not like (as of currently and my knowledge) we can download the experiences frame by frame of older folks who
              have all the lessons and wisdom in hand. So even though you can choose to take something either with a grain of salt or more, remember that
              taking it is important and will allow you to use the mistakes and experiences of others so that you can maybe avoid having to go through some of the 
              tough situations to end up coming to the same conclusion.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. You yourself and your values</h2>
            <p>
              <br></br>
              <br></br>
              When you spend a lot of time around someone, you begin to pick up little quirks here and there from the other person
              subconsiously or consiously. This can be good when they are attributes you admire and like however it can also go the other
              way around as well. This is why you should be mindful about who you spend your time around and how they change and affect you. And if it
              is someone that you don't want to become and don't admire, understand what it means to keep them around and stay and to distance yourself.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. You and your experiences are not unique</h2>
            <p>
              <br></br>
              <br></br>
              Since there are so many people in the world- past, present, and future- that have lived so many experiences, our
              experiences are not unique to us, especially in this modern world. From heartbreak from betrayal and the joy of getting a compliment to the most
              niche experiences, many more have felt. I remember I realized this at a conference where for the first time, I was around people
              with very similar stories and backgrounds as me. So you can imagine, in a room with 50 copies of yourself, it may feel devaluing as if you're a number
              but just as the good experiences are shared by many, there is comfort that the bad ones are also. So whenever you are facing a problem or a tough time,
              that it's not the first time around that anyone has dealt and felt this way and that they have gotten through it so you will to. 
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">11. It's okay not to get along with others</h2>
            <p>
              <br></br>
              <br></br>
              As a former slight people pleaser, a lesson that I've had to learn a couple times before it has really stuck has been that it's okay
              not to get along with others. As people, we meet so many people throughout our lives. To get along with everyone we meet would be a worse
              signal than not getting along with some. Also as people, we are diverse in thought, in values, and ways to live our lives. Pushing to change your fundamental
              values or expecting someone else to do so to align with yours in the end hurts you both and is unsustainable. Find the ones you do
              align with and distance yourself from the ones you dont.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">12. Being confrontational is good</h2>
            <p>
              <br></br>
              <br></br>
              When you spend a lot of time around someone, you begin to pick up little quirks here and there from the other person
              subconsiously or consiously. This can be good when they are attributes you admire and like however it can also go the other
              way around as well. This is why you should be mindful about who you spend your time around and how they change and affect you. And if it
              is someone that you don't want to become and don't admire, understand what it means to keep them around and stay and to distance yourself.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">13. Work hard, play hard is better than just work hard</h2>
            <p>
              <br></br>
              <br></br>
              Not mantaining a balance creates issues down the line no matter how strong willed or invincible you thing you are. It will catch up
              whether in a form of burn out or coping mechanisms. Those who may seem to be able to sustain purely work hard may seem that way
              since theiy play hard is the same thing. Know what work and play look like for you and ensure that balance.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">14. Humility is underrated</h2>
            <p>
              <br></br>
              <br></br>
              I believe humility is the key to success. Because humility allows you to step back to see where you can grow
              and reflect. Humility doesn not mean low confidence as you can be confident in something but have the humility
              to be wrong. Ego can be a tough character to be around and if you're in over your head, can easily misread situations
              and limits.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">15. Healing is a process that doesn't end</h2>
            <p>
              <br></br>
              <br></br>
              Healing whether from relationships or experiences isn't something that can be solved immediately. Heck, even Time
              doesn't help sometimes ease the feeling of healing. But one thing is for sure, everyone needs to go through the healing process
              to come out the other end. Even though people heal in different ways, pushing it down and calling it good or busying yourself
              up won't prevent it from visiting you in the future.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">16. Learn to be comfortable in the uncomfortable</h2>
            <p>
              <br></br>
              <br></br>
              This is aligned with taking risks. If you are never uncomfortable and never step outside of your own comfort zone, you'll never
              grow. And i get it, growth might not be the top priority of many but it is undeniably a strong trait and life changing mindset.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">17. We are all human</h2>
            <p>
              <br></br>
              <br></br>
              It's okay to make mistakes once in a while. To give yourself a break when you haven't for so long. To be
              critical of yourself where it becomes diminishing returns until there's nothing left to return is propogating
              exactly the opposite of what being critical of yourself is supposed to be. (a means of survival and thriving)
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">18. Do you really know yourself</h2>
            <p>
              <br></br>
              <br></br>
              Introspection seems to be a skill that should be practiced more. Something that can heal more wounds than a paid therapist might. At 21,
              i've learned more about myself through all the situations showing me who I dont want to be as well as the experiences showing me exactly what I want to be.
              That process is still ongoing as I have yet to experience much more, but the introspection that occurs especially after each difficult situation allows me to steer
              myself towards my right direction and onto the path I want for myself.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">19. Things are not that serious</h2>
            <p>
              <br></br>
              <br></br>
              Most errors can be undone. Sometimes maybe not to the extent as undone completely or without effort but most things
              like a broken relationship or lost money, can be gained back. Nothing is that serious and living life seriously seems
              to make it a life harder to live.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">20. You are not perfect and that's okay</h2>
            <p>
              <br></br>
              <br></br>
              Everyone has imperfections. You can't expect other and yourself to be perfect. You are blind to many of your imperfections 
              and may have a tough time dealing with the ones you do know are there. All that is important is that you reflect and try to improve
              yourself into the person you want to be and at what true cost.
              <br></br>
              <br></br>
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">21. Perspective defines everything</h2>
            <p>
              <br></br>
              <br></br>
              Perspective can change how everything unfolds. It impacts how you experience life and even life itself.
              It can mean the difference between having a bad day and a good one or having a life fulfilled and cherished or an empty and cold one.
              <br></br>
              <br></br>
            </p>
            
            
             

            

            
          </div>
        </article>
      </main>
    </div>
  );
};

export default TwentyOne;
