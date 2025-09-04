import useCricketerStore from "../store/crickterStore";
import styles from "../styles/PlayerCard.module.css";


const Player = ({ player, index, callback, flag }: { player: Player, index: number, callback: (player: Player) => void, flag: string }) => {

  const {preferredPlayers}=useCricketerStore();
  // Dynamic badge class based on position
  const getPositionClass = (pos: string) => {
    switch (pos.toLowerCase()) {
      case "batsman": return styles.positionBatsman;
      case "bowler": return styles.positionBowler;
      case "all-rounder": return styles.positionAllrounder;
      case "wicket keeper": return styles.positionWk;
      default: return "";
    }
  };

  const _disableCheckedHandler = (position: string): boolean => {
    
    const wicketKeepers = preferredPlayers.filter(
      (p) => p.position === "Wicket Keeper"
    ).length;
    const batsmen = preferredPlayers.filter(
      (p) => p.position === "Batsman"
      ).length;
      const bowlers = preferredPlayers.filter(
        (p) => p.position === "Bowler"
      ).length;
      const allRounders = preferredPlayers.filter(
        (p) => p.position === "All-Rounder"
      ).length;


      if (player.position === "Wicket Keeper" && wicketKeepers >= 2 && position === "Wicket Keeper") {
        return true;
      }
      if (player.position === "Batsman" && batsmen >= 5 && position === "Batsman") {
        return true;
      }
      if (player.position === "Bowler" && bowlers >= 4 && position === "Bowler") {
        return true;
      }
      if (player.position === "All-Rounder" && allRounders >= 4 && position === "All-Rounder") {
        return true;
      }
      return false;
  }

  const isDisabled = _disableCheckedHandler(player.position);

  return (
    <div className={styles.card} key={index}>
      <div className={styles.header}>
        <span className={styles.name}>{player.name}</span>
        <span className={`${styles.position} ${getPositionClass(player.position)}`}>
          {player.position}
        </span>
      </div>

      <p className={styles.meta}>Player #{index + 1}</p>


      <div className={styles.actions}>
        {flag === "all" ? (
          <button
            disabled={isDisabled}
            className={`${styles.add} ${isDisabled ? styles.disable : ""}`}
            onClick={() => callback(player)}
          >
            Add to Preferred
          </button>
        ) : (
          <button className={styles.remove} onClick={() => callback(player)}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Player;
