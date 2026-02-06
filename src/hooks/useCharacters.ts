import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { characterService } from "@/api/services";
import { queryKeys } from "@/types/api.types";
import { CharacterSearchParams } from "@/types/dto";
import { Role, Year } from "@/types/enums";
import toast from "react-hot-toast";

/**
 * Get all characters
 */
export const useCharacters = () => {
  return useQuery({
    queryKey: queryKeys.characters.lists(),
    queryFn: characterService.getAll,
  });
};

/**
 * Get character by ID
 */
export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: queryKeys.characters.detail(id),
    queryFn: () => characterService.getById(id),
    enabled: !!id,
  });
};

/**
 * Get characters by age
 */
export const useCharactersByAge = (age: number) => {
  return useQuery({
    queryKey: queryKeys.characters.byAge(age),
    queryFn: () => characterService.getByAge(age),
    enabled: !!age,
  });
};

/**
 * Get characters by year
 */
export const useCharactersByYear = (year: Year) => {
  return useQuery({
    queryKey: queryKeys.characters.byYear(year),
    queryFn: () => characterService.getByYear(year),
    enabled: !!year,
  });
};

/**
 * Get characters by role
 */
export const useCharactersByRole = (role: Role) => {
  return useQuery({
    queryKey: queryKeys.characters.byRole(role),
    queryFn: () => characterService.getByRole(role),
    enabled: !!role,
  });
};

/**
 * Get characters by school
 */
export const useCharactersBySchool = (school: string) => {
  return useQuery({
    queryKey: queryKeys.characters.bySchool(school),
    queryFn: () => characterService.getBySchool(school),
    enabled: !!school,
  });
};

/**
 * Search characters by year and role
 */
export const useSearchCharacters = (params: CharacterSearchParams) => {
  return useQuery({
    queryKey: [...queryKeys.characters.all, "search", params],
    queryFn: () => characterService.searchByYearAndRole(params),
    enabled: !!(params.year || params.role),
  });
};

/**
 * Assign year to character
 */
export const useAssignYear = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, year }: { id: number; year: Year }) =>
      characterService.assignYear(id, year),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.characters.all });
      toast.success("Year assigned successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to assign year: ${error.message}`);
    },
  });
};

/**
 * Assign school to character
 */
export const useAssignSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, school }: { id: number; school: string }) =>
      characterService.assignSchool(id, school),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.characters.all });
      toast.success("School assigned successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to assign school: ${error.message}`);
    },
  });
};

/**
 * Assign age to character
 */
export const useAssignAge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, age }: { id: number; age: number }) =>
      characterService.assignAge(id, age),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.characters.all });
      toast.success("Age assigned successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to assign age: ${error.message}`);
    },
  });
};
