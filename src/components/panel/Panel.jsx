import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { displayTypes } from '../../constants/generalConstants';
import WidgetContext from '../../context/WidgetContext';
import { CustomCalendar } from '../customCalendar/CustomCalendar';
import Loader from '../loader/Loader';
import NoResult from '../noResult/NoResult';
import ResultHeader from '../resultHeader/ResultHeader';
import Results from '../results/Results';
import './panel.css';

const ResultPanel = () => {
  const calendarModalRef = useRef(null);

  const {
    displayType,
    totalCount,
    calendarModalToggle,
    setCalendarModalToggle,
    isLoading,
    widgetProps,
  } = useContext(WidgetContext);

  const { t } = useTranslation();

  const calendarPopOverHandler = () => {
    setCalendarModalToggle(!calendarModalToggle);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        calendarModalRef.current &&
        !calendarModalRef.current.contains(event.target) &&
        calendarModalToggle
      ) {
        setCalendarModalToggle(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [calendarModalToggle]);

  return (
    <section
      className="result-panel-wrapper"
      style={{ height: `${parseInt(widgetProps?.height?.replace(/px/g, ''), 10) - 132}px` }}
    >
      <ResultHeader />

      {displayType === displayTypes.MOBILE && (
        <div className="button-container">
          <button onClick={calendarPopOverHandler}>{t('date')}</button>
          {calendarModalToggle && (
            <div className="calendar-modal-pivot">
              <div className="calendar-modal-wrapper" ref={calendarModalRef}>
                <CustomCalendar />
              </div>
            </div>
          )}
        </div>
      )}
      <div className="result-panel" style={totalCount > 0 ? {} : { alignItems: 'center' }}>
        {!isLoading ? (
          <div className="results">{totalCount > 0 ? <Results /> : <NoResult />}</div>
        ) : (
          <div className="loader-wrapper">
            <Loader />
          </div>
        )}
        {displayType === displayTypes.DESKTOP && <CustomCalendar />}
      </div>
    </section>
  );
};

export default ResultPanel;
