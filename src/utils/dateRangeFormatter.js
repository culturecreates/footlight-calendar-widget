import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Translation } from 'react-i18next';
import i18next from 'i18next';

dayjs.extend(utc);
dayjs.extend(timezone);

export function dateRangeFormatter({ startDate, endDate, scheduleTimezone = 'Canada/Eastern' }) {
  // Check if the startdate has a time component by checking the format
  const hasStartTime = startDate.includes('T') || startDate.includes(' ');
  const isStartAndEndDaySame = dayjs(startDate).isSame(dayjs(endDate), 'day');

  const locale = i18next.language;

  const dateTimeFormat =
    locale === 'fr'
      ? 'DD MMM YYYY | HH:mm'
      : locale === 'ja'
        ? 'YYYY年MM月DD日 HH:mm'
        : 'DD MMM YYYY | h:mm a';

  const dateFormat =
    locale === 'fr' ? 'DD MMM YYYY' : locale === 'ja' ? 'YYYY年MM月DD日 ' : 'DD MMM YYYY';

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
      : startDateTimeObj.format(dateFormat)
    : startDateTimeObj.format(dateFormat);

  if (!noEndDateFlag) {
    // Check if the enddate has a time component by checking the format
    const hasEndTime = endDate.includes('T') || endDate.includes(' ');
    let endDateObj = hasEndTime ? dayjs.utc(endDate).tz(scheduleTimezone) : dayjs(endDate);

    if (!endDateObj.isValid()) {
      return 'Invalid end date format';
    }

    // Check if enddate is within 24 hours of startDateTimeObj
    const diffInHours = endDateObj.diff(startDateTimeObj, 'hour');
    const formattedStartDateTime = startDateTimeObj.format(dateFormat);
    const formattedEndDate = endDateObj.format(dateFormat);

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

export const searchDateFormatter = (date) => {
  if (date) {
    if (date.includes(',')) {
      return date.split(',');
    } else {
      return date;
    }
  }
};
