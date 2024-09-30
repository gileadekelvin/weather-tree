import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CommandMenu from '@/components/CommandMenu';
import Weather from '@/components/Weather';
import { db } from './db';
import { useLiveQuery } from 'dexie-react-hooks';

const App = () => {
  const [open, setOpen] = useState(false);

  const cities = useLiveQuery(async () => {
    const cities = await db.cities.reverse().sortBy('lastTemperature');
    return cities;
  });

  return (
    <main className='mx-auto flex h-screen max-w-5xl flex-col items-center gap-4 py-16'>
      <h1 className='text-4xl font-bold'>
        E esse <del>calor</del> frio?
      </h1>
      <div className='flex w-[400px] items-center rounded-lg border px-3' cmdk-input-wrapper=''>
        <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
        <Input
          className='w-full border-none p-0'
          placeholder='Buscar uma cidade...'
          onFocus={() => {
            setOpen(true);
          }}
        />
      </div>
      <div className='grid w-full grid-cols-1 gap-4 px-1 md:grid-cols-2 lg:grid-cols-4'>
        {cities?.map((city) => (
          <Weather city={city} key={city.id} />
        ))}
      </div>
      <CommandMenu
        open={open}
        setOpen={setOpen}
        setCity={async (city) => {
          const id = await db.cities.add(city);
          console.log(id);
        }}
      />
    </main>
  );
};

export default App;
