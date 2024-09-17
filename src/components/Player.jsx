import { useState, useRef } from 'react';

export default function Player() {
  const [player, setPlayer] = useState('No Name');
  const [submitted, setSubmitted] = useState(false);
  const playerName = useRef();

  const handlePlayerChange = (value) => {
    setPlayer(playerName.current.value);
    playerName.current.value = ''; //This line manipulates the dom by changing the browser's value to " "
  };

  const handleChange = () => {
    setSubmitted(true);
    setPlayer(playerName.current.value);
  };

  return (
    <section id="player">
      <h2>Welcome {player}</h2>
      <p>
        <input
          type="text"
          ref={playerName}
          //onChange={handleChange}
          //value={player}
        />
        <button onClick={handlePlayerChange}>Set Name</button>
      </p>
    </section>
  );
}
