import { WidgetContextProvider } from './context/WidgetContext';
import './App.css';
import { dynamicCssColorInjector, dynamicFontInjector } from './utils/dynamicStylePropertyInjector';
import { Suspense, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Loader from './components/loader/Loader';
import Footer from './components/footer/Footer';
import ResultPanel from './components/panel/Panel';
import Search from './components/search/Search';
import { Heading } from '@chakra-ui/react';
import { initGoogleAnalytics } from './utils/googleAnalytics';

import 'dayjs/locale/en';
import 'dayjs/locale/fr';

const DEFAULT_WIDGET_HEIGHT = '1000px';

function resolveWidgetHeight(height) {
  if (typeof height === 'number') {
    return Number.isFinite(height) ? `${height}px` : DEFAULT_WIDGET_HEIGHT;
  }

  if (typeof height === 'string') {
    const normalizedHeight = height.trim();

    if (!normalizedHeight) {
      return DEFAULT_WIDGET_HEIGHT;
    }

    if (/^(?:\d+|\d*\.\d+)$/.test(normalizedHeight)) {
      return `${normalizedHeight}px`;
    }

    return normalizedHeight;
  }

  return DEFAULT_WIDGET_HEIGHT;
}

function App(props) {
  const { color, font, headerTitle, gtagId, ...widgetProps } = props;
  const locale = widgetProps.locale;
  const [loading, setLoading] = useState(true);
  const resolvedHeight = resolveWidgetHeight(widgetProps.height);

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

  dynamicCssColorInjector(color);

  useEffect(() => {
    dynamicFontInjector(font);
  }, [font]);

  useEffect(() => {
    initGoogleAnalytics(gtagId);
  }, []);

  if (loading)
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );

  return (
    <WidgetContextProvider widgetProps={{ ...widgetProps, font }}>
      <div className="widget-layout" style={{ height: resolvedHeight }}>
        <Suspense fallback={<Loader />}>
          {headerTitle && (
            <Heading
              style={{
                fontSize: '19px',
                fontWeight: 600,
                fontFamily: font,
                lineHeight: '28.69px',
                textAlign: 'center',
                textUnderlinePosition: 'from-font',
                textDecorationSkipInk: 'none',
                color: '#000000',
                marginTop: '32px',
                marginBottom: '-12px',
              }}
            >
              {headerTitle}
            </Heading>
          )}
          <Search />
          <ResultPanel />
          <Footer />
        </Suspense>
      </div>
    </WidgetContextProvider>
  );
}

export default App;
