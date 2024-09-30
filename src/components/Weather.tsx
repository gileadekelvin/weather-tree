import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { City } from './types';
import ErrorAlert from './Error';
import { getWeather } from './weatherCodes';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { db } from '@/db';

type WeatherProps = {
  city: City;
};

type Weather = {
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
  };
};

const Weather = (props: WeatherProps) => {
  const { city } = props;

  const { isLoading, error, data } = useQuery({
    queryKey: ['weather', city],

    queryFn: async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      await db.cities.update(city.id, {
        lastTemperature: data.current_weather.temperature,
      });
      return data as Weather;
    },
  });

  if (error) return <ErrorAlert />;

  return (
    <Card className='mx-auto w-full min-w-[220px] md:max-w-sm'>
      <CardContent className='p-6 pr-2 pt-2'>
        <div className='flex items-start justify-between'>
          <div className='pt-4'>
            <h2 className='text-3xl font-bold'>
              {isLoading ? city.lastTemperature : data?.current_weather.temperature}°C
            </h2>
            <p className='text-md text-muted-foreground'>{`${city.name} - ${city.country}`}</p>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => db.cities.delete(city.id)}
            aria-label='Remove card'
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
        <div className='mt-1'>
          <p className='text-sm text-muted-foreground'>
            {[city.admin1, city.admin2, city.admin3].filter((n) => !!n).join(' / ')}
          </p>
          <div className='mt-1 text-base'>
            <Badge variant='outline'>
              {isLoading ? 'atualizando...' : getWeather(data?.current_weather.weathercode).pt}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Weather;
