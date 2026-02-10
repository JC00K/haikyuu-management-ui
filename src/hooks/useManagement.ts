import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { managementService } from "@/api/services";
import { queryKeys } from "@/types/api.types";
import { CreateManagementRequest } from "@/types/dto";
import { ManagementRole } from "@/types/enums";
import toast from "react-hot-toast";

/**
 * Get all management
 */
export const useManagement = () => {
  return useQuery({
    queryKey: queryKeys.management.lists(),
    queryFn: managementService.getAll,
  });
};

/**
 * Get management member by ID
 */
export const useManagementMember = (
  id: number,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: queryKeys.management.detail(id),
    queryFn: () => managementService.getById(id),
    enabled: options?.enabled !== false && !!id,
  });
};

/**
 * Get management by school ID
 */
export const useManagementBySchool = (schoolId: number) => {
  return useQuery({
    queryKey: queryKeys.management.bySchool(schoolId),
    queryFn: () => managementService.getBySchoolId(schoolId),
    enabled: !!schoolId,
  });
};

/**
 * Get management by role
 */
export const useManagementByRole = (role: ManagementRole) => {
  return useQuery({
    queryKey: queryKeys.management.byRole(role),
    queryFn: () => managementService.getByRole(role),
    enabled: !!role,
  });
};

/**
 * Create new management member
 */
export const useCreateManagement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (management: CreateManagementRequest) =>
      managementService.create(management),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.management.all });
      toast.success("Management member created successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create management member: ${error.message}`);
    },
  });
};
