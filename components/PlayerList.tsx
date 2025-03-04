import { usePlayerRealTime } from "@/libs/hooks/games";
import { usePlayersStore } from "@/store/useGameStore";

type PlayerListProps = {
  roomId: string;
};
export default function PlayerList({ roomId }: PlayerListProps) {
  usePlayerRealTime(roomId);
  const playersByRoom = usePlayersStore((state) => state.playersByRoom ?? {});
  const players = playersByRoom[roomId] || [];
  return (
    <div>
      <h1>Players</h1>
      <ul>
        {players.length ? (
          players.map((item) => <li key={item.id}>{item.name} - {item.isReady ? <span>ready</span> : <span>not ready</span>}</li>)
        ) : (
          <span>No player</span>
        )}
      </ul>
    </div>
  );
}
