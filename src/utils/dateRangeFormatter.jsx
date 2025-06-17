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
function getDateFormat({ locale, hasTimeComponent, includeTimeComponent }) {
  const timeComponent = hasTimeComponent && includeTimeComponent ? getTimeFormat(locale) : '';
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

export function dateRangeFormatter({
  startDate,
  endDate,
  scheduleTimezone = 'Canada/Eastern',
  includeTimeComponent = true,
  upcomingSubEventCount,
}) {
  console.log(startDate, endDate);

  const locale = i18next.language;
  const dateFormat = getDateFormat({ locale, hasTimeComponent: false });

  const noEndDateFlag = !endDate || endDate === '' || endDate == null;

  if (noEndDateFlag) {
    const { hasTime: hasStartTime, dateTimeObj: startDateTimeObj } = getDateObject(
      startDate,
      scheduleTimezone,
    );

    if (!startDateTimeObj.isValid()) return 'Invalid date format';
    const formattedStartDate = startDateTimeObj.format(dateFormat);
    const formattedStartTime =
      hasStartTime && includeTimeComponent ? startDateTimeObj.format(getTimeFormat(locale)) : '';
    return (
      <>
        {formattedStartDate?.toUpperCase()}
        {formattedStartTime ? `  ${formattedStartTime}` : ''}
      </>
    );
  } else {
    const { hasTime: hasStartTime, dateTimeObj: startDateTimeObj } = getDateObject(
      startDate,
      scheduleTimezone,
    );
    const { dateTimeObj: endDateObj } = getDateObject(endDate, scheduleTimezone);

    if (!startDateTimeObj.isValid()) return 'Invalid start date format';
    if (!endDateObj.isValid()) return 'Invalid end date format';

    const formattedStartDate = startDateTimeObj.format(dateFormat);
    const formattedStartTime =
      hasStartTime && includeTimeComponent ? startDateTimeObj.format(getTimeFormat(locale)) : '';
    const formattedEndDate = endDateObj.format(dateFormat);

    if (formattedEndDate == formattedStartDate) {
      return (
        <>
          {formattedStartDate?.toUpperCase()} {' ' + formattedStartTime}{' '}
          {upcomingSubEventCount ? (
            <span style={{ textTransform: 'lowercase', marginLeft: '4px' }}>
              ({upcomingSubEventCount} <Translation>{(t) => t('occurrences')}</Translation>)
            </span>
          ) : null}
        </>
      );
    }

    const isSameCalendarDay = startDateTimeObj.isSame(endDateObj, 'day');
    const durationInHours = endDateObj.diff(startDateTimeObj, 'hour', true);
    const isOvernightShortEvent = !isSameCalendarDay && durationInHours < 24;

    if (isOvernightShortEvent) {
      return (
        <>
          {formattedStartDate?.toUpperCase()} {' ' + formattedStartTime}{' '}
        </>
      );
    }

    return (
      <>
        {formattedStartDate?.toUpperCase()} <Translation>{(t) => t('to')}</Translation>{' '}
        {formattedEndDate?.toUpperCase()}{' '}
        {upcomingSubEventCount ? (
          <span style={{ textTransform: 'lowercase', marginLeft: '4px' }}>
            ({upcomingSubEventCount} <Translation>{(t) => t('occurrences')}</Translation>)
          </span>
        ) : null}
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

export const findFirstUpcomingStartdate = (date, endDate) => {
  if (!date) return dayjs().format('YYYY-MM-DD');

  const givenDate = dayjs(date);
  const endDateObj = dayjs(endDate);
  const today = dayjs().startOf('day');

  const hasTime = /T\d{2}:\d{2}:\d{2}/.test(date);
  const hasOffset = /[+-]\d{2}:\d{2}|Z$/.test(date);

  if (endDate && givenDate.isBefore(today) && endDateObj.isAfter(today))
    return today.format('YYYY-MM-DD');
  else {
    if (hasTime && hasOffset) return givenDate.toISOString();
    else return givenDate.format('YYYY-MM-DD');
  }
};
