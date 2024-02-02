import Footer from './components/footer/Footer';
import ResultPanel from './components/panel/Panel';
import Search from './components/search/Search';
import { WidgetContextProvider } from './context/WidgetContext';
import { getColors } from 'theme-colors';
import './App.css';
import { dynamicCssColorInjector } from './utils/dynamicCssColorInjector';

function App(props) {
  const { color, ...widgetProps } = props;

  const palette = getColors(color);
  dynamicCssColorInjector(palette);
  return (
    <WidgetContextProvider widgetProps={widgetProps}>
      <div className="widget-layout" style={{ height: widgetProps.height }}>
        <Search />
        <ResultPanel />
        <Footer />
      </div>
    </WidgetContextProvider>
  );
}

export default App;
