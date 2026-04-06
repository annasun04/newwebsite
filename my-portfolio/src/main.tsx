import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio";
import Blog from "./Blog";
import LearningToFailFast from "./LearningToFailFast";
import CommitmentIssues from "./CommitmentIssues";
import ICPC from "./ICPC";
import CollegeTradingCompetitions from "./CollegeTradingCompetitions";
import TwentyOneLessons from "./twentyOneLessons";
import CollegeCourseMap from "./CollegeCourseMap";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/1" element={<LearningToFailFast />} />
        <Route path="/blog/2" element={<CommitmentIssues />} />
        <Route path="/blog/3" element={<ICPC />} />
        <Route path="/blog/4" element={<CollegeTradingCompetitions />} />
        <Route path="/blog/5" element={<TwentyOneLessons />} />
        <Route path="/blog/7" element={<CollegeCourseMap />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
