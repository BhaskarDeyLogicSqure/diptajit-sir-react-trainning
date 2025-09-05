// types/global.d.ts
declare global {
  type PlayerPosition = "All-Rounder" | "Bowler" | "Wicket Keeper" | "Batsman";

  interface Player {
    id: number;
    name: string;
    position: PlayerPosition;
  }

  interface AuthState {
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
  }
  interface CricketerState extends AuthState {
    allPlayers: Player[];
    preferredPlayers: Player[];
    addToPreferred: (player: Player) => void;
    removeFromPreferred: (player: Player) => void;
  }
  
}

export {};
