import { useState } from 'react';
import { Input } from '@/components/ui/input';
import CommandMenu from '@/components/CommandMenu';

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <main className='mx-auto flex h-screen max-w-5xl flex-col items-center gap-4 py-64'>
      <h1 className='text-4xl font-bold'>Weather tree</h1>
      <div className='w-[300px]'>
        <Input
          className='w-full'
          placeholder='Search a new city...'
          onFocus={() => {
            setOpen(true);
          }}
        />
      </div>
      <CommandMenu open={open} setOpen={setOpen} />
    </main>
  );
};

export default App;
