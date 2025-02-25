import React, { useContext } from 'react';
import './serverError.css';
import { useTranslation } from 'react-i18next';
import WidgetContext from '../../../context/WidgetContext';

const ServerError = () => {
  const { t } = useTranslation();
  const { resetFilters } = useContext(WidgetContext);

  return (
    <div className="error-container">
      <p className="error-heading">{t('errorPage.heading')}</p>
      <p className="error-subtext">{t('errorPage.subtext')}</p>

      <button className="error-button" onClick={resetFilters}>
        {t('errorPage.homeButton')}
      </button>
    </div>
  );
};

export default ServerError;
