export interface CountriesInfo {
  name: Name
  tld: string[]
  cca2: string
  ccn3: string
  cca3: string
  cioc: string
  fifa: string
  independent: boolean | null
  status: Status
  unMember: boolean
  currencies: any[] | { [key: string]: Currency }
  idd: Idd
  capital: string[]
  altSpellings: string[]
  region: Region
  subregion: string
  continents: Continent[]
  languages: { [key: string]: string }
  translations: { [key: string]: Translation }
  latlng: number[]
  landlocked: boolean
  borders: string[]
  area: number
  flag: string
  demonyms: Demonyms
  flags: string[]
  population: number
  maps: Maps
  gini: { [key: string]: number }
  car: Car
  timezones: Array<null | string>
  postal: string
}

export interface Car {
  signs: string[]
  side: Side
}

export enum Side {
  Left = 'left',
  Right = 'right',
}

export enum Continent {
  Africa = 'Africa',
  Antarctica = 'Antarctica',
  Asia = 'Asia',
  Europe = 'Europe',
  NorthAmerica = 'North America',
  Oceania = 'Oceania',
  SouthAmerica = 'South America',
}

export interface Currency {
  name: string
  symbol: string
}

export interface Demonyms {
  eng: Eng
  fra: Eng
}

export interface Eng {
  f: string
  m: string
}

export interface Idd {
  root: Root
  suffixes: string[]
}

export enum Root {
  Empty = '',
  The1 = '+1',
  The2 = '+2',
  The3 = '+3',
  The4 = '+4',
  The5 = '+5',
  The6 = '+6',
  The7 = '+7',
  The8 = '+8',
  The9 = '+9',
}

export interface Maps {
  googleMaps: string
  openStreetMaps: string
}

export interface Name {
  common: string
  official: string
  nativeName: { [key: string]: Translation }
}

export interface Translation {
  official: string
  common: string
}

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Antarctic = 'Antarctic',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}

export enum Status {
  OfficiallyAssigned = 'officially-assigned',
  UserAssigned = 'user-assigned',
}

export interface TranslatedResponse {
  status: string
  data: Data
}

export interface Data {
  translatedText: string
}

export interface CountryList {
  value: string
  label: string
  flag: string
}

export interface ChosenCountry {
  from: CountryList
  to: CountryList
}

export interface LanguagesResponse {
  data: Data
}

export interface Data {
  languages: Language[]
}

export interface Language {
  code: string
  name: string
}

export interface FavText {
  title: string
  word: string
  translatedWord: string
  from: string
  to: string
  id: number
  added: boolean
}

export interface History {
  word: string
  translatedWord: string
  from: string
  to: string
  id: number
}
