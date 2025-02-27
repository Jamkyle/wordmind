import { Player } from "@/libs/models/player";

type PlayerListProps = {
  items: Player[];
};
export default function PlayerList({ items }: PlayerListProps) {
  console.log("items", items);
  return (
    <div>
      <h1>Players</h1>
      <ul>
        {items.length ? (
          items.map((item) => <li key={item.id}>{item.name}</li>)
        ) : (
          <span>No player</span>
        )}
      </ul>
    </div>
  );
}
