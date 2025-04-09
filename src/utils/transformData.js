import { entityTypes } from '../constants/generalConstants';
import { findFirstUpcomingStartdate } from './dateRangeFormatter';
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

const imageSelector = ({ logo, image, type }) => {
  if (type === entityTypes.ORGANIZATION) return logo?.thumbnail || image?.thumbnail || '';
  if (type === entityTypes.PERSON) return image?.thumbnail || logo?.thumbnail || '';
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
        url: eventUrl,
        facebookUrl,
      } = eventData || {};

      const place = Array.isArray(location) ? location[0] || {} : location;
      const { address = {}, geo = {} } = place;
      const { addressLocality, streetAddress, addressRegion, addressCountry, postalCode } = address;
      const { latitude, longitude, url } = geo;
      const startDateOfSubEvent =
        Object.keys(subEventDetails || {}).length != 0 && subEventDetails?.upcomingSubEventCount
          ? subEventDetails?.nextUpcomingSubEventDateTime
          : subEventDetails?.nextUpcomingSubEventDate;

      const processedEndDate =
        Object.keys(subEventDetails || {}).length != 0 &&
        subEventDetails?.upcomingSubEventCount == 1
          ? subEventDetails?.nextUpcomingSubEventDateTime ||
            subEventDetails?.nextUpcomingSubEventDate
          : endDateTime || endDate;

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
        startDate: startDateOfSubEvent || findFirstUpcomingStartdate(startDate || startDateTime),
        endDate: processedEndDate,
        image: { thumbnail: image?.thumbnail, original: image?.original, large: image?.large },
        imageCredit,
        place: getLocalized(place?.name, locale),
        city: getLocalized(addressLocality, locale),
        streetAddress: getLocalized(streetAddress, locale),
        latitude,
        longitude,
        eventUrl,
        facebookUrl,
        mapUrl: url,
        eventTypes: additionalType?.map((type) => getLocalized(type?.name, locale)),
        disciplines: discipline?.map((d) => getLocalized(d?.name, locale)),
        languages: inLanguage?.map((lang) => getLocalized(lang?.name, locale)),
        performers: performer?.map(
          ({ name, image, socialMediaLinks, type, logo, url, description, occupation, id }) => ({
            name: getLocalized(name, locale),
            id,
            image: imageSelector({ image, logo, type }),
            socialMediaLinks,
            type,
            occupation,
            website: url,
            description: getLocalized(description, locale),
          }),
        ),
        organizers: organizer?.map(({ name, logo, image, socialMediaLinks, type, url }) => ({
          name: getLocalized(name, locale),
          image: imageSelector({ image, logo, type }),
          socialMediaLinks,
          type,
          website: url,
        })),
        sponsor: supporter?.map(({ name, logo, socialMediaLinks, type, url, image }) => ({
          name: getLocalized(name, locale),
          socialMediaLinks,
          type,
          website: url,
          image: imageSelector({ image, logo, type }),
        })),
        offers: offers?.map(({ name, price = 0, priceCurrency, url, type, additionalType }) => ({
          name: getLocalized(name, locale),
          price,
          currency: priceCurrency,
          url,
          type,
          additionalType,
        })),
        eventStatus,
        eventAttendanceMode,
        keywords,
        video,
        imageGallery: imageGallery?.filter((image) => image?.thumbnail),
        postalCode,
        addressCountry: getLocalized(addressCountry, locale),
        addressRegion: getLocalized(addressRegion, locale),
      });
    }) || []
  );
};
