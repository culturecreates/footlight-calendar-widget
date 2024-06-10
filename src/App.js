import Footer from './components/footer/Footer';
import ResultPanel from './components/panel/Panel';
import Search from './components/search/Search';
import { WidgetContextProvider } from './context/WidgetContext';
import { getColors } from 'theme-colors';
import './App.css';
import { dynamicCssColorInjector, dynamicFontInjector } from './utils/dynamicStylePropertyInjector';
import { useEffect } from 'react';

function App(props) {
  const { color, font, ...widgetProps } = props;

  const palette = getColors(color);
  dynamicCssColorInjector(palette);

  useEffect(() => {
    dynamicFontInjector(font);
  }, []);

  return (
    <WidgetContextProvider widgetProps={widgetProps}>
      <div className="widget-layout" style={{ height: widgetProps.height + 'px' }}>
        <Search />
        <ResultPanel />
        <Footer />
      </div>
    </WidgetContextProvider>
  );
}

export default App;
