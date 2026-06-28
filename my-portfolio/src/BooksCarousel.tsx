import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import deepWork from "./assets/deep_work.png";
import harmony from "./assets/harmony.png";
import honest from "./assets/honest.png";
import crackCode from "./assets/crackCode.png";
import designData from "./assets/designData.png";
import optionsDeriv from "./assets/optionsDerivatives.png";
import concreteMath from "./assets/concreteMath.png";
import introProb from "./assets/introProb.png";
type Book = {
  id: string;
  title: string;
  author: string;
  color?: string;
  progress: string;
  rating: string;
  image?: string;
};

const sampleBooks: Book[] = [
  { id: '1', title: 'Deep Work', author: 'Cal Newport', color: 'from-sky-800 to-sky-800', progress: "100%", rating: "5/5", image: deepWork },
  { id: '2', title: 'Harmony', author: 'Whitney Hanson', color: 'from-sky-400 to-sky-700', progress: "100%", rating: "5/5", image: harmony },
  { id: '3', title: 'If We\'re Being Honest', author: 'Cat Shook', color: 'from-amber-400 to-amber-700', progress: "0%", rating: "*/5", image: honest},
  { id: '4', title: 'Cracking The Coding Interview', author: 'Gayle Laakmann McDowell', color: 'from-indigo-400 to-indigo-700', progress: "15%", rating: "3/5", image: crackCode },
  { id: '5', title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann \& Chris Riccomini', color: 'from-pink-400 to-pink-700', progress: "0%", rating: "*/5", image: designData },
  { id: '6', title: 'Options, Futures, and Other Derivatives', author: 'John C. Hull', color: 'from-emerald-400 to-emerald-700', progress: "0%", rating: "*/5", image: optionsDeriv },
  { id: '7', title: 'Concrete Mathematics', author: 'Ronald G, Donald K \& Oren P', color: 'from-pink-400 to-pink-700', progress: "0%", rating: "*/5", image: concreteMath },
  { id: '8', title: 'Introduction to Probability', author: 'Joseph Blitzstein \& Jessica Hwang', color: 'from-emerald-400 to-emerald-700', progress: "0%", rating: "*/5", image: introProb },
];

export default function BooksCarousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (amount: number) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="w-full my-8">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-2xl text-white font-bold mb-4 text-left">Current (Summer 2026) Reads</h3>

        <div className="relative">
          <button
            aria-label="Scroll left"
            onClick={() => scrollBy(-400)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/40 backdrop-blur rounded-full p-2 hover:scale-105 transition"
          >
            <ChevronLeft className="text-white" />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth py-4 pl-12 pr-6 snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' as any }}
          >
            {sampleBooks.map((book) => (
              <div
                key={book.id}
                className="snap-start min-w-[180px] md:min-w-[220px] bg-slate-900/80 rounded-2xl p-4 flex-shrink-0 flex flex-col items-start gap-3 shadow-lg"
              >
                <img
                  src={book.image}
                  alt={`${book.title} cover`}
                  className="w-full h-48 object-cover rounded-xl border border-white/10"
                />
                <div className="text-sm font-semibold text-white">{book.title}</div>
                <div className="text-sm text-slate-300">{book.author}</div>
                <div className="text-xs text-slate-400">rating: {book.rating}</div>
                <div className="mt-auto w-full flex justify-between items-center">
                  <div className="text-xs text-slate-400">Read progress: {book.progress}</div>
                  <button className="text-xs px-3 py-1 bg-white/5 rounded-full hover:bg-white/10">Open</button>
                </div>
              </div>
            ))}
          </div>

          <button
            aria-label="Scroll right"
            onClick={() => scrollBy(400)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/40 backdrop-blur rounded-full p-2 hover:scale-105 transition"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
