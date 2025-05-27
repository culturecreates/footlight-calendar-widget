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
import { widgetParams } from './constants/props';

const calendarWidget = document.getElementById('calendar-widget');

const dataAttributes = widgetParams.reduce((acc, key) => {
  acc[key] = calendarWidget.dataset?.[key];
  return acc;
}, {});

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

if (import.meta.env.MODE == 'production') {
  root.render(AppContent);
} else {
  root.render(<React.StrictMode>{AppContent}</React.StrictMode>);
}
