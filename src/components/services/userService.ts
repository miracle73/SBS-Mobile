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

interface RectifyRequestBody {
  phone_imei: string | null;
  role: string;
  school_id: number | null;
}

interface RectifyResponse {
  status: string;
  message: {
    phone_imei: string;
    role: string;
    school_id: number;
    is_active: boolean;
    id: number;
  };
}

interface SchoolsLevelsCoursesResponse {
  id: number;
  name: string;
  short_name: string;
  levels: string[];
  courses: string[];
}

interface Birthday {
  image_url: string;
  dob: string;
  school: string;
  name: string;
  id: number;
  department: string;
  level: string;
  note: string;
}

interface ActivateRequestBody {
  phone_imei: string | null;
  pin: string;
}
// Flexible interface to handle unknown keys 
interface ActivateResponse {
  [key: string]: string;
}

interface SearchTopicsInCoursesRequestBody {
  course_id: number;
  level_id: number;
  school_id: number;
}

interface SearchTopicsInCoursesResponse {
  status: string;
  topics: {
    id: number;
    title: string;
    free: boolean;
  }[];
}

// Flexible interface to handle unknown keys in topic content response
interface TopicContentResponse {
  [key: string]: string;
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
    rectifyUser: builder.mutation<RectifyResponse, RectifyRequestBody>({
      query: (body) => ({
        url: '/user/rectify',
        method: 'POST',
        body,
      }),
    }),
    getSchoolLevelsCourses: builder.query<SchoolsLevelsCoursesResponse, { phone_imei: string | null }>({
      query: ({ phone_imei }) => `/user/schools-levels-courses?phone_imei=${phone_imei}`,
    }),
    getBirthdays: builder.query<Birthday[], void>({
      query: () => '/user/birthdays',
    }),
    activateUser: builder.mutation<ActivateResponse, ActivateRequestBody>({
      query: (body) => ({
        url: '/useractivate',
        method: 'POST',
        body,
      }),
    }),
    searchTopicsInCourses: builder.mutation<SearchTopicsInCoursesResponse, SearchTopicsInCoursesRequestBody>({
      query: (body) => ({
        url: '/user/search-topics-in-courses',
        method: 'POST',
        body,
      }),
    }),
    getTopicContent: builder.mutation<TopicContentResponse, { phone_imei: string | null; topic_id: number }>({
      query: ({ phone_imei, topic_id }) => ({
        url: `/user/get-topic-content?phone_imei=${phone_imei}&topic_id=${topic_id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetSchoolsQuery,
  useRectifyUserMutation,
  useGetSchoolLevelsCoursesQuery,
  useGetBirthdaysQuery,
  useActivateUserMutation,
  useSearchTopicsInCoursesMutation,
  useGetTopicContentMutation,
} = userApi;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { BaseUrl } from './api';

// interface School {
//   name: string;
//   id: number;
//   short_name: string;
// }

// interface SchoolsResponse {
//   status: string;
//   result: School[];
// }

// export const userApi = createApi({
//   reducerPath: 'userApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: BaseUrl,
//   }),
//   endpoints: (builder) => ({
//     getSchools: builder.query<SchoolsResponse, void>({
//       query: () => '/user/schools',
//     }),
//   }),
// });

// export const { useGetSchoolsQuery } = userApi;
