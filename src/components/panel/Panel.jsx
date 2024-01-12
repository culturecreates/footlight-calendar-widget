import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { displayTypes } from '../../constants/generalConstants';
import WidgetContext from '../../context/WidgetContext';
import { CustomCalendar } from '../customCalendar/CustomCalendar';
import NoResult from '../noResult/NoResult';
import ResultHeader from '../resultHeader/ResultHeader';
import Results from '../results/Results';
import './panel.css';

const ResultPanel = () => {
  const { displayType, totalCount } = useContext(WidgetContext);

  const { t } = useTranslation();
  return (
    <section className="result-panel-wrapper">
      <ResultHeader />

      {displayType === displayTypes.MOBILE && (
        <div className="button-container">
          <button>{t('date')}</button>
        </div>
      )}
      <div className="result-panel">
        <div className="results">{totalCount > 0 ? <Results /> : <NoResult />}</div>
        {displayType === displayTypes.DESKTOP && <CustomCalendar />}
      </div>
    </section>
  );
};

export default ResultPanel;
