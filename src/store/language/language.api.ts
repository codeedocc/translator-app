import { TranslatedResponse } from '../../models/model'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const languageApi = createApi({
  reducerPath: 'language/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://text-translator2.p.rapidapi.com/',
  }),
  endpoints: (build) => ({
    getTranslate: build.mutation<
      TranslatedResponse,
      { from: string; to: string; text: string }
    >({
      query: ({ from, to, text }) => ({
        url: 'translate',
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': import.meta.env.VITE_SECRET_API_KEY,
        },
        body: new URLSearchParams({
          source_language: from,
          target_language: to,
          text,
        }).toString(),
      }),
    }),
  }),
})

export const { useGetTranslateMutation } = languageApi
