import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio";
import Blog from "./Blog";
import Bouldering from "./Bouldering";
import CommitmentIssues from "./CommitmentIssues";
import ICPC from "./ICPC";
import CollegeTradingCompetitions from "./CollegeTradingCompetitions";
import OptimizationsIRL from "./OptimizationsIRL";
import TwentyOne from "./TwentyOne";
import CollegeCourseMap from "./CollegeCourseMap";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/1" element={<Bouldering/>} />
        <Route path="/blog/2" element={<CommitmentIssues />} />
        <Route path="/blog/3" element={<ICPC />} />
        <Route path="/blog/4" element={<CollegeTradingCompetitions />} />
        <Route path="/blog/5" element={<OptimizationsIRL />} />
        <Route path="/blog/6" element={<TwentyOne />} />
        <Route path="/blog/7" element={<CollegeCourseMap />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
