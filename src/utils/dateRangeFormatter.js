import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function dateRangeFormatter(startdate, enddate) {
  const startDateObj = dayjs(startdate).tz('Canada/Eastern');

  if (!startDateObj.isValid()) {
    return 'Invalid date format';
  }

  const formattedStartDate = startDateObj.format('DD MMM YYYY');

  if (enddate) {
    let endDateObj = '';
    if (enddate.includes('T')) {
      endDateObj = dayjs(enddate).tz('Canada/Eastern');
    } else {
      endDateObj = dayjs(enddate).endOf('day').tz('Canada/Eastern');
    }

    if (!endDateObj.isValid()) {
      return 'Invalid end date format';
    }

    const formattedEndDate = endDateObj.format('DD MMM YYYY');
    if (formattedEndDate.toUpperCase() === formattedStartDate.toUpperCase())
      return formattedStartDate.toUpperCase();
    return `${formattedStartDate.toUpperCase()} to ${formattedEndDate.toUpperCase()}`;
  }

  return formattedStartDate.toUpperCase();
}
