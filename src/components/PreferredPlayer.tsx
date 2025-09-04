import useCricketerStore from '../store/crickterStore';
import Player from './Player';

const PreferredPlayer = () => {
  const { preferredPlayers, removeFromPreferred } = useCricketerStore();

  return (
    <div>
      <h3>Preferred Players</h3>
      <div className="grid">
        {preferredPlayers.map((player, index) => (
          <Player
            key={index}
            player={player}
            index={index}
            callback={removeFromPreferred}
            flag="preferred"
          />
        ))}
      </div>
    </div>
  );
};

export default PreferredPlayer;
