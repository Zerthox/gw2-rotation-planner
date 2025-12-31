import { Log } from "./types";

export const getPlayer = (log: Log, playerName: string) =>
    log.players.find((player) => player.name === playerName);
