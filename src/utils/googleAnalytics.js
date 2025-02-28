/**
 * Ensures Google Analytics (gtag.js) is loaded.
 * If gtag.js is not found on the parent page, this function loads it.
 * @param {string} gtagId - The Google Analytics Measurement ID.
 */
export const initGoogleAnalytics = (gtagId) => {
  console.log('[GA] Initializing Google Analytics...');

  if (typeof window.gtag === 'function') {
    console.log('[GA] gtag.js already loaded on the parent page.');
    return;
  }

  // Check if GA is already configured in window.dataLayer
  const hasExistingGA = window.dataLayer?.some(
    (entry) => entry[0] === 'config' && entry[1]?.startsWith('G-'),
  );

  if (hasExistingGA) {
    console.log('[GA] Using existing GA setup from parent page.');
    return;
  }

  if (!gtagId) {
    console.warn('[GA] No gtag ID provided, and no existing GA found. Events will not be tracked.');
    return;
  }

  if (!hasExistingGA && gtagId) {
    console.log(`[GA] Injecting Google Analytics script for ID: ${gtagId}`);

    // Inject Google Analytics script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
    document.head.appendChild(script);

    script.onload = () => {
      console.log('[GA] gtag.js script loaded successfully.');

      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };

      window.gtag('js', new Date());
      window.gtag('config', gtagId);

      console.log(`[GA] gtag.js initialized with ID: ${gtagId}`);
    };

    script.onerror = () => {
      console.error('[GA] Failed to load gtag.js script.');
    };
  }
};

/**
 * Sends an event to Google Analytics with the `footlight_` prefix.
 * @param {string} eventName - The event name.
 * @param {object} eventParams - Additional parameters.
 * @param {boolean} debug - If true, logs the event details.
 */
export const sendGAEvent = (eventName, eventParams) => {
  console.log(`[GA] Preparing to send event: footlight_${eventName}`, eventParams);

  if (typeof window.gtag === 'function') {
    const eventData = {
      event_category: 'Footlight Widget',
      ...eventParams,
    };
    console.log(window.gtag);
    window.gtag('event', `footlight_${eventName}`, eventData);
    console.log(`[GA] Event sent: footlight_${eventName}`, eventData);
  } else {
    console.warn(`[GA] gtag.js not found: Event "footlight_${eventName}" not sent.`);
  }
};

// ---------------- Event Tracking Functions ---------------- //

export const trackListEvents = (calendarSlug) => {
  console.log(`[GA] Tracking list events for: ${calendarSlug}`);
  sendGAEvent('list_events', {
    calendar_slug: calendarSlug,
    parent_url: window.location.href,
    query_string: window.location.search,
  });
};

export const trackListShare = (calendarSlug, queryString, socialMedia) => {
  console.log(`[GA] Tracking list share: ${calendarSlug} - ${socialMedia}`);
  sendGAEvent('list_share', {
    calendar_slug: calendarSlug,
    parent_url: window.location.href,
    query_string: queryString,
    social_media: socialMedia,
  });
};

const getEventUri = (eventId) => `http://lod.footlight.io/resource/${eventId}`;

export const trackEventClick = (calendarSlug, eventId) => {
  console.log(`[GA] Tracking event click: ${calendarSlug} - ${eventId}`);

  sendGAEvent('event_click', {
    calendar_slug: calendarSlug,
    parent_url: window.location.href,
    event_uri: getEventUri(eventId),
  });
};

export const trackEventShare = (calendarSlug, eventId, socialMedia) => {
  console.log(
    `[GA] Tracking event share: ${calendarSlug} - ${getEventUri(eventId)} - ${socialMedia}`,
  );

  sendGAEvent('event_share', {
    calendar_slug: calendarSlug,
    parent_url: window.location.href,
    event_uri: getEventUri(eventId),
    social_media: socialMedia,
  });
};

export const trackArtistUrl = (calendarSlug, eventId, artistUrl) => {
  console.log(`[GA] Tracking artist URL: ${calendarSlug} - ${getEventUri(eventId)} - ${artistUrl}`);

  sendGAEvent('artist_url', {
    calendar_slug: calendarSlug,
    parent_url: window.location.href,
    event_uri: getEventUri(eventId),
    artist_url: artistUrl,
  });
};
