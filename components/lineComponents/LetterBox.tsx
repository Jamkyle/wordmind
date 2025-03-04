import { type LetterBox } from "@/libs/models/letter";

export default function LetterBox({letter, color}: LetterBox) {
    return (
        <div className={`flex letterBox ${
            color === "correct"
              ? "bg-correct"
              : color === "misplaced"
              ? "bg-misplaced"
              : "bg-incorrect"
          } items-center justify-center p-3 my-1`}>
            <span>{letter}</span>
        </div>
    )
}