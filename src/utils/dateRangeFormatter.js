import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Translation } from 'react-i18next';

dayjs.extend(utc);
dayjs.extend(timezone);

export function dateRangeFormatter(startdate, enddate, scheduleTimezone = 'Canada/Eastern') {
  const startDateTimeObj = dayjs.utc(startdate).tz(scheduleTimezone);
  const noEndDateFlag = !enddate || enddate == '' || enddate == null;

  if (!startDateTimeObj.isValid()) {
    return 'Invalid date format';
  }

  const formattedStartDate = noEndDateFlag
    ? startDateTimeObj.format('DD MMM YYYY - h:mm a')
    : startDateTimeObj.format('DD MMM YYYY');

  if (!noEndDateFlag) {
    let endDateObj = dayjs.utc(enddate).tz(scheduleTimezone);

    if (!endDateObj.isValid()) {
      return 'Invalid end date format';
    }

    const formattedEndDate = endDateObj.format('DD MMM YYYY');
    if (formattedEndDate.toUpperCase() === formattedStartDate.toUpperCase())
      return formattedStartDate.toUpperCase();
    return (
      <>
        {formattedStartDate.toUpperCase()} <Translation>{(t) => t('to')}</Translation>{' '}
        {formattedEndDate.toUpperCase()}
      </>
    );
  }

  return formattedStartDate.toUpperCase();
}

export function getSelectedDatesAsText(startDateSpan, endDateSpan) {
  const startDate = dayjs(startDateSpan).format('DD MMM YYYY');

  if (!endDateSpan || startDateSpan === endDateSpan) {
    return startDate;
  }

  const endDate = dayjs(endDateSpan).format('DD MMM YYYY');

  return (
    <>
      {`${startDate}`}
      <Translation>{(t) => t('to')}</Translation>
      {`${endDate}`}
    </>
  );
}

export const searchDateFormatter = (date) => {
  if (date) {
    if (date.includes(',')) {
      return date.split(',');
    } else {
      return date;
    }
  }
};
