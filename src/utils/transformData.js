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
        performer,
        organizer,
        additionalType,
        discipline,
        inLanguage,
        offers,
        subEventDetails,
        supporter,
        eventStatus,
        eventAttendanceMode,
        keywords,
        video,
        imageGallery,
      } = eventData || {};

      const place = Array.isArray(location) ? location[0] || {} : location;
      const { address = {}, geo = {} } = place;
      const { addressLocality, streetAddress } = address;
      const { latitude, longitude, url } = geo;

      const imageCredit = (() => {
        const entries = ['description', 'caption', 'creditText']
          .map((key) => [key, getLocalized(image?.[key], locale)])
          .filter(([, value]) => value); // Remove falsy values (null, undefined, '')

        return entries.length > 0 ? Object.fromEntries(entries) : undefined;
      })();
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
        image: { thumbnail: image?.thumbnail, original: image?.original, large: image?.large },
        imageCredit,
        place: getLocalized(place?.name, locale),
        city: getLocalized(addressLocality, locale),
        streetAddress: getLocalized(streetAddress, locale),
        latitude,
        longitude,
        mapUrl: url,
        eventTypes: additionalType?.map((type) => getLocalized(type?.name, locale)),
        disciplines: discipline?.map((d) => getLocalized(d?.name, locale)),
        languages: inLanguage?.map((lang) => getLocalized(lang?.name, locale)),
        performers: performer?.map(({ name, image, socialMediaLinks, type, url, description }) => ({
          name: getLocalized(name, locale),
          image,
          socialMediaLinks,
          type,
          website: url,
          description: getLocalized(description, locale),
        })),
        organizers: organizer?.map(({ name, logo, socialMediaLinks, type, url }) => ({
          name: getLocalized(name, locale),
          logo: logo?.thumbnail,
          socialMediaLinks,
          type,
          website: url,
        })),
        sponsor: supporter?.map(({ name, logo, socialMediaLinks, type, url, image }) => ({
          name: getLocalized(name, locale),
          logo: logo?.thumbnail,
          socialMediaLinks,
          type,
          website: url,
          image: image?.thumbnail,
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
        video,
        imageGallery: imageGallery?.filter((image) => image?.thumbnail),
      });
    }) || []
  );
};
