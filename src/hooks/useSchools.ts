import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { schoolService } from "@/api/services";
import { queryKeys } from "@/types/api.types";
import { CreateSchoolRequest } from "@/types/dto";
import toast from "react-hot-toast";

/**
 * Get school lookup data (for dropdowns)
 */
export const useSchoolLookup = () => {
  return useQuery({
    queryKey: queryKeys.schools.lookup(),
    queryFn: schoolService.getSchoolLookup,
  });
};

/**
 * Get school by ID
 */
export const useSchool = (schoolId: number) => {
  return useQuery({
    queryKey: queryKeys.schools.info(schoolId),
    queryFn: () => schoolService.getSchoolInfo(schoolId),
    enabled: !!schoolId,
  });
};

/**
 * Get characters by school
 */
export const useSchoolCharacters = (school: string) => {
  return useQuery({
    queryKey: queryKeys.schools.characters(school),
    queryFn: () => schoolService.getCharactersBySchool(school),
    enabled: !!school,
  });
};

/**
 * Get schools by prefecture
 */
export const useSchoolsByPrefecture = (prefecture: string) => {
  return useQuery({
    queryKey: queryKeys.schools.byPrefecture(prefecture),
    queryFn: () => schoolService.getSchoolsByPrefecture(prefecture),
    enabled: !!prefecture,
  });
};

/**
 * Create a new school
 */
export const useCreateSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (school: CreateSchoolRequest) =>
      schoolService.createSchool(school),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.schools.all });
      toast.success("School created successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create school: ${error.message}`);
    },
  });
};

/**
 * Delete a school
 */
export const useDeleteSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (schoolId: number) => schoolService.deleteSchool(schoolId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.schools.all });
      toast.success("School deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete school: ${error.message}`);
    },
  });
};
