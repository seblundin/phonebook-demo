import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PhonebookEntry } from "../types";

const baseUrl = import.meta.env.VITE_API_URL!;

export const phonebookApi = createApi({
  reducerPath: "phonebookApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["PhonebookEntry"],
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getEntries: builder.query<PhonebookEntry[], void>({
      query: () => "/",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "PhonebookEntry" as const,
                id,
              })),
              { type: "PhonebookEntry", id: "LIST" },
            ]
          : [{ type: "PhonebookEntry", id: "LIST" }],
    }),
    addEntry: builder.mutation<PhonebookEntry, PhonebookEntry>({
      query: (newEntry) => ({
        url: "/",
        method: "POST",
        body: newEntry,
      }),
      invalidatesTags: [{ type: "PhonebookEntry", id: "LIST" }],
    }),
  }),
});

export const { useLazyGetEntriesQuery } = phonebookApi;
