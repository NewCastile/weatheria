import { SetStateAction, Dispatch } from "react";

export interface IForecastLoaderData {
  weather: IForecast;
  unitSymbol: string;
}

export interface ISuggestion {
  name: string;
  country: string;
  state: string;
}

export interface IWeatherThemeContextProps {
  theme: any;
  setTheme: Dispatch<SetStateAction<any>>;
}

export interface IForecast {
  cod: string;
  message: number;
  cnt: number;
  list: IHourForecast[];
  city: ICity;
}

export interface ICity {
  id: number;
  name: string;
  coord: ICoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ICoord {
  lat: number;
  lon: number;
}

export interface IHourForecast {
  dt: number;
  main: IMain;
  weather: IWeather[];
  clouds: IClouds;
  wind: IWind;
  visibility: number;
  pop: number;
  sys: ISys;
  dt_txt: string;
}

export interface IClouds {
  all: number;
}

export interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface ISys {
  pod: string;
}

export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWind {
  speed: number;
  deg: number;
  gust: number;
}
