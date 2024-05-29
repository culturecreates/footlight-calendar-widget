import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import WidgetContext from '../../context/WidgetContext';
import './footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const { widgetProps, totalCount } = useContext(WidgetContext);

  const { locale, calendar, calendarName } = widgetProps;
  let redirectionUrl = `${process.env.REACT_APP_API_URL}calendars/${calendar}/events/redirect`;

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(redirectionUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          locale,
          id: calendar,
        },
      });

      console.log(response);
    } catch (error) {
      console.error('Error during redirection:', error);
    }
  };

  return (
    <footer className="footer">
      <div className="button-container" onClick={submitHandler}>
        <button>{totalCount > 0 ? t('footer.text') : t('footer.noItems')}</button>
      </div>
      <div className="provided-by-container">
        <span className="text">{t('footer.providedBy')}</span>
        <span className="calendar-name">{calendarName}</span>
        <div className="calendar-logo">
          <img src={widgetProps?.calendarLogo} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
