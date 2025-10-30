export interface Location {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  isCurrent?: boolean;
}

export interface WeatherData {
  temp: number;
  feelslike?: number;
  condition: string;
  icon: string;
  humidity: number;
  wind: number;
  wind_degree?: number;
  wind_dir?: string;
  location: string;
  country: string;
  localtime: string;
  uv?: number;
  is_day?: boolean;
  last_updated?: string;
  [key: string]: any;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    avgvis_km: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
    is_moon_up: number;
    is_sun_up: number;
  };
  hour: Array<{
    time_epoch: number;
    time: string;
    temp_c: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    windchill_c: number;
    heatindex_c: number;
    dewpoint_c: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
    vis_km: number;
    gust_kph: number;
    uv: number;
  }>;
  [key: string]: any;
}

export interface WeatherApiResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: WeatherData;
  forecast: {
    forecastday: ForecastDay[];
  };
  alerts?: {
    alert: any[];
  };
}
