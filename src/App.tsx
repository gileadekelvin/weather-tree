import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';

type CommandMenuProps = { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> };
const CommandMenu = (props: CommandMenuProps) => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        props.setOpen((open) => !open);
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandDialog open={props.open} onOpenChange={props.setOpen}>
      <CommandInput placeholder='Search a new city...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Results'>
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

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
