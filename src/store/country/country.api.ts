import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CountriesInfo } from '../../models/model'

export const countryApi = createApi({
  reducerPath: 'country/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rest-country-api.p.rapidapi.com/',
  }),
  endpoints: (build) => ({
    searchCountries: build.query<CountriesInfo[], string>({
      query: (search: string) => ({
        url: '',
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_SECRET_API_KEY,
        },
      }),
    }),
  }),
})

export const { useSearchCountriesQuery } = countryApi
