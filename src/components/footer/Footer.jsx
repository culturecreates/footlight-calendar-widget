import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import WidgetContext from '../../context/WidgetContext';
import './footer.css';
import { redirectionHandler } from '../../utils/redirectionHandler';

const Footer = () => {
  const { t } = useTranslation();
  const { widgetProps, totalCount } = useContext(WidgetContext);

  const { locale, calendar, calendarName } = widgetProps;
  let redirectionUrl = `${process.env.REACT_APP_API_URL}resource?calendar=${calendar}&locale=${locale}`;

  const submitHandler = (event) => {
    event.preventDefault();

    // const searchParams = new URLSearchParams();

    // searchParams.append('limit', 100);
    // if (searchKeyWord !== '' && searchKeyWord) {
    //   widgetProps?.calendar == 'signe-laval'
    //     ? searchParams.append('q', searchKeyWord)
    //     : searchParams.append('query', searchKeyWord);
    // }
    // if (startDateSpan) {
    //   searchParams.append('start-date-range', startDateSpan);
    // }
    // if (endDateSpan) {
    //   searchParams.append('end-date-range', endDateSpan);
    // }
    redirectionHandler({ url: redirectionUrl });
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
