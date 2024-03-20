import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function dateRangeFormatter(startdate, enddate) {
  const startDateObj = dayjs(startdate);

  if (!startDateObj.isValid()) {
    return 'Invalid date format';
  }

  const formattedStartDate = startDateObj.format('DD MMM YYYY');

  if (enddate) {
    let endDateObj = '';
    if (enddate.includes('T')) {
      endDateObj = dayjs(enddate);
    } else {
      endDateObj = dayjs(enddate).endOf('day');
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

export const searchDateFormatter = (date) => {
  if (date) {
    if (date.includes(',')) {
      return date.split(',');
    } else {
      return date;
    }
  }
};
