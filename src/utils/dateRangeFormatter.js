import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Translation } from 'react-i18next';

dayjs.extend(utc);
dayjs.extend(timezone);

export function dateRangeFormatter(startdate, enddate, scheduleTimezone) {
  const startDateTimeObj = dayjs.tz(startdate, scheduleTimezone);
  const noEndDateFlag = !enddate || enddate == '' || enddate == null;

  if (!startDateTimeObj.isValid()) {
    return 'Invalid date format';
  }

  const formattedStartDate = noEndDateFlag
    ? startDateTimeObj.format('DD MMM YYYY - h:mm a')
    : startDateTimeObj.format('DD MMM YYYY');

  if (!noEndDateFlag) {
    let endDateObj = '';
    if (enddate.includes('T')) {
      endDateObj = dayjs(enddate);
    } else {
      endDateObj = dayjs(enddate).endOf('day');
    }

    if (!endDateObj.isValid()) {
      console.log(endDateObj);
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

export const searchDateFormatter = (date) => {
  if (date) {
    if (date.includes(',')) {
      return date.split(',');
    } else {
      return date;
    }
  }
};
