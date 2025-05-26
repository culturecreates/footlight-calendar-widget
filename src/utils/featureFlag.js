function checkFeatureFlag(flag) {
  if (flag === 'true') return true;
  else return false;
}

export const featureFlags = {
  relatedEvents: checkFeatureFlag(import.meta.env.VITE_APP_FEATURE_FLAG_RELATED_EVENTS),
  mapPreview: checkFeatureFlag(import.meta.env.VITE_APP_FEATURE_FLAG_MAP_PREVIEW),
  buyTicketsButton: checkFeatureFlag(import.meta.env.VITE_APP_FEATURE_FLAG_BUY_TICKETS_BUTTON),
};
