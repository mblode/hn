export const REFRESH_THRESHOLD = 64;
export const INDICATOR_HEIGHT = 48;
export const MAX_PULL_DISTANCE = 112;
const PULL_RESISTANCE = 0.4;

/** Rubber-band a raw finger delta so ~160px of drag reaches the refresh threshold. */
export const dampenPull = (dy: number): number => {
  if (dy <= 0) {
    return 0;
  }
  return Math.min(dy * PULL_RESISTANCE, MAX_PULL_DISTANCE);
};

export const shouldRefresh = (distance: number): boolean =>
  distance >= REFRESH_THRESHOLD;
