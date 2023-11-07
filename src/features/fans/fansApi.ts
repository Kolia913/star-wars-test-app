import {createApi} from '@reduxjs/toolkit/query/react';
import httpBaseQuery from '../../utils/HttpClient/HttpBaseQuery';
import {FansListResponse} from '../../interfaces/Fans/FansListResponse';
import {WorldsDetails} from '../../interfaces/Worlds/WorldsDetails';
import {SpeciesDetails} from '../../interfaces/Species/SpeciesDetails';
import {FansDetails} from '../../interfaces/Fans/FansDetails';

interface FansQueryPayload {
  page: number;
}

interface FanQueryPayload {
  id: string;
}

interface WorldQueryPayload {
  id: string;
}

interface SpecieQueryPayload {
  id: string;
}

export const fansApi = createApi({
  reducerPath: 'fans',
  baseQuery: httpBaseQuery(),
  tagTypes: ['fans', 'fan', 'world', 'specie'],
  endpoints: builder => ({
    getFans: builder.query<FansListResponse, FansQueryPayload>({
      query: ({page = 1}) => ({url: `people/?page=${page}`, method: 'get'}),
      providesTags: ['fans'],
    }),
    getFan: builder.query<FansDetails, FanQueryPayload>({
      query: ({id}) => {
        console.log(id);

        return {url: `people/${id}`, method: 'get'};
      },
      providesTags: ['fan'],
    }),
    getWorld: builder.query<WorldsDetails, WorldQueryPayload>({
      query: ({id}) => ({url: `planets/${id}`, method: 'get'}),
      providesTags: ['world'],
    }),
    getSpecie: builder.query<SpeciesDetails, SpecieQueryPayload>({
      query: ({id}) => ({url: `species/${id}`, method: 'get'}),
      providesTags: ['specie'],
    }),
  }),
});

export const {
  useGetFansQuery,
  useLazyGetFanQuery,
  useLazyGetSpecieQuery,
  useLazyGetWorldQuery,
} = fansApi;
