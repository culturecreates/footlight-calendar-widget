import { getLocalized } from './getLocalized';

// Helper function to remove empty values
const removeEmptyKeys = (obj) => {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value != null) {
      // Remove null & undefined
      result[key] = value;
    }
  }
  return result;
};

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
        location,
        performers,
        organizers,
        additionalType,
        discipline,
        inLanguage,
        offers,
        subEventDetails,
        eventStatus,
        eventAttendanceMode,
        keywords,
      } = eventData || {};

      const place = Array.isArray(location) ? location[0] || {} : location;
      const { address = {}, geo = {} } = place;
      const { addressLocality, streetAddress } = address;
      const { latitude, longitude } = geo;

      return removeEmptyKeys({
        id,
        title: getLocalized(name, locale),
        slug: getLocalized(slug, locale),
        description: getLocalized(description, locale),
        scheduleTimezone,
        startDate:
          subEventDetails?.upcomingSubEventCount === 0
            ? startDate || startDateTime
            : subEventDetails?.nextUpcomingSubEventDateTime ||
              subEventDetails?.nextUpcomingSubEventDate,
        endDate: endDate || endDateTime,
        image: image?.thumbnail,
        place: getLocalized(place?.name, locale),
        city: getLocalized(addressLocality, locale),
        streetAddress: getLocalized(streetAddress, locale),
        latitude,
        longitude,
        eventTypes: additionalType?.map((type) => getLocalized(type?.name, locale)),
        disciplines: discipline?.map((d) => getLocalized(d?.name, locale)),
        languages: inLanguage?.map((lang) => getLocalized(lang?.name, locale)),
        performers: performers?.map(({ name, image }) => ({
          name: getLocalized(name, locale),
          image,
        })),
        organizers: organizers?.map(({ name, image }) => ({
          name: getLocalized(name, locale),
          image,
        })),
        offers: offers?.map(({ name, price = 0, priceCurrency, url }) => ({
          name: getLocalized(name, locale),
          price,
          currency: priceCurrency,
          url,
        })),
        eventStatus,
        eventAttendanceMode,
        keywords,
      });
    }) || []
  );
};
