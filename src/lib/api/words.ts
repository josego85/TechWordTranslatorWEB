import { apiClient } from "./client";
import type { Word, WordWithTranslations, PaginatedResponse } from "@/types";

/**
 * Fetch paginated list of words with translations
 */
export const getWords = async (
  page = 1,
  search = "",
): Promise<PaginatedResponse<WordWithTranslations>> => {
  const params = new URLSearchParams({ page: page.toString() });
  if (search) {
    params.append("search", search);
  }
  return apiClient(`/words?${params.toString()}`);
};

// GET /words/:id
export const getWord = async (id: number): Promise<WordWithTranslations> => {
  return apiClient(`/words/${id}`);
};

// POST /words (requires auth)
export const createWord = async (
  data: { word: string },
  token: string,
): Promise<Word> => {
  return apiClient("/words", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

// PUT /words/:id (requires auth)
export const updateWord = async (
  id: number,
  data: { word: string },
  token: string,
): Promise<Word> => {
  return apiClient(`/words/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

// DELETE /words/:id (requires auth)
export const deleteWord = async (id: number, token: string): Promise<void> => {
  return apiClient(`/words/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
