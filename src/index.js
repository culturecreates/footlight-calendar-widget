import { createRoot } from 'react-dom/client';
import './i18n';
import App from './App';
import React from 'react';
import './index.css';

const calendarWidget = document.getElementById('calendar-widget');

const root = createRoot(calendarWidget);

root.render(
  <React.StrictMode>
    <App
      api={calendarWidget.dataset.api}
      locale={calendarWidget.dataset.locale}
      calendar={calendarWidget.dataset.calendar}
      color={calendarWidget.dataset.color}
      limit={calendarWidget.dataset.limit}
    />
  </React.StrictMode>,
);
