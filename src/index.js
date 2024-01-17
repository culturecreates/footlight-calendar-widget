import { createRoot } from 'react-dom/client';
import './i18n';
import App from './App';
import React from 'react';
import './index.css';
import { extractPropsFromSearchParams } from './utils/extractPropsFromSearchParms';

const calendarWidget = document.getElementById('calendar-widget');

const defaultProps = {
  api: calendarWidget.dataset.api,
  locale: calendarWidget.dataset.locale,
  calendar: calendarWidget.dataset.calendar,
  color: calendarWidget.dataset.color,
  limit: calendarWidget.dataset.limit,
  calendarLogo: calendarWidget.dataset.logo,
};

if (Object.keys(calendarWidget.dataset).length === 0) {
  const extractedProps = extractPropsFromSearchParams(defaultProps);

  const root = createRoot(calendarWidget);
  root.render(
    <React.StrictMode>
      <App {...extractedProps} />
    </React.StrictMode>,
  );
}
