import Dexie, { type EntityTable } from 'dexie';
import { City } from './components/types';

const db = new Dexie('CitiesDatabase') as Dexie & {
  cities: EntityTable<
    City,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  cities: 'id, name, country, admin1, admin2, admin3, latitude, longitude, lastTemperature',
});

export type { City };
export { db };
