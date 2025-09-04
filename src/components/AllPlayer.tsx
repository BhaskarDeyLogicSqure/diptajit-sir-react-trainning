import useCricketerStore from '../store/crickterStore';
import Player from './Player';

const AllPlayer = () => {
  const { allPlayers, addToPreferred } = useCricketerStore();

  return (
    <>
      {allPlayers.map((player, index) => (
        <Player
          key={index}
          player={player}
          index={index}
          callback={addToPreferred}
          flag="all"
        />
      ))}
    </>
  );
};

export default AllPlayer;
