import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseUrl } from './api';

interface CreateAdminRequestBody {
  email: string;
  password: string;
}

interface CreateAdminResponse {
  password: string;
  is_active: boolean;
  secret: string;
  email: string;
  id: number;
  admin_role: boolean;
}

interface LoginAdminRequestBody {
  email: string;
  password: string;
}

interface LoginAdminResponse {
  message: string;
  secret: {
    password: string;
    is_active: boolean;
    secret: string;
    email: string;
    id: number;
    admin_role: boolean;
  };
}

interface CreateBirthdayRequestBody {
  file: File;
  name: string;
  dob: string; // format: 'YYYY-MM-DD'
  department: string;
  level: string;
  school: string;
  note: string;
}

interface CreateCourseRequestBody {
  name: string;
  short_name: string;
  school_id: number;
  level_id: number;
  semester: string;
}
interface CreateTopicRequestBody {
    file: File;
    file2?: File;
    file3?: File;
    file4?: File;
    file5?: File;
    title: string;
    content: string;
    free: boolean;
    course_id: number;
  }
  
  interface GeneratePinRequestBody {
    level: number;
    num_digits: number;
    num_pins: number;
    semester: string;
  }
// Flexible interface to handle unknown keys
interface GenericResponse {
  [key: string]: string;
}

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
  }),
  endpoints: (builder) => ({
    createAdmin: builder.mutation<CreateAdminResponse, CreateAdminRequestBody>({
      query: (body) => ({
        url: '/admina/create-admin',
        method: 'POST',
        body,
      }),
    }),
    loginAdmin: builder.mutation<LoginAdminResponse, LoginAdminRequestBody>({
      query: (body) => ({
        url: '/admina/login-admin',
        method: 'POST',
        body,
      }),
    }),
    createBirthday: builder.mutation<GenericResponse, { secret: string; data: CreateBirthdayRequestBody }>({
      query: ({ secret, data }) => ({
        url: `/admina/create-birthday?secret=${secret}`,
        method: 'POST',
        body: data,
      }),
    }),
    createCourse: builder.mutation<GenericResponse, { secret: string; data: CreateCourseRequestBody }>({
      query: ({ secret, data }) => ({
        url: `/admina/create-course?secret=${secret}`,
        method: 'POST',
        body: data,
      }),
    }),
    viewAllCourses: builder.query<GenericResponse, { secret: string }>({
      query: ({ secret }) => `/admina/all-courses?secret=${secret}`,
    }),
    viewAllSchools: builder.query<GenericResponse, { secret: string }>({
      query: ({ secret }) => `/admina/all-schools?secret=${secret}`,
    }),
    createTopic: builder.mutation<GenericResponse, { secret: string; data: CreateTopicRequestBody }>({
        query: ({ secret, data }) => ({
          url: `/admina/create-topic?secret=${secret}`,
          method: 'POST',
          body: data,
        }),
      }),
      generatePin: builder.mutation<GenericResponse, { secret: string; data: GeneratePinRequestBody }>({
        query: ({ secret, data }) => ({
          url: `/admina/generate-pin?secret=${secret}`,
          method: 'POST',
          body: data,
        }),
      }),
  }),
});

export const {
  useCreateAdminMutation,
  useLoginAdminMutation,
  useCreateBirthdayMutation,
  useCreateCourseMutation,
  useViewAllCoursesQuery,
  useViewAllSchoolsQuery,
  useCreateTopicMutation,
  useGeneratePinMutation,
} = adminApi;
