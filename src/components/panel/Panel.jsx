import React, { useContext } from 'react';
import WidgetContext from '../../context/WidgetContext';
import Loader from '../loader/Loader';
import NoResult from '../noResult/NoResult';
import ResultHeader from '../resultHeader/ResultHeader';
import Results from '../results/Results';
import './panel.css';

const ResultPanel = () => {
  const { totalCount, isLoading } = useContext(WidgetContext);

  return (
    <section className="result-panel-wrapper">
      <ResultHeader />

      <div className="result-panel">
        {!isLoading ? (
          <div className="results">{totalCount > 0 ? <Results /> : <NoResult />}</div>
        ) : (
          <div className="loader-wrapper">
            <Loader />
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultPanel;
