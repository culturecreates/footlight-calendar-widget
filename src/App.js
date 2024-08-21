import Footer from './components/footer/Footer';
import ResultPanel from './components/panel/Panel';
import Search from './components/search/Search';
import { WidgetContextProvider } from './context/WidgetContext';
import { getColors } from 'theme-colors';
import './App.css';
import { dynamicCssColorInjector, dynamicFontInjector } from './utils/dynamicStylePropertyInjector';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Loader from './components/loader/Loader';

function App(props) {
  const { color, font, ...widgetProps } = props;
  const locale = widgetProps.locale;
  const [loading, setLoading] = useState(true);

  const palette = getColors(color);
  dynamicCssColorInjector(palette);

  useEffect(() => {
    async function loadLocale() {
      try {
        await import(`dayjs/locale/${locale}.js`);
        dayjs.locale(widgetProps.locale);
      } catch (error) {
        console.error(`Failed to load locale: ${locale}`, error);
      } finally {
        setLoading(false);
      }
    }

    loadLocale();
  }, [locale]);

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
        <Search />
        <ResultPanel />
        <Footer />
      </div>
    </WidgetContextProvider>
  );
}

export default App;
