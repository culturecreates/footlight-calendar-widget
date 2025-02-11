import { createRoot } from 'react-dom/client';
import './i18n';
import App from './App';
import React from 'react';
import './index.css';
import { extractPropsFromSearchParams } from './utils/extractPropsFromSearchParms';
import Error from './components/error/Error';
import { Provider } from './ChakraProvider';

const calendarWidget = document.getElementById('calendar-widget');

const dataAttributes = {
  api: calendarWidget.dataset?.api,
  locale: calendarWidget.dataset?.locale,
  calendar: calendarWidget.dataset?.calendar,
  calendarName: calendarWidget.dataset?.calendarName,
  color: calendarWidget.dataset?.color,
  limit: calendarWidget.dataset?.limit,
  calendarLogo: calendarWidget.dataset?.logo,
  searchEventsFilters: calendarWidget.dataset?.searchEventsFilter,
  height: calendarWidget.dataset?.height,
  index: calendarWidget.dataset?.index,
  font: calendarWidget.dataset?.font,
  redirectionMode: calendarWidget.dataset?.redirectionMode,

  showFooter: calendarWidget.dataset?.showFooter,
  alwaysOnDatePicker: calendarWidget.dataset?.alwaysOnDatePicker,
  headerTitle: calendarWidget.dataset?.headerTitle,
  disableGrouping: calendarWidget.dataset?.disableGrouping,
  filterOptions: calendarWidget.dataset?.filterOptions,
};

let { extractedProps, isSuccess, missingParams } = extractPropsFromSearchParams(dataAttributes);

const root = createRoot(calendarWidget);
const AppContent = (
  <Provider>
    {isSuccess ? <App {...extractedProps} /> : <Error missingParams={missingParams} />}
  </Provider>
);

if (process.env.NODE_ENV == 'production') {
  root.render(AppContent);
} else {
  root.render(<React.StrictMode>{AppContent}</React.StrictMode>);
}
