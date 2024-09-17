import { useState, useRef } from 'react';
import ResultModal from './ResultModal.jsx';

export default function TimerChallenge({ title, targetTime }) {
  const targetTimeInSeconds = targetTime * 1000;

  const [timerRemaining, setTimerRemaining] = useState(targetTimeInSeconds);
  const timerId = useRef();
  const dialog = useRef();

  const timeIsActive =
    timerRemaining > 0 && timerRemaining < targetTimeInSeconds;

  if (timerRemaining <= 0) {
    clearInterval(timerId.current);
    dialog.current.open();
  }

  function handleStart() {
    timerId.current = setInterval(() => {
      setTimerRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleReset() {
    setTimerRemaining(targetTimeInSeconds);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timerId.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timerRemaining}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>

        <p className="Challenge-time">
          {targetTime} seconds{targetTime > 1 ? 's' : ''}
        </p>

        <button onClick={timeIsActive ? handleStop : handleStart}>
          {timeIsActive ? 'Stop Challenge' : 'Start Challenge'}
        </button>
        <p className={timeIsActive ? 'active' : undefined}>
          {timeIsActive ? 'Time is running' : 'Time is inactive'}
        </p>
      </section>
    </>
  );
}
