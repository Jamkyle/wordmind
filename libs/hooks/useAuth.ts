import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { usePlayerStore } from "@/store/useGameStore";
import { randomName } from "../utils/playerUtils";

export const useAuthListener = () => {
  const setPlayerName = usePlayerStore((state) => state.setPlayerName);
  const setPlayerId = usePlayerStore((state) => state.setPlayerId);

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setPlayerName(user.displayName || randomName());
        setPlayerId(user.uid);
      }
    });
  }, [setPlayerName, setPlayerId]);
};
