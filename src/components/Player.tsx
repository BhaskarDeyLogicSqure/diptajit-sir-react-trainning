import { useState } from "react";
import useCricketerStore from "../store/crickterStore";
import styles from "../styles/PlayerCard.module.css";

const Player = ({
  player,
  index,
  callback,
  flag,
}: {
  player: Player;
  index: number;
  callback: (player: Player) => void;
  flag: string;
}) => {
  const { preferredPlayers } = useCricketerStore();
  const [isOver, setIsOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Dynamic badge class based on position
  const getPositionClass = (pos: string) => {
    switch (pos.toLowerCase()) {
      case "batsman":
        return styles.positionBatsman;
      case "bowler":
        return styles.positionBowler;
      case "all-rounder":
        return styles.positionAllrounder;
      case "wicket keeper":
        return styles.positionWk;
      default:
        return "";
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

    if (
      player.position === "Wicket Keeper" &&
      wicketKeepers >= 2 &&
      position === "Wicket Keeper"
    ) {
      return true;
    }
    if (
      player.position === "Batsman" &&
      batsmen >= 5 &&
      position === "Batsman"
    ) {
      return true;
    }
    if (player.position === "Bowler" && bowlers >= 4 && position === "Bowler") {
      return true;
    }
    if (
      player.position === "All-Rounder" &&
      allRounders >= 4 &&
      position === "All-Rounder"
    ) {
      return true;
    }
    return false;
  };

  const isDisabled = _disableCheckedHandler(player.position);

  // Drag handlers
  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    const payload = JSON.stringify({ id: player.id, from: flag });
    e.dataTransfer.setData("application/json", payload);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  return (
    <div
      className={`${styles.card} ${isDragging ? styles.dragging : ""} ${
        isOver ? styles.dropTarget : ""
      }`}
      key={index}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      aria-grabbed={isDragging}
      role="listitem"
    >
      <div className={styles.header}>
        <span className={styles.name}>{player.name}</span>
        <span
          className={`${styles.position} ${getPositionClass(player.position)}`}
        >
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
