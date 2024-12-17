import { WidgetContextProvider } from './context/WidgetContext';
import { getColors } from 'theme-colors';
import './App.css';
import { dynamicCssColorInjector, dynamicFontInjector } from './utils/dynamicStylePropertyInjector';
import { lazy, Suspense, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Loader from './components/loader/Loader';

const Footer = lazy(() => import('./components/footer/Footer'));
const ResultPanel = lazy(() => import('./components/panel/Panel'));
const Search = lazy(() => import('./components/search/Search'));

import('dayjs/locale/en');
import('dayjs/locale/fr');

function App(props) {
  const { color, font, ...widgetProps } = props;
  const locale = widgetProps.locale;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (locale) {
        dayjs.locale(locale);
      } else {
        dayjs.locale('en');
      }
      setLoading(false);
    } catch (error) {
      console.error(`Failed to set locale: ${locale}`, error);
      dayjs.locale('en');
      setLoading(false);
    }
  }, [locale]);

  const palette = getColors(color);
  dynamicCssColorInjector(palette);

  useEffect(() => {
    dynamicFontInjector(font);
  }, [font]);

  if (loading)
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );

  return (
    <WidgetContextProvider widgetProps={{ ...widgetProps, font }}>
      <div className="widget-layout" style={{ height: widgetProps.height + 'px' }}>
        <Suspense fallback={<Loader />}>
          <Search />
          <ResultPanel />
          <Footer />
        </Suspense>
      </div>
    </WidgetContextProvider>
  );
}

export default App;
