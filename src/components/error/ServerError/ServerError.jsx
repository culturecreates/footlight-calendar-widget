import React, { useContext } from 'react';
import './serverError.css';
import { useTranslation } from 'react-i18next';
import WidgetContext from '../../../context/WidgetContext';
import Error404 from '../../../assets/error404.svg?react';

const ServerError = () => {
  const { t } = useTranslation();
  const { resetFilters } = useContext(WidgetContext);

  return (
    <div className="error-container">
      <Error404 style={{ maxWidth: '240px' }} />
      <h1 className="error-heading">
        {t('errorPage.primaryHeading')}
        <br />
        {t('errorPage.secondaryHeading')}
      </h1>
      <p className="error-text">{t('errorPage.subtext')}</p>
      <button className="error-button" onClick={resetFilters}>
        {t('errorPage.homeButton')}
      </button>
    </div>
  );
};

export default ServerError;
