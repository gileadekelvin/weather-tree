export type GeocodingResults = {
  results?: {
    id: number;
    name: string;
    country: string;
    admin1?: string;
    admin2?: string;
    admin3?: string;
    latitude: number;
    longitude: number;
  }[];
};

export type City = NonNullable<GeocodingResults['results']>[number];
