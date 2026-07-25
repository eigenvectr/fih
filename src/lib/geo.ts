const R = 3440.065;

export function haversineNm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

const CRUISE_KNOTS = 24;

export function runMinutes(nm: number): number {
  return Math.max(2, Math.round((nm / CRUISE_KNOTS) * 60 * 1.25));
}

export function formatDistance(nm: number): string {
  const mi = nm * 1.15078;
  return mi < 10 ? `${mi.toFixed(1)} mi` : `${Math.round(mi)} mi`;
}
