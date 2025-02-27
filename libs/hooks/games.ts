import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRoom,
  getRealTimeRooms,
  getRooms,
  joinRoom,
} from "../firebase/dbService";
import { useEffect } from "react";
import { Player } from "../models/player";

export const useGames = () => {
  return useQuery({
    queryKey: ["games"],
    queryFn: getRooms,
  });
};

export const useGameRealTime = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const unsubscribe = getRealTimeRooms((rooms) => {
      queryClient.setQueryData(["games"], rooms);
    });
    return () => unsubscribe();
  }, [queryClient]);
  return useQuery({
    queryKey: ["games"],
    queryFn: getRooms,
    staleTime: Infinity, // Empêche le re-fetch automatique
    initialData: [],
    gcTime: Infinity, // Évite la suppression du cache
  });
};

export const useCreateGame = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return createRoom({
        createdAt: new Date(),
        players: [],
        status: "waiting",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
};

export const useJoinRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      roomId,
      player,
    }: {
      roomId: string;
      player?: Player;
    }) => {
      await joinRoom(roomId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};
