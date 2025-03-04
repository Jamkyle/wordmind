import ButtonCreateRoom from "@/components/ButtonCreateRoom";
import { GameList } from "@/components/GameList";
import UserInput from "@/components/UserInput";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-4xl font-bold">WordMind</h1>
        <p className="text-center text-lg">A word game for everyone</p>
        <p className="text-center text-lg">
          Create a room and invite your friends
        </p>
        <UserInput />
        <ButtonCreateRoom />
        <GameList />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
