import React from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();
  const lostSession = remainingTime <= 0;
  const formattedRemaiingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {lostSession && <h2>You lost</h2>}
      {!lostSession && <h2>Your Score: {score}</h2>}
      <p>
        Your target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        Your time was <strong> {formattedRemaiingTime} seconds</strong>
      </p>
      <form method="dialog">
        <button onClick={() => onReset}>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});
export default ResultModal;
