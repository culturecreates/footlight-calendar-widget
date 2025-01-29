import { createRoot } from 'react-dom/client';
import './i18n';
import App from './App';
import React from 'react';
import './index.css';
import { extractPropsFromSearchParams } from './utils/extractPropsFromSearchParms';
import { ChakraProvider } from '@chakra-ui/react';
import Error from './components/error/Error';

const calendarWidget = document.getElementById('calendar-widget');

const dataAttributes = {
  api: calendarWidget.dataset?.api,
  locale: calendarWidget.dataset?.locale,
  calendar: calendarWidget.dataset?.calendar,
  calendarName: calendarWidget.dataset?.calendarName,
  color: calendarWidget.dataset?.color,
  limit: calendarWidget.dataset?.limit,
  calendarLogo: calendarWidget.dataset?.logo,
  eventUrl: calendarWidget.dataset?.eventUrl,
  searchEventsUrl: calendarWidget.dataset?.searchEventsUrl,
  searchEventsFilters: calendarWidget.dataset?.searchEventsFilter,
  height: calendarWidget.dataset?.height,
  index: calendarWidget.dataset?.index,
  font: calendarWidget.dataset?.font,
  redirectionMode: calendarWidget.dataset?.redirectionMode,
};

let { extractedProps, isSuccess, missingParams } = extractPropsFromSearchParams(dataAttributes);

const root = createRoot(calendarWidget);
const AppContent = (
  <ChakraProvider>
    {isSuccess ? <App extractedProps={extractedProps} /> : <Error missingParams={missingParams} />}
  </ChakraProvider>
);

if (process.env.NODE_ENV === 'production') {
  root.render(AppContent);
} else {
  root.render(<React.StrictMode>{AppContent}</React.StrictMode>);
}
