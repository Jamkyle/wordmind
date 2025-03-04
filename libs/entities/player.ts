import { Player } from "../models/player"
import { randomName } from "../utils/playerUtils"

export const generatePlayer = (name?: string): Omit<Player, 'id'> => ({
    name: name || randomName(),
    score: 0,
    isReady: false,
})

export const updateScore = (player: Player, score: number): Player => {
    return { ...player, score: player.score + score }
}

export const updateReady = (player: Player, isReady: boolean): Player => {
    return { ...player, isReady }
}