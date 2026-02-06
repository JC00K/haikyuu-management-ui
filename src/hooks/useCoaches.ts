import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coachService } from "@/api/services";
import { queryKeys } from "@/types/api.types";
import { CreateCoachRequest } from "@/types/dto";
import toast from "react-hot-toast";

/**
 * Get all coaches
 */
export const useCoaches = () => {
  return useQuery({
    queryKey: queryKeys.coaches.lists(),
    queryFn: coachService.getAll,
  });
};

/**
 * Create a new coach
 */
export const useCreateCoach = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (coach: CreateCoachRequest) => coachService.create(coach),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.coaches.all });
      toast.success("Coach created successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create coach: ${error.message}`);
    },
  });
};
