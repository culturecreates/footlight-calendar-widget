import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import WidgetContext from '../../context/WidgetContext';
import { dateRangeFormatter } from '../../utils/dateRangeFormatter';
import './resultHeader.css';

const ResultHeader = () => {
  const { searchKeyWord, startDateSpan, endDateSpan, totalCount } = useContext(WidgetContext);

  const { t } = useTranslation();

  const isSearchEmpty = !searchKeyWord || searchKeyWord.trim() === '';
  const isDateRangePresent = startDateSpan && endDateSpan;

  let dateText = '';
  if (isDateRangePresent) {
    dateText =
      ' - ' + endDateSpan && startDateSpan !== endDateSpan
        ? dateRangeFormatter(startDateSpan, endDateSpan)
        : dateRangeFormatter(startDateSpan);
  }
  return (
    <>
      <div className="result-header">
        {isSearchEmpty && (
          <p>
            {totalCount > 0
              ? `${t('resultHeader.upcoming')} ${totalCount} ${t('events')}`
              : `${t('resultHeader.noEvents')} `}
          </p>
        )}

        {!isSearchEmpty && (
          <p>
            {totalCount > 0
              ? ` ${totalCount} ${t(
                  'resultHeader.eventsContaining',
                )} "${searchKeyWord}" ${dateText}`
              : `${t('resultHeader.noEvents')}`}
          </p>
        )}
      </div>
    </>
  );
};

export default ResultHeader;
