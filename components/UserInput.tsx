'use client'
import { usePlayerStore } from "@/store/useGameStore";
import { ChangeEvent, useCallback } from "react";

export default function UserInput() {
  const { name, setPlayerName } = usePlayerStore();
  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  }, [])
  return <input name='username' type="text" className="border border-1 border-gray-400 text-gray-900" defaultValue={name} onChange={handleOnChange}/>;
}
