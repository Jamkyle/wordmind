"use client";
import GameBoard from "@/components/GameBoard";
import PlayerList from "@/components/PlayerList";
import { useGameStart, useSyncGame, useTogglePlayerReady } from "@/libs/hooks/games";
import { useGameStore, usePlayerStore } from "@/store/useGameStore";
import { useParams } from "next/navigation";
import { useCallback } from "react";

export default function Games() {
  const { id } = useParams();
  const isReady = usePlayerStore(state => state.isReady);
  const setPlayerReady = useTogglePlayerReady();
  useSyncGame(id as string)
  const room = useGameStore()
  const startGame = useGameStart()

  const onReadyClick = useCallback(() => {
    if(id) {
      setPlayerReady?.mutate({ roomId: id as string})
    }
  }, [id, setPlayerReady])

  const handleStartGame = useCallback(() => {
    startGame.mutate({roomId: id as string})
  }, [id, startGame])

  return (
    <main className="flex flex-col items-center justify-center">
      <h1>Games</h1>
      {!room ? <span>Loading...</span> : <span>{id}</span>}
      {room ? <PlayerList roomId={id as string} /> : null}
      {
        !['finished', 'playing'].includes(room.status) && <>
        <button className='border px-4 py-1 rounded' onClick={onReadyClick} onTouchStart={onReadyClick}>{isReady ? 'Unset Ready' : 'Get Ready'}</button>
        <button disabled={room.status !== 'ready'} onClick={handleStartGame} onTouchStart={handleStartGame} className="border px-4 py-1 rounded dark:bg-green-200 bg-gray-900 dark:text-black text-white"> Game Start</button>
        </>
      }
      {room?.status === 'playing' && <GameBoard roomId={id as string}/>}
    </main>
  );
}
