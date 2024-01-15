import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Avatar } from '../../assets/Avatar.svg';
import './noResult.css';

const NoResult = () => {
  const { t } = useTranslation();

  return (
    <div className="no-content">
      <Avatar />
      <span>{t('noResults')}</span>
    </div>
  );
};

export default NoResult;
