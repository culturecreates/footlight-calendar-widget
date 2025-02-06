import { WidgetContextProvider } from './context/WidgetContext';
import { getColors } from 'theme-colors';
import './App.css';
import { dynamicCssColorInjector, dynamicFontInjector } from './utils/dynamicStylePropertyInjector';
import { Suspense, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Loader from './components/loader/Loader';
import Footer from './components/footer/Footer';
import ResultPanel from './components/panel/Panel';
import Search from './components/search/Search';
import { Heading } from '@chakra-ui/react';

require('dayjs/locale/en');
require('dayjs/locale/fr');

function App(props) {
  const { color, font, headerTitle, ...widgetProps } = props;
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
          {headerTitle && (
            <Heading
              fontSize="19px"
              fontWeight="600"
              fontFamily={font}
              lineHeight="28.69px"
              textAlign="center"
              textUnderlinePosition="from-font"
              textDecorationSkipInk="none"
              color="#000000"
              mt={8}
              mb={-3}
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
