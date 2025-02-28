/**
 * Ensures Google Analytics (gtag.js) is loaded.
 * If gtag.js is not found on the parent page, this function loads it.
 * @param {string} gtagId - The Google Analytics Measurement ID.
 */
export const initGoogleAnalytics = (gtagId) => {
  if (typeof window.gtag === 'function') return;

  const hasExistingGA = window.dataLayer?.some(
    (entry) => entry[0] === 'config' && entry[1]?.startsWith('G-'),
  );

  if (hasExistingGA || !gtagId) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', gtagId);
  };
};

/**
 * Sends an event to Google Analytics with the `footlight_` prefix.
 * @param {string} eventName - The event name.
 * @param {object} eventParams - Additional parameters.
 */
export const sendGAEvent = (eventName, eventParams) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', `footlight_${eventName}`, {
      event_category: 'Footlight Widget',
      ...eventParams,
    });
  }
};

const getEventUri = (eventId) => `http://lod.footlight.io/resource/${eventId}`;

export const trackListEvents = (calendarSlug) => {
  sendGAEvent('list_events', {
    calendar_slug: calendarSlug,
    parent_url: window.location.href,
    query_string: window.location.search,
  });
};

export const trackListShare = (calendarSlug, queryString, socialMedia) => {
  sendGAEvent('list_share', {
    calendar_slug: calendarSlug,
    parent_url: window.location.href,
    query_string: queryString,
    social_media: socialMedia,
  });
};

export const trackEventClick = (calendarSlug, eventId) => {
  sendGAEvent('event_click', {
    calendar_slug: calendarSlug,
    parent_url: window.location.href,
    event_uri: getEventUri(eventId),
  });
};

export const trackEventShare = (calendarSlug, eventId, socialMedia) => {
  sendGAEvent('event_share', {
    calendar_slug: calendarSlug,
    parent_url: window.location.href,
    event_uri: getEventUri(eventId),
    social_media: socialMedia,
  });
};

export const trackArtistUrl = (calendarSlug, eventId, artistUrl) => {
  sendGAEvent('artist_url', {
    calendar_slug: calendarSlug,
    parent_url: window.location.href,
    event_uri: getEventUri(eventId),
    artist_url: artistUrl,
  });
};
