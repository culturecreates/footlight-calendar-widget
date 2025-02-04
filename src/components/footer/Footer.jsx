/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import WidgetContext from '../../context/WidgetContext';
import './footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const { widgetProps } = useContext(WidgetContext);

  return (
    <footer className="footer">
      <div className="provided-by-container">
        <span className="text">{t('footer.providedBy')}</span>
        <div className="calendar-logo">
          <img src={widgetProps?.calendarLogo} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
