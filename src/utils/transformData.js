import { getLocalized } from './getLocalized';

export const transformData = ({ data, locale }) => {
  return (
    data?.map((eventData) => {
      const {
        id,
        name,
        slug,
        description,
        scheduleTimezone,
        startDate,
        startDateTime,
        endDate,
        endDateTime,
        image,
        location = {},
        performers = [],
        additionalType = [],
        subEventDetails = {},
      } = eventData;

      // Determine place object
      const place = Array.isArray(location)
        ? location.find(({ type }) => type === 'Place' || type === 'VirtualLocation') || {}
        : location;

      // Extract address details
      const { address = {} } = place;
      const { addressLocality, streetAddress } = address;

      return {
        id,
        title: getLocalized(name, locale),
        slug: getLocalized(slug, locale),
        description: getLocalized(description, locale),
        scheduleTimezone,
        startDate:
          subEventDetails.upcomingSubEventCount === 0
            ? startDate || startDateTime || ''
            : subEventDetails.nextUpcomingSubEventDateTime ||
              subEventDetails.nextUpcomingSubEventDate ||
              '',
        endDate: endDate || endDateTime || '',
        image: image?.thumbnail || '',
        place: getLocalized(place.name, locale),
        city: getLocalized(addressLocality, locale),
        streetAddress: getLocalized(streetAddress, locale),
        eventTypes: additionalType.map((type) => getLocalized(type?.name, locale)),
        performers: performers.map(({ name, image }) => ({
          name: getLocalized(name, locale),
          image: image?.thumbnail || '',
        })),
      };
    }) || []
  );
};
