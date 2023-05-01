import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { City } from './types';
import ErrorAlert from './Error';
import { getWeather } from './weatherCodes';

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
      return data as Weather;
    },
  });

  if (isLoading) return <>Loading...</>;

  if (error) return <ErrorAlert />;

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row items-center justify-center gap-8'>
        <h2 className='text-5xl font-bold'>{data?.current_weather.temperature}°C</h2>
        <div className='gap flex flex-col'>
          <span className='text-sm text-gray-900'>{`${city.name} - ${city.country}`}</span>
          <span className='text-xs text-gray-500'>
            {[city.admin1, city.admin2, city.admin3].filter((n) => !!n).join(' / ')}
          </span>
          <div>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Badge variant='outline'>
                    {getWeather(data?.current_weather.weathercode).en}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getWeather(data?.current_weather.weathercode).pt}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
