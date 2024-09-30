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

import { City, GeocodingResults } from './types';
import ErrorAlert from './Error';

type CommandMenuProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCity: (city: City) => void;
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
      <CommandInput placeholder='Buscar uma cidade...' value={search} onValueChange={setSearch} />
      <CommandList>
        {isLoading ? (
          <CommandLoading>
            <p className='p-2 text-sm text-gray-500'>loading...</p>
          </CommandLoading>
        ) : (data?.results?.length ?? 0) > 0 ? (
          <CommandGroup heading='Results'>
            {(data?.results?.length ?? 0) > 0 &&
              data?.results?.map((result) => (
                <CommandItem
                  value={result.id.toString()}
                  key={result.id}
                  onSelect={() => {
                    props.setCity(result);
                    props.setOpen(false);
                  }}
                >
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
            <p className='p-2 text-sm text-gray-500'>Sem resultados</p>
          </CommandEmpty>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;
