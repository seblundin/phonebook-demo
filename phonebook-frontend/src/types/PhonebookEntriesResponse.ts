import { PhonebookEntry } from "./PhonebookEntry";

export interface PhonebookEntriesResponse {
  content: PhonebookEntry[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
