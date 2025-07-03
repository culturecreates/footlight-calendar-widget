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

// Store roots to prevent memory leaks
const widgetRoots = new WeakMap();

function initializeWidget(container) {
  if (widgetRoots.has(container)) return;

  const dataAttributes = widgetParams.reduce((acc, key) => {
    acc[key] = container.dataset?.[key];
    return acc;
  }, {});

  let { extractedProps, isSuccess, missingParams } = extractPropsFromSearchParams(dataAttributes);
  let { internalStateSearchParam, corruptInternalStateFlag } = handleInternalStateSearchParam();

  const root = createRoot(container);
  widgetRoots.set(container, root);

  const AppContent = (
    <ChakraProvider>
      {isSuccess && !corruptInternalStateFlag ? (
        <App {...extractedProps} internalStateSearchParam={internalStateSearchParam} />
      ) : (
        <Error missingParams={missingParams} />
      )}
    </ChakraProvider>
  );

  if (import.meta.env.MODE === 'production') {
    root.render(AppContent);
  } else {
    root.render(<React.StrictMode>{AppContent}</React.StrictMode>);
  }
}

function cleanupWidget(container) {
  if (widgetRoots.has(container)) {
    setTimeout(() => {
      widgetRoots.get(container).unmount();
      widgetRoots.delete(container);
    }, 0);
  }
}

function setupObserver() {
  const target = document.getElementById('calendar-widget');
  if (target) initializeWidget(target);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.id === 'calendar-widget') {
          cleanupWidget(node);
        }
        if (node.nodeType === 1 && node.querySelector('#calendar-widget')) {
          node.querySelectorAll('#calendar-widget').forEach(cleanupWidget);
        }
      });

      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.id === 'calendar-widget') {
          initializeWidget(node);
        }
        if (node.nodeType === 1 && node.querySelector('#calendar-widget')) {
          node.querySelectorAll('#calendar-widget').forEach(initializeWidget);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
}

// Self-executing IIFE wrapper
(function initWidget() {
  if (window.__calendarWidgetInitialized) return;

  window.__calendarWidgetInitialized = true;

  const observer = setupObserver();

  window.__calendarWidgetCleanup = function () {
    observer.disconnect();
    const widget = document.getElementById('calendar-widget');
    if (widget) cleanupWidget(widget);
    delete window.__calendarWidgetInitialized;
  };
})();
