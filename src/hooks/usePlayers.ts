import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { playerService } from "@/api/services";
import { queryKeys } from "@/types/api.types";

export const usePlayers = () => {
  return useQuery({
    queryKey: queryKeys.players.lists(),
    queryFn: playerService.getAllPlayers,
  });
};

export const useCreatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: playerService.createPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
    },
  });
};
