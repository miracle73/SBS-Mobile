import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseUrl } from './api';

interface School {
  name: string;
  id: number;
  short_name: string;
}

interface SchoolsResponse {
  status: string;
  result: School[];
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
  }),
  endpoints: (builder) => ({
    getSchools: builder.query<SchoolsResponse, void>({
      query: () => '/user/schools',
    }),
  }),
});

export const { useGetSchoolsQuery } = userApi;
