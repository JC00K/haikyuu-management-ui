import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { rosterService } from "@/api/services";
import { queryKeys } from "@/types/api.types";
import { Position } from "@/types/enums";
import toast from "react-hot-toast";

/**
 * Get all rosters
 */
export const useRosters = () => {
  return useQuery({
    queryKey: queryKeys.rosters.all,
    queryFn: rosterService.getAll,
  });
};

/**
 * Get roster by ID
 */
export const useRoster = (rosterId: number) => {
  return useQuery({
    queryKey: queryKeys.rosters.detail(rosterId),
    queryFn: () => rosterService.getById(rosterId),
    enabled: !!rosterId,
  });
};

/**
 * Get roster players
 */
export const useRosterPlayers = (rosterId: number) => {
  return useQuery({
    queryKey: queryKeys.rosters.players(rosterId),
    queryFn: () => rosterService.getPlayers(rosterId),
    enabled: !!rosterId,
  });
};

/**
 * Get roster coaches
 */
export const useRosterCoaches = (rosterId: number) => {
  return useQuery({
    queryKey: queryKeys.rosters.coaches(rosterId),
    queryFn: () => rosterService.getCoaches(rosterId),
    enabled: !!rosterId,
  });
};

/**
 * Get roster management
 */
export const useRosterManagement = (rosterId: number) => {
  return useQuery({
    queryKey: queryKeys.rosters.management(rosterId),
    queryFn: () => rosterService.getManagement(rosterId),
    enabled: !!rosterId,
  });
};

/**
 * Get roster players by position
 */
export const useRosterPlayersByPosition = (
  rosterId: number,
  position: Position,
) => {
  return useQuery({
    queryKey: queryKeys.rosters.playersByPosition(rosterId, position),
    queryFn: () => rosterService.getPlayersByPosition(rosterId, position),
    enabled: !!(rosterId && position),
  });
};

/**
 * Add player to roster
 */
export const useAddPlayerToRoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      rosterId,
      playerId,
    }: {
      rosterId: number;
      playerId: number;
    }) => rosterService.addPlayer(rosterId, playerId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.rosters.detail(variables.rosterId),
      });
      toast.success("Player added to roster!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to add player: ${error.message}`);
    },
  });
};

/**
 * Add coach to roster
 */
export const useAddCoachToRoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      rosterId,
      coachId,
    }: {
      rosterId: number;
      coachId: number;
    }) => rosterService.addCoach(rosterId, coachId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.rosters.detail(variables.rosterId),
      });
      toast.success("Coach added to roster!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to add coach: ${error.message}`);
    },
  });
};

/**
 * Add management to roster
 */
export const useAddManagementToRoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      rosterId,
      managementId,
    }: {
      rosterId: number;
      managementId: number;
    }) => rosterService.addManagement(rosterId, managementId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.rosters.detail(variables.rosterId),
      });
      toast.success("Management member added to roster!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to add management member: ${error.message}`);
    },
  });
};

/**
 * Remove character from roster
 */
export const useRemoveCharacterFromRoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      rosterId,
      characterId,
    }: {
      rosterId: number;
      characterId: number;
    }) => rosterService.removeCharacter(rosterId, characterId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.rosters.detail(variables.rosterId),
      });
      toast.success("Character removed from roster!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to remove character: ${error.message}`);
    },
  });
};
