import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PhonebookEntry } from "../types";
import { PhonebookEntriesResponse } from "../types/PhonebookEntriesResponse";

const baseUrl = import.meta.env.VITE_API_URL!;

export const phonebookApi = createApi({
  reducerPath: "phonebookApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["PhonebookEntries"],
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getEntries: builder.query<
      PhonebookEntriesResponse,
      { page: number; size: number }
    >({
      query: ({ page, size }) => `/api/phonebook?page=${page}&size=${size}`,
      providesTags: () => ["PhonebookEntries"],
    }),
    addEntry: builder.mutation<PhonebookEntry, Partial<PhonebookEntry>>({
      query: (newEntry) => ({
        url: "/api/phonebook",
        method: "POST",
        body: newEntry,
      }),
      invalidatesTags: ["PhonebookEntries"],
    }),
    deleteEntry: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/phonebook/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => ["PhonebookEntries"],
    }),
  }),
});

export const {
  useLazyGetEntriesQuery,
  useAddEntryMutation,
  useDeleteEntryMutation,
} = phonebookApi;
