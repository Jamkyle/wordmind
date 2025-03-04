import { Guess } from "@/libs/models/game";
import LetterBox from "./LetterBox";

export default function WordDisplay({ word, result }: Guess) {
    return (
        <div className="grid gap-2 grid-cols-5">
            {word.split("").map((letter, i) => (
                <LetterBox key={i} letter={letter} color={result[i]} />
            ))}
        </div>
    )

}