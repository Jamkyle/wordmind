import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoom, getRealTimeRooms, getRooms } from "../firebase/dbService";
import { useEffect } from "react";
import {
  addPlayerToRoom,
  listenToPlayers,
  setPlayerReady,
} from "../firebase/playerService";
import { generateRoom } from "../entities/game";
import {
  useGameStore,
  usePlayersStore,
  usePlayerStore,
} from "@/store/useGameStore";
import { signIn } from "../firebase/authService";
import {
  startGameIfReady,
  startNewGame,
  submitGuess,
  subscribeToGame,
} from "../firebase/gameService";
import { randomWordToGuess } from "../utils/gameUtils";

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
      return createRoom(generateRoom());
    },
    onSuccess: (game) => {
      queryClient.invalidateQueries({ queryKey: ["games", "players"] });
      return game;
    },
  });
};

export const useJoinRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ roomId }: { roomId: string }) => {
      console.log("try to join room", roomId);
      return await addPlayerToRoom(roomId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms", "players"] });
    },
    onError: (error) => {
      console.error("Failed to join room:", error);
    },
  });
};

export const usePlayerRealTime = (roomId: string) => {
  const setPlayers = usePlayersStore((state) => state.setPlayers);
  useEffect(() => {
    const unsubscribe = listenToPlayers(roomId, (players) => {
      setPlayers(roomId, players);
    });
    return () => unsubscribe();
  }, [roomId, setPlayers]);
};

export const useTogglePlayerReady = () => {
  const toggleLocalReady = usePlayerStore((state) => state.toggleLocalReady);
  const markPlayerReady = usePlayersStore((state) => state.markPlayerReady);
  const setGameStatus = useGameStore((state) => state.setGameStatus);
  const playerId = usePlayerStore((state) => state.id);

  return useMutation({
    mutationKey: ["players", playerId],
    mutationFn: async ({ roomId }: { roomId: string }) => {
      if (!playerId) {
        return;
      }
      const newReadyState = await setPlayerReady(roomId, playerId);
      if (newReadyState) await startGameIfReady(roomId);
      return newReadyState;
    },
    onSuccess: (newReadyState, { roomId }) => {
      if (!playerId) {
        return;
      }
      toggleLocalReady();
      markPlayerReady(roomId, playerId);
      if (newReadyState) setGameStatus("ready");
    },
  });
};

export const useAnonymousLogin = () => {
  const setPlayerName = usePlayerStore((state) => state.setPlayerName);
  const setPlayerId = usePlayerStore((state) => state.setPlayerId);

  return useMutation({
    mutationFn: async (username: string) => {
      const user = await signIn({ username });
      return { id: user?.uid, name: username };
    },
    onSuccess: ({ id, name }) => {
      setPlayerName(name);
      if (id) {
        setPlayerId(id);
      }
    },
  });
};

export const useSubmitGuess = () => {
  return useMutation({
    mutationFn: async ({
      roomId,
      guess,
    }: {
      roomId: string;
      guess: string;
    }) => {
      return await submitGuess(roomId, guess);
    },
    onError: (error) => {
      console.error("Failed to submit guess:", error);
    },
  });
};

export const useGameStart = () => {
  const setGameData = useGameStore((state) => state.setGameData);

  return useMutation({
    mutationFn: async ({ roomId }: { roomId: string }) => {
      return await startNewGame(roomId, await randomWordToGuess());
    },
  });
};

export const useSyncGame = (roomId: string) => {
  const setGameData = useGameStore((state) => state.setGameData);
  const gameStatus = useGameStore((state) => state.status);
  useEffect(() => {
    const unsubscribe = subscribeToGame(roomId, (newData) => {
      if (newData.status !== gameStatus) {
        setGameData(newData);
      }
    });

    return () => unsubscribe(); // ✅ Clean up listener on unmount
  }, [roomId]);
};
