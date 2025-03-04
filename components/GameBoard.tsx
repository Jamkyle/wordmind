import GuessHistory from "./GuessHistory";
import GuessInput from "./GuessInput";

export default function GameBoard ({roomId} : {roomId?: string}) {
    if(!roomId) return null;
    return (
        <div className="gameboard">
            <GuessHistory />
            <GuessInput roomId={roomId}/>
        </div>
    );
}