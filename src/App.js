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

require('dayjs/locale/en');
require('dayjs/locale/fr');

function App(props) {
  const { color, font, headerTitle, gtagId, ...widgetProps } = props;
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
      <div className="widget-layout" style={{ height: widgetProps.height + 'px' }}>
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
