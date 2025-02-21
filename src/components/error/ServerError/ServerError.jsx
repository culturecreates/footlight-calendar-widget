import React from 'react';
import './serverError.css';
import { useTranslation } from 'react-i18next';

const ServerError = () => {
  const { t } = useTranslation();

  return (
    <div className="error-container">
      <p className="error-heading">{t('errorPage.heading')}</p>
      <p className="error-subtext">{t('errorPage.subtext')}</p>

      <button className="error-button">{t('errorPage.homeButton')}</button>
    </div>
  );
};

export default ServerError;
