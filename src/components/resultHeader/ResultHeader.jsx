import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import WidgetContext from '../../context/WidgetContext';
import { getSelectedDatesAsText } from '../../utils/dateRangeFormatter';
import './resultHeader.css';

const ResultHeader = () => {
  const { searchKeyWord, startDateSpan, endDateSpan, totalCount } = useContext(WidgetContext);

  const { t } = useTranslation();

  const isSearchEmpty = !searchKeyWord || searchKeyWord.trim() === '';
  const isDateRangePresent = startDateSpan && endDateSpan;

  let dateText = '';
  if (isDateRangePresent) {
    dateText = <>{getSelectedDatesAsText(startDateSpan, endDateSpan, t)}</>;
  }

  return (
    <>
      <div className="result-header">
        {isSearchEmpty && isDateRangePresent && (
          <p>
            {totalCount > 0
              ? `${t('resultHeader.upcoming')} ${totalCount} ${t('events')} - `
              : `${t('resultHeader.noEvents')}`}
            {totalCount > 0 && dateText}
          </p>
        )}
        {isSearchEmpty && !isDateRangePresent && (
          <p>
            {totalCount > 0
              ? `${t('resultHeader.upcoming')} ${totalCount} ${t('events')}`
              : `${t('resultHeader.noEvents')} `}
          </p>
        )}

        {!isSearchEmpty && isDateRangePresent && (
          <p>
            {totalCount > 0
              ? `${totalCount} ${t('resultHeader.eventsContaining')} "${searchKeyWord}" - `
              : `${t('resultHeader.noEvents')}`}
            {totalCount > 0 && dateText}
          </p>
        )}

        {!isSearchEmpty && !isDateRangePresent && (
          <p>
            {totalCount > 0
              ? `${totalCount} ${t('resultHeader.eventsContaining')} "${searchKeyWord}"`
              : `${t('resultHeader.noEvents')}`}
          </p>
        )}
      </div>
    </>
  );
};

export default ResultHeader;
