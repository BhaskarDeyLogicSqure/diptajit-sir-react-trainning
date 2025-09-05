import { create } from "zustand";
import allPlayer from "../data/cricket.json";

const useCricketerStore = create<CricketerState>((set) => ({
  isAuthenticated: false,
  login: (email, password) => {
    if (
      email.toString() === "test@example.com" &&
      password.toString() === "123456"
    ) {
      set({ isAuthenticated: true });
      localStorage.setItem("auth", "true");
      return true;
    }
    alert("Invalid credentials");
    return false;
  },
  logout: () => {
    set({ isAuthenticated: false });
    localStorage.removeItem("auth");
  },

  allPlayers: allPlayer as Player[],
  preferredPlayers: [],
  addToPreferred: (player) =>
    set((state) => {
      // counts by position
      const wicketKeepers = state.preferredPlayers.filter(
        (p) => p.position === "Wicket Keeper"
      ).length;
      const batsmen = state.preferredPlayers.filter(
        (p) => p.position === "Batsman"
      ).length;
      const bowlers = state.preferredPlayers.filter(
        (p) => p.position === "Bowler"
      ).length;
      const allRounders = state.preferredPlayers.filter(
        (p) => p.position === "All-Rounder"
      ).length;

      // duplicate check
      if (state.preferredPlayers.find((p) => p.id === player.id)) {
        alert("Player is already in preferred list");
        return { preferredPlayers: state.preferredPlayers };
      }

      // per-position limits
      if (player.position === "Wicket Keeper" && wicketKeepers >= 2) {
        alert("Cannot add more than 2 Wicket Keepers");
        return { preferredPlayers: state.preferredPlayers };
      }
      if (player.position === "Batsman" && batsmen >= 5) {
        alert("Cannot add more than 5 Batsmen");
        return { preferredPlayers: state.preferredPlayers };
      }
      if (player.position === "Bowler" && bowlers >= 4) {
        alert("Cannot add more than 4 Bowlers");
        return { preferredPlayers: state.preferredPlayers };
      }
      if (player.position === "All-Rounder" && allRounders >= 4) {
        alert("Cannot add more than 4 All-Rounders");
        return { preferredPlayers: state.preferredPlayers };
      }

      // total limit
      if (state.preferredPlayers.length >= 15) {
        alert("You cannot add more than 15 players to the preferred list.");
        return { preferredPlayers: state.preferredPlayers };
      }

      // add player
      return {
        preferredPlayers: [...state.preferredPlayers, player],
        allPlayers: state.allPlayers.filter((p) => p.id !== player.id),
      };
    }),
  removeFromPreferred: (player) =>
    set((state) => ({
      preferredPlayers: state.preferredPlayers.filter(
        (p) => p.id !== player.id
      ),
      allPlayers: [...state.allPlayers, player].sort((a, b) => a.id - b.id),
    })),
}));

export default useCricketerStore;
