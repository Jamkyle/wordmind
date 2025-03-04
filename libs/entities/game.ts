import { Room } from "../models/room";

export const generateRoom = () : Omit<Room, 'id'> => ({
    createdAt: new Date(),
    status: "waiting",
  })