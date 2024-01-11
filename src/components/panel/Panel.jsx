import React from "react";
import { CustomCalendar } from "../customCalendar/CustomCalendar";
import ResultHeader from "../resultHeader/ResultHeader";
import Results from "../results/Results";
import "./panel.css";

const ResultPanel = () => {
  return (
    <section className="result-panel-wrapper">
      <ResultHeader />
      <div className="result-panel">
        <Results />
        <CustomCalendar />
      </div>
    </section>
  );
};

export default ResultPanel;
