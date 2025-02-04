import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import WidgetContext from '../../context/WidgetContext';
import './calendarControl.css';

const CalendarControl = ({ setCalendarKey, setView, setActiveStartDate }) => {
  const {
    setSearchDate,
    searchDate,
    setStartDateSpan,
    setIsSingleDate,
    setEndDateSpan,
    isSingleDate,
    indexedSessionStorageVariableNames,
  } = useContext(WidgetContext);

  const { t } = useTranslation();

  const handleDateSelectionTypeChange = (e) => {
    if (e.target.checked && !Array.isArray(searchDate)) {
      setCalendarKey((prevState) => prevState + 1); // So reset button can reset date when in the middle of selection.
    }
    setSearchDate(null);
    sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetSearchDate, '');
    sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetStartDate, '');
    sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetEndDate, '');
    setIsSingleDate(e.target.checked);
    setStartDateSpan('');
    setEndDateSpan('');
    setView('month');
    setActiveStartDate(new Date());
  };

  const handleDateErase = () => {
    if (isSingleDate && !Array.isArray(searchDate)) {
      setCalendarKey((prevState) => prevState + 1); // So reset button can reset date when in the middle of selection.
    }
    setSearchDate(null);
    sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetSearchDate, '');
    sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetStartDate, '');
    sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetEndDate, '');
    setStartDateSpan('');
    setEndDateSpan('');
    setActiveStartDate(new Date());
    setView('month');
  };

  return (
    <div className="calendar-control">
      <div>
        <label>
          <input
            type="checkbox"
            id="single-date-control"
            style={{ height: '24px', width: '24px' }}
            checked={isSingleDate}
            onChange={(e) => handleDateSelectionTypeChange(e)}
          />
          <span></span>
          {t('datepicker.rangeSelectLabel')}
        </label>
      </div>

      <button onClick={handleDateErase}>{t('datepicker.eraseButtonLabel')}</button>
    </div>
  );
};

export default CalendarControl;
