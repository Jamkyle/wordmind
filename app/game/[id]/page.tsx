"use client";
import PlayerList from "@/components/PlayerList";
import { getRoomById } from "@/libs/firebase/dbService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Games() {
  const { id } = useParams();
  const { data: room, isLoading } = useQuery({
    queryKey: ["players"],
    queryFn: () => getRoomById(id as string),
  });
  return (
    <main className="flex flex-col items-center justify-center">
      <h1>Games</h1>
      {isLoading ? <span>Loading...</span> : <span>{room?.id}</span>}
      {room?.players.length ? (
        <PlayerList items={room?.players} />
      ) : (
        <span>No Player</span>
      )}
    </main>
  );
}
