import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CommandMenu from '@/components/CommandMenu';
import Weather from '@/components/Weather';
import { City } from '@/components/types';

const App = () => {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState<City | null>(null);

  return (
    <main className='mx-auto flex h-screen max-w-5xl flex-col items-center gap-4 py-64'>
      <h1 className='text-4xl font-bold'>Weather tree</h1>
      <div className='flex w-[400px] items-center rounded-lg border px-3' cmdk-input-wrapper=''>
        <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
        <Input
          className='w-full border-none p-0'
          placeholder='Search a new city...'
          onFocus={() => {
            setOpen(true);
          }}
        />
      </div>
      <CommandMenu open={open} setOpen={setOpen} setCity={setCity} />
      {city && <Weather city={city} />}
    </main>
  );
};

export default App;
