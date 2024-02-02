import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function dateRangeFormatter(startdate, enddate) {
  const startDateObj = dayjs(startdate).tz('Canada/Eastern'); // Parse without timezone and then convert

  if (!startDateObj.isValid()) {
    return 'Invalid date format';
  }

  const formattedStartDate = startDateObj.format('DD MMM YYYY');

  if (enddate) {
    const endDateObj = dayjs(enddate).endOf('day').tz('Canada/Eastern'); // Set to end of day and then convert

    if (!endDateObj.isValid()) {
      return 'Invalid end date format';
    }

    const formattedEndDate = endDateObj.format('DD MMM YYYY');
    return `${formattedStartDate.toUpperCase()} to ${formattedEndDate.toUpperCase()}`;
  }

  return formattedStartDate.toUpperCase();
}
