export const API_KEYS = {
  GOOGLE_MAPS: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  // Other API keys can go here
} as const;

export const MAP_CONFIG = {
  ID: process.env.NEXT_PUBLIC_MAP_ID!,
  // Other map configs can go here
} as const;
