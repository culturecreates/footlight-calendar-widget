import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Translation } from 'react-i18next';
import i18next from 'i18next';

dayjs.extend(utc);
dayjs.extend(timezone);

function isSameDay(date1, date2) {
  if (!date1 || !date2) return false;

  const day1 = date1.substring(8, 10);
  const day2 = date2.substring(8, 10);

  return day1 === day2;
}

export function dateRangeFormatter({ startDate, endDate, scheduleTimezone = 'Canada/Eastern' }) {
  // Check if the startdate has a time component by checking the format
  const hasStartTime = startDate.includes('T') || startDate.includes(' ');
  const isStartAndEndDaySame = isSameDay(startDate, endDate);
  const locale = i18next.language;

  const dateTimeFormat = locale === 'fr' ? 'DD MMM YYYY | HH:mm' : 'DD MMM YYYY | h:mm a';

  const startDateTimeObj = hasStartTime
    ? dayjs.utc(startDate).tz(scheduleTimezone)
    : dayjs(startDate);
  const noEndDateFlag = !endDate || endDate === '' || endDate == null;

  if (!startDateTimeObj.isValid()) {
    return 'Invalid date format';
  }

  // Format start date based on whether it has a time component
  const formattedStartDate = noEndDateFlag
    ? hasStartTime
      ? startDateTimeObj.format(dateTimeFormat)
      : startDateTimeObj.format('DD MMM YYYY')
    : startDateTimeObj.format('DD MMM YYYY');

  if (!noEndDateFlag) {
    // Check if the enddate has a time component by checking the format
    const hasEndTime = endDate.includes('T') || endDate.includes(' ');
    let endDateObj = hasEndTime ? dayjs.utc(endDate).tz(scheduleTimezone) : dayjs(endDate);

    if (!endDateObj.isValid()) {
      return 'Invalid end date format';
    }

    // Check if enddate is within 24 hours of startDateTimeObj
    const diffInHours = endDateObj.diff(startDateTimeObj, 'hour');
    const formattedStartDateTime = startDateTimeObj.format(dateTimeFormat);
    const formattedEndDate = endDateObj.format('DD MMM YYYY');

    // Check if startdate and enddate are on the same day
    if (isStartAndEndDaySame) {
      return formattedStartDateTime.toUpperCase();
    }

    if (diffInHours <= 24) {
      const formattedEndTime = endDateObj.format('hh:mm A');

      return formattedEndTime ? (
        <>
          {formattedStartDateTime.toUpperCase()} - {formattedEndTime}
          {<sup style={{ fontSize: 'smaller' }}>+1</sup>}
        </>
      ) : (
        formattedStartDateTime.toUpperCase()
      );
    }

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
