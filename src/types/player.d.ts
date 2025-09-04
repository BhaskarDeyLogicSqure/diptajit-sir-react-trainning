// types/global.d.ts
declare global {
  type PlayerPosition = "All-Rounder" | "Bowler" | "Wicket Keeper" | "Batsman";

  interface Player {
    id: number;
    name: string;
    position: PlayerPosition;
  }
}

export {};
