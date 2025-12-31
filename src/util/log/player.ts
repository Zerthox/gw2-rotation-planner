import { Log, Player } from "./types";

export const getPlayer = (log: Log, playerName: string): Player =>
    log.players.find((player) => player.name === playerName);
