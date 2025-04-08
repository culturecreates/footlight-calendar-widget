function checkFeatureFlag(flag) {
  if (flag === 'true') return true;
  else return false;
}

export const featureFlags = {
  relatedEvents: checkFeatureFlag(process.env.REACT_APP_FEATURE_FLAG_RELATED_EVENTS),
  mapPreview: checkFeatureFlag(process.env.REACT_APP_FEATURE_FLAG_MAP_PREVIEW),
};
