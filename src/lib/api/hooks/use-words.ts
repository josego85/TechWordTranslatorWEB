"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWord,
  deleteWord,
  getWord,
  getWords,
  updateWord,
} from "../words";

// Query keys
export const wordKeys = {
  all: ["words"] as const,
  lists: () => [...wordKeys.all, "list"] as const,
  list: (page: number, search?: string) =>
    [...wordKeys.lists(), page, search] as const,
  details: () => [...wordKeys.all, "detail"] as const,
  detail: (id: number) => [...wordKeys.details(), id] as const,
};

// Get all words (paginated)
export function useWords(page = 1, search = "") {
  return useQuery({
    queryKey: wordKeys.list(page, search),
    queryFn: () => getWords(page, search),
  });
}

// Get single word
export function useWord(id: number) {
  return useQuery({
    queryKey: wordKeys.detail(id),
    queryFn: () => getWord(id),
    enabled: !!id,
  });
}

// Create word mutation
export function useCreateWord(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { word: string }) => createWord(data, token),
    onSuccess: () => {
      // Invalidate and refetch words list
      queryClient.invalidateQueries({ queryKey: wordKeys.lists() });
    },
  });
}

// Update word mutation
export function useUpdateWord(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { word: string } }) =>
      updateWord(id, data, token),
    onSuccess: (_, variables) => {
      // Invalidate specific word and list
      queryClient.invalidateQueries({
        queryKey: wordKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: wordKeys.lists() });
    },
  });
}

// Delete word mutation
export function useDeleteWord(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteWord(id, token),
    onSuccess: () => {
      // Invalidate words list
      queryClient.invalidateQueries({ queryKey: wordKeys.lists() });
    },
  });
}
