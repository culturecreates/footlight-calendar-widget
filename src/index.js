import { createRoot } from 'react-dom/client';
import './i18n';
import App from './App';
import React from 'react';
import './index.css';
import { extractPropsFromSearchParams } from './utils/extractPropsFromSearchParms';

const calendarWidget = document.getElementById('calendar-widget');

const defaultProps = {
  api: calendarWidget.dataset?.api,
  locale: calendarWidget.dataset?.locale,
  calendar: calendarWidget.dataset?.calendar,
  color: calendarWidget.dataset?.color,
  limit: calendarWidget.dataset?.limit,
  calendarLogo: calendarWidget.dataset?.logo,
  eventUrl: calendarWidget.dataset?.eventUrl,
  searchEventsUrl: calendarWidget.dataset?.searchEventsUrl,
  searchEventsFilters: calendarWidget.dataset?.searchEventsFilter,
  height: calendarWidget.dataset?.height,
  index: calendarWidget.dataset?.index,
};

let extractedProps = extractPropsFromSearchParams(defaultProps);

const root = createRoot(calendarWidget);
root.render(
  <React.StrictMode>
    <App {...extractedProps} />
  </React.StrictMode>,
);
