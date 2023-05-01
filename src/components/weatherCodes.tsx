const weatherCodes: { [key: string]: { en: string; pt: string } } = {
  '0': {
    en: 'Clear sky',
    pt: 'Céu limpo',
  },
  '1': {
    en: 'Mainly clear',
    pt: 'Predominantemente limpo',
  },
  '2': {
    en: 'Partly cloudy',
    pt: 'Parcialmente nublado',
  },
  '3': {
    en: 'Overcast',
    pt: 'Nublado',
  },
  '45': {
    en: 'Fog and depositing rime fog',
    pt: 'Névoa e nevoeiro depositando',
  },
  '48': {
    en: 'Fog and depositing rime fog',
    pt: 'Névoa e nevoeiro depositando',
  },
  '51': {
    en: 'Drizzle: Light intensity',
    pt: 'Chuvisco: intensidade fraca',
  },
  '53': {
    en: 'Drizzle: Moderate intensity',
    pt: 'Chuvisco: intensidade moderada',
  },
  '55': {
    en: 'Drizzle: Dense intensity',
    pt: 'Chuvisco: intensidade forte',
  },
  '56': {
    en: 'Freezing drizzle: Light intensity',
    pt: 'Chuvisco congelante: intensidade fraca',
  },
  '57': {
    en: 'Freezing drizzle: Dense intensity',
    pt: 'Chuvisco congelante: intensidade forte',
  },
  '61': {
    en: 'Rain: Slight intensity',
    pt: 'Chuva: intensidade fraca',
  },
  '63': {
    en: 'Rain: Moderate intensity',
    pt: 'Chuva: intensidade moderada',
  },
  '65': {
    en: 'Rain: Heavy intensity',
    pt: 'Chuva: intensidade forte',
  },
  '66': {
    en: 'Freezing rain: Light intensity',
    pt: 'Chuva congelante: intensidade fraca',
  },
  '67': {
    en: 'Freezing rain: Heavy intensity',
    pt: 'Chuva congelante: intensidade forte',
  },
  '71': {
    en: 'Snow fall: Slight intensity',
    pt: 'Neve: intensidade fraca',
  },
  '73': {
    en: 'Snow fall: Moderate intensity',
    pt: 'Neve: intensidade moderada',
  },
  '75': {
    en: 'Snow fall: Heavy intensity',
    pt: 'Neve: intensidade forte',
  },
  '77': {
    en: 'Snow grains',
    pt: 'Granizo',
  },
  '80': {
    en: 'Rain showers: Slight intensity',
    pt: 'Pancadas de chuva: intensidade leve',
  },
  '81': {
    en: 'Rain showers: Moderate intensity',
    pt: 'Pancadas de chuva: intensidade moderada',
  },
  '82': {
    en: 'Rain showers: Violent intensity',
    pt: 'Pancadas de chuva: intensidade violenta',
  },
  '85': {
    en: 'Snow showers slight',
    pt: 'Chuvas de neve: intensidade fraca',
  },
  '86': {
    en: 'Snow showers heavy',
    pt: 'Chuvas de neve: intensidade forte',
  },
  '95': {
    en: 'Thunderstorm: Slight or moderate',
    pt: 'Tempestade: intensidade fraca ou moderada',
  },
  '96': {
    en: 'Thunderstorm with slight hail',
    pt: 'Tempestade com granizo de intensidade fraca',
  },
  '99': {
    en: 'Thunderstorm with heavy hail',
    pt: 'Tempestade com granizo de intensidade forte',
  },
};

export const getWeather = (code: number | null | undefined) => {
  if (code === null || code === undefined) {
    return 'not defined';
  }
  return weatherCodes[code];
};
