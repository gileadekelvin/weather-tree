import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { CommandLoading } from 'cmdk';

type CommandMenuProps = { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> };
type GeocodingResults = {
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

const ErrorAlert = () => {
  return (
    <div
      className='mb-4 flex rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400'
      role='alert'
    >
      <svg
        aria-hidden='true'
        className='mr-3 inline h-5 w-5 flex-shrink-0'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
          clipRule='evenodd'
        ></path>
      </svg>
      <span className='sr-only'>Info</span>
      <div>
        <span className='font-medium'>Error!</span> Change a few things up and try submitting again.
      </div>
    </div>
  );
};

const CommandMenu = (props: CommandMenuProps) => {
  const [search, setSearch] = useState('');
  const [searchDebounced] = useDebounce(search, 500);

  const { isLoading, error, data } = useQuery({
    queryKey: ['weather', searchDebounced],

    queryFn: async () => {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=10&language=en&format=json`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data as GeocodingResults;
    },
  });

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

  if (error) {
    return <ErrorAlert />;
  }

  return (
    <CommandDialog open={props.open} onOpenChange={props.setOpen}>
      <CommandInput placeholder='Search a new city...' value={search} onValueChange={setSearch} />
      <CommandList>
        {isLoading ? (
          <CommandLoading>
            <p className='p-2 text-sm text-gray-500'>loading...</p>
          </CommandLoading>
        ) : (data?.results?.length ?? 0) > 0 ? (
          <CommandGroup heading='Results'>
            {(data?.results?.length ?? 0) > 0 &&
              data?.results?.map((result) => (
                <CommandItem key={result.id} itemID={result.id.toString()}>
                  <div className='flex flex-col'>
                    <span className='text-sm text-gray-900'>
                      {`${result.name} - ${result.country}`}
                    </span>
                    <span className='text-xs text-gray-500'>
                      {[result.admin1, result.admin2, result.admin3].filter((n) => !!n).join(' / ')}
                    </span>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        ) : (
          <CommandEmpty>
            <p className='p-2 text-sm text-gray-500'>No results</p>
          </CommandEmpty>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;
