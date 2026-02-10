import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { alumniService } from "@/api/services";
import { queryKeys } from "@/types/api.types";
import { CreateAlumniRequest } from "@/types/dto";
import toast from "react-hot-toast";

/**
 * Get all alumni
 */
export const useAlumni = () => {
  return useQuery({
    queryKey: queryKeys.alumni.lists(),
    queryFn: alumniService.getAll,
  });
};

/**
 * Get alumni member by ID
 */
export const useAlumniMember = (
  id: number,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: queryKeys.alumni.detail(id),
    queryFn: () => alumniService.getById(id),
    enabled: options?.enabled !== false && !!id,
  });
};

/**
 * Get all former players
 */
export const useFormerPlayers = () => {
  return useQuery({
    queryKey: queryKeys.alumni.formerPlayers(),
    queryFn: alumniService.getAllFormerPlayers,
  });
};

/**
 * Get alumni by school ID
 */
export const useAlumniBySchool = (schoolId: number) => {
  return useQuery({
    queryKey: queryKeys.alumni.bySchool(schoolId),
    queryFn: () => alumniService.getBySchoolId(schoolId),
    enabled: !!schoolId,
  });
};

/**
 * Create new alumni
 */
export const useCreateAlumni = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (alumni: CreateAlumniRequest) => alumniService.create(alumni),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.alumni.all });
      toast.success("Alumni created successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create alumni: ${error.message}`);
    },
  });
};
