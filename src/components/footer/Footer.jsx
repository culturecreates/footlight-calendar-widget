import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import WidgetContext from '../../context/WidgetContext';
import './footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const { widgetProps } = useContext(WidgetContext);
  const calendarName = widgetProps?.calendar.replace(/(?:^|-)([a-z])/g, (_, group) =>
    group.toUpperCase(),
  );
  return (
    <footer className="footer">
      <div className="button-container">
        <button>{t('footer.text')}</button>
      </div>
      <div className="provided-by-container">
        <span className="text">{t('footer.providedBy')}</span>
        <span className="calendar-name">{calendarName}</span>
      </div>
    </footer>
  );
};

export default Footer;
