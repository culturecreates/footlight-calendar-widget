export function dateRangeFormatter(startdate, enddate) {
  const startDateObj = new Date(startdate);

  if (isNaN(startDateObj)) {
    return 'Invalid date format';
  }

  const formattedStartDate = startDateObj.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  if (enddate) {
    const endDateObj = new Date(enddate);

    if (isNaN(endDateObj)) {
      return 'Invalid end date format';
    }

    const formattedEndDate = endDateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return `${formattedStartDate.toUpperCase()} to ${formattedEndDate.toUpperCase()}`;
  }

  return formattedStartDate.toUpperCase();
}
