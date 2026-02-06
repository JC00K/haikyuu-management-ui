import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fanService } from "@/api/services";
import { queryKeys } from "@/types/api.types";
import { CreateFanRequest } from "@/types/dto";
import toast from "react-hot-toast";

/**
 * Get all fans
 */
export const useFans = () => {
  return useQuery({
    queryKey: queryKeys.fans.lists(),
    queryFn: fanService.getAll,
  });
};

/**
 * Create a new fan
 */
export const useCreateFan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fan: CreateFanRequest) => fanService.create(fan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.fans.all });
      toast.success("Fan created successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create fan: ${error.message}`);
    },
  });
};
