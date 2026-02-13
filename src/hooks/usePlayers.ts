import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { playerService } from "@/api/services";
import { queryKeys } from "@/types/api.types";
import { CreatePlayerRequest } from "@/types/dto";
import { Position, Year } from "@/types/enums";
import toast from "react-hot-toast";

/**
 * Get all players
 */
export const usePlayers = () => {
  return useQuery({
    queryKey: queryKeys.players.lists(),
    queryFn: playerService.getAllPlayers,
  });
};

/**
 * Get player by ID
 */
export const usePlayer = (id: number, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.players.detail(id),
    queryFn: () => playerService.getById(id),
    enabled: options?.enabled !== false && !!id,
  });
};

/**
 * Get players by position
 */
export const usePlayersByPosition = (position: Position) => {
  return useQuery({
    queryKey: queryKeys.players.byPosition(position),
    queryFn: () => playerService.getByPosition(position),
    enabled: !!position,
  });
};

/**
 * Get players by jersey number
 */
export const usePlayersByJerseyNumber = (jerseyNumber: number) => {
  return useQuery({
    queryKey: queryKeys.players.byJerseyNumber(jerseyNumber),
    queryFn: () => playerService.getByJerseyNumber(jerseyNumber),
    enabled: !!jerseyNumber,
  });
};

/**
 * Get players by year and position
 */
export const usePlayersByYearAndPosition = (year: Year, position: Position) => {
  return useQuery({
    queryKey: [...queryKeys.players.all, "yearAndPosition", year, position],
    queryFn: () => playerService.getByYearAndPosition(year, position),
    enabled: !!(year && position),
  });
};

/**
 * Get players with height greater than specified value
 */
export const usePlayersByHeightGreaterThan = (height: number) => {
  return useQuery({
    queryKey: [...queryKeys.players.all, "heightGreaterThan", height],
    queryFn: () => playerService.getByHeightGreaterThan(height),
    enabled: !!height,
  });
};

/**
 * Get players with height less than specified value
 */
export const usePlayersByHeightLessThan = (height: number) => {
  return useQuery({
    queryKey: [...queryKeys.players.all, "heightLessThan", height],
    queryFn: () => playerService.getByHeightLessThan(height),
    enabled: !!height,
  });
};

/**
 * Create a new player
 */
export const useCreatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (player: CreatePlayerRequest) =>
      playerService.createPlayer(player),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
      toast.success("Player created successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create player: ${error.message}`);
    },
  });
};
