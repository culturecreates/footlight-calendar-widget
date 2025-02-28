import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Translation } from 'react-i18next';
import i18next from 'i18next';

dayjs.extend(utc);
dayjs.extend(timezone);

// Helper function to get time format based on locale
function getTimeFormat(locale) {
  switch (locale) {
    case 'fr':
      return 'HH:mm';
    case 'ja':
      return 'HH:mm';
    default:
      return 'h:mm a';
  }
}

// Helper function to get date format based on locale and time component
function getDateFormat({ locale, hasTimeComponent }) {
  const timeComponent = hasTimeComponent ? getTimeFormat(locale) : '';
  switch (locale) {
    case 'fr':
      return `DD MMM YYYY ${timeComponent}`;
    case 'ja':
      return `YYYY年MM月DD日 ${timeComponent}`;
    default:
      return `DD MMM YYYY ${timeComponent}`;
  }
}

// Helper function to parse a date string into a Day.js object
function getDateObject(date, scheduleTimezone) {
  // Check if the date has a time component by checking the format
  const hasTime = date.includes('T') || date.includes(' ');
  const dateTimeObj = hasTime ? dayjs.utc(date).tz(scheduleTimezone) : dayjs(date);
  return { hasTime, dateTimeObj };
}

export function dateRangeFormatter({ startDate, endDate, scheduleTimezone = 'Canada/Eastern' }) {
  const locale = i18next.language;
  const dateTimeFormat = getDateFormat({ locale, hasTimeComponent: true });
  const dateFormat = getDateFormat({ locale, hasTimeComponent: false });

  const { hasTime: hasStartTime, dateTimeObj: startDateTimeObj } = getDateObject(
    startDate,
    scheduleTimezone,
  );
  if (!startDateTimeObj.isValid()) return 'Invalid date format';

  const noEndDateFlag = !endDate || endDate === '' || endDate == null;

  // Format start date based on whether it has a time component
  let formattedStartDateTime;
  if (noEndDateFlag) {
    formattedStartDateTime = hasStartTime
      ? startDateTimeObj.format(dateTimeFormat)
      : startDateTimeObj.format(dateFormat);
    return formattedStartDateTime?.toUpperCase();
  } else {
    // Check if the enddate has a time component by checking the format
    const { dateTimeObj: endDateObj } = getDateObject(endDate, scheduleTimezone);
    formattedStartDateTime = startDateTimeObj.format(dateTimeFormat);
    const formattedEndTime = endDateObj.format(getTimeFormat(locale));
    const displayEndTime = formattedEndTime ? ` - ${formattedEndTime}` : '';
    const isStartAndEndTimeOnSameDay = dayjs(startDateTimeObj).isSame(endDateObj, 'day');

    if (!endDateObj.isValid()) return 'Invalid end date format';

    // overnight events
    const isOvernightEvent =
      endDateObj.diff(startDateTimeObj, 'hour') <= 24 && !isStartAndEndTimeOnSameDay;

    if (isOvernightEvent) {
      return (
        <>
          {formattedStartDateTime?.toUpperCase()}
          {displayEndTime}
          {isOvernightEvent && (
            <sup
              style={{
                fontSize: 'smaller',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '4px',
              }}
            >
              +1
            </sup>
          )}
        </>
      );
    }

    let formattedEndDate = endDateObj.format(dateTimeFormat);

    // if start and end dateTime is the same
    if (formattedEndDate?.toUpperCase() == formattedStartDateTime?.toUpperCase()) {
      return formattedStartDateTime;
    }
    if (isStartAndEndTimeOnSameDay) {
      return (
        <>
          {formattedStartDateTime?.toUpperCase()}
          {displayEndTime}
        </>
      );
    }

    formattedStartDateTime = startDateTimeObj.format(dateFormat);
    formattedEndDate = endDateObj.format(dateFormat);
    return (
      <>
        {formattedStartDateTime?.toUpperCase()} <Translation>{(t) => t('to')}</Translation>{' '}
        {formattedEndDate?.toUpperCase()}
      </>
    );
  }
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
