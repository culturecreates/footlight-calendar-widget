import { createRoot } from 'react-dom/client';
import './i18n';
import App from './App';
import React from 'react';
import './index.css';
import {
  extractPropsFromSearchParams,
  handleInternalStateSearchParam,
} from './utils/extractPropsFromSearchParms';
import { ChakraProvider } from '@chakra-ui/react';
import Error from './components/error/Error';

const calendarWidget = document.getElementById('calendar-widget');

const dataAttributes = {
  api: calendarWidget.dataset?.api,
  locale: calendarWidget.dataset?.locale,
  calendar: calendarWidget.dataset?.calendar,
  color: calendarWidget.dataset?.color,
  limit: calendarWidget.dataset?.limit,
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
let { internalStateSearchParam, corruptInternalStateFlag } = handleInternalStateSearchParam();

const root = createRoot(calendarWidget);
const AppContent = (
  <ChakraProvider>
    {isSuccess && !corruptInternalStateFlag ? (
      <App {...extractedProps} internalStateSearchParam={internalStateSearchParam} />
    ) : (
      <Error missingParams={missingParams} />
    )}
  </ChakraProvider>
);

if (process.env.NODE_ENV == 'production') {
  root.render(AppContent);
} else {
  root.render(<React.StrictMode>{AppContent}</React.StrictMode>);
}
