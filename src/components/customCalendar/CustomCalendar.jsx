import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import WidgetContext from '../../context/WidgetContext';
import './customCalendar.css';
import 'react-calendar/dist/Calendar.css';
import CalendarControl from '../calendarControl/CalendarControl';
import prevButton from '../../assets/Chevron-Left.svg';
import prev2Button from '../../assets/ChevronDouble-Left.svg';
import next2Button from '../../assets/ChevronDouble-Right.svg';
import nextButton from '../../assets/Chevron-Right.svg';
import { displayTypes } from '../../constants/generalConstants';
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
    displayType,
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
    <div
      className="custom-calendar-wrapper"
      style={displayType === displayTypes.MOBILE ? { borderRadius: '4px 4px 8px 8px' } : {}}
    >
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
        prevLabel={<img src={prevButton} alt=""></img>}
        prev2Label={<img src={prev2Button} alt=""></img>}
        next2Label={<img src={next2Button} alt=""></img>}
        nextLabel={<img src={nextButton} alt=""></img>}
      />
    </div>
  );
};
