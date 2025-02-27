import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import WidgetContext from '../../context/WidgetContext';
import './customCalendar.css';
import 'react-calendar/dist/Calendar.css';
import CalendarControl from '../calendarControl/CalendarControl';
import { ReactComponent as PrevButton } from '../../assets/chevronLeft.svg';
import { ReactComponent as Prev2Button } from '../../assets/chevronDoubleLeft.svg';
import { ReactComponent as Next2Button } from '../../assets/chevronDoubleRight.svg';
import { ReactComponent as NextButton } from '../../assets/chevronRight.svg';
import { getDefaultSessionStorageVariableNames } from '../../constants/sessionStorageVariableNames';

const dateConverter = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const paddedDay = String(day).padStart(2, '0');
  const paddedMonth = String(month).padStart(2, '0');
  const formattedDate = `${year}-${paddedMonth}-${paddedDay}`;
  return formattedDate;
};

export const CustomCalendar = () => {
  const {
    searchDate,
    setSearchDate,
    setStartDateSpan,
    setEndDateSpan,
    isSingleDate,
    widgetProps,
    calendarModalToggle,
    setCalendarModalToggle,
    indexedSessionStorageVariableNames,
  } = useContext(WidgetContext);

  const { locale, font } = widgetProps;

  const [activeStartDate, setActiveStartDate] = useState();
  const [view, setView] = useState('month');
  const [calendarKey, setCalendarKey] = useState(1); // Added to forcefully reset the selected date during range selection.

  useEffect(() => {
    let savedDate = sessionStorage.getItem(getDefaultSessionStorageVariableNames.WidgetSearchDate);

    if (savedDate?.includes(',')) {
      savedDate = savedDate?.split(',');
    }
    if (savedDate !== null && savedDate !== 'null') {
      setSearchDate(savedDate);
    }
  }, []);

  useEffect(() => {
    if (font) {
      const calendarWrapper = document.querySelector('.react-calendar-wrapper');
      if (calendarWrapper) {
        calendarWrapper.style.fontFamily = font;
      }
    }
  }, [font]);

  // handlers
  const searchDateHandler = (value) => {
    sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetSearchDate, value);
    setSearchDate(value);

    setCalendarModalToggle(!calendarModalToggle);
    if (!isSingleDate) {
      const selectedDate = dateConverter(new Date(value));
      setStartDateSpan(selectedDate);
      sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetStartDate, selectedDate);
      setEndDateSpan(selectedDate);
      sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetEndDate, selectedDate);
    } else {
      if (value[0] !== null) {
        setStartDateSpan(dateConverter(new Date(value[0])));
        setEndDateSpan(dateConverter(new Date(value[1])));
        sessionStorage.setItem(
          indexedSessionStorageVariableNames.WidgetStartDate,
          dateConverter(new Date(value[0])),
        );
        sessionStorage.setItem(
          indexedSessionStorageVariableNames.WidgetEndDate,
          dateConverter(new Date(value[1])),
        );
      } else {
        sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetStartDate, '');
        sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetEndDate, '');
        setStartDateSpan('');
        setEndDateSpan('');
      }
    }
  };

  const drillDownHandler = (activeStartDate, view) => {
    setView(view);
    setActiveStartDate(activeStartDate);
  };

  const drillUpHandler = (activeStartDate, view) => {
    setView(view);
    setActiveStartDate(activeStartDate);
  };

  const handleNavigation = (activeStartDate) => {
    setActiveStartDate(activeStartDate);
  };

  const formatShortWeekday = (locale, date) => {
    return date.toLocaleDateString(locale, { weekday: 'short' }).charAt(0);
  };

  return (
    <div className="custom-calendar-wrapper">
      <CalendarControl
        setCalendarKey={setCalendarKey}
        setView={setView}
        setActiveStartDate={setActiveStartDate}
      />
      <Calendar
        key={calendarKey}
        onChange={searchDateHandler}
        defaultValue={searchDate}
        value={searchDate}
        activeStartDate={activeStartDate}
        onDrillDown={({ activeStartDate, view }) => drillDownHandler(activeStartDate, view)}
        onDrillUp={({ activeStartDate, view }) => drillUpHandler(activeStartDate, view)}
        onActiveStartDateChange={({ activeStartDate }) => handleNavigation(activeStartDate)}
        goToRangeStartOnSelect={true}
        view={view}
        selectRange={isSingleDate}
        formatShortWeekday={formatShortWeekday}
        className="react-calendar-wrapper"
        locale={locale}
        prevLabel={<PrevButton />}
        prev2Label={<Prev2Button />}
        next2Label={<Next2Button />}
        nextLabel={<NextButton />}
      />
    </div>
  );
};
