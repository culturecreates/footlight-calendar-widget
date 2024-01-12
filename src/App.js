// import { useTranslation } from 'react-i18next';
import Footer from './components/footer/Footer';
import ResultPanel from './components/panel/Panel';
import Search from './components/search/Search';
import { ThemeProvider } from './context/ThemeContext';
import { WidgetContextProvider } from './context/WidgetContext';
import './App.css';

function App(props) {
  const { color, ...widgetProps } = props;
  return (
    <ThemeProvider color={color}>
      <WidgetContextProvider widgetProps={widgetProps}>
        <div className="widget-layout" style={{ maxHeight: window.screen.height }}>
          <Search />
          <ResultPanel />
          <Footer />
        </div>
      </WidgetContextProvider>
    </ThemeProvider>
  );
}

export default App;
