import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Translation } from 'react-i18next';

dayjs.extend(utc);
dayjs.extend(timezone);

export function dateRangeFormatter(startdate, enddate, scheduleTimezone = 'Canada/Eastern') {
  // Check if the startdate has a time component by checking the format
  const hasStartTime = startdate.includes('T') || startdate.includes(' ');

  const startDateTimeObj = hasStartTime
    ? dayjs.utc(startdate).tz(scheduleTimezone)
    : dayjs(startdate);
  const noEndDateFlag = !enddate || enddate === '' || enddate == null;

  if (!startDateTimeObj.isValid()) {
    return 'Invalid date format';
  }

  // Format start date based on whether it has a time component
  const formattedStartDate = noEndDateFlag
    ? hasStartTime
      ? startDateTimeObj.format('DD MMM YYYY - h:mm a')
      : startDateTimeObj.format('DD MMM YYYY')
    : startDateTimeObj.format('DD MMM YYYY');

  if (!noEndDateFlag) {
    // Check if the startdate has a time component by checking the format
    const hasEndTime = enddate.includes('T') || enddate.includes(' ');
    let endDateObj = hasEndTime ? dayjs.utc(enddate).tz(scheduleTimezone) : dayjs(enddate);
    if (!endDateObj.isValid()) {
      return 'Invalid end date format';
    }

    // Check if startdate and enddate are on the same day
    if (startDateTimeObj.isSame(endDateObj, 'day')) {
      const formattedStartDateTime = startDateTimeObj.format('DD MMM YYYY - h:mm a');
      // const formattedEndTime = endDateObj.format('h:mm a');

      // if (startDateTimeObj.isSame(endDateObj, 'minute')) {
      return formattedStartDateTime.toUpperCase();
      // }

      // return (
      //   <>
      //     {formattedStartDateTime.toUpperCase()} <Translation>{(t) => t('to')}</Translation>{' '}
      //     {formattedEndTime.toUpperCase()}
      //   </>
      // );
    }

    const formattedEndDate = endDateObj.format('DD MMM YYYY');
    if (formattedEndDate.toUpperCase() === formattedStartDate.toUpperCase()) {
      return formattedStartDate.toUpperCase();
    }
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
