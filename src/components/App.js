import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0); // State for the timer's current time in centiseconds
  const [running, setRunning] = useState(false); // State to track if the timer is running
  const [laps, setLaps] = useState([]); // State to store lap times
  const intervalRef = useRef(null); // useRef to keep a mutable reference to the interval ID

  // useEffect to set up and clean up the interval
  useEffect(() => {
    // This function runs when the component mounts
    return () => {
      // This cleanup function runs when the component unmounts
      clearInterval(intervalRef.current); // Clears the interval to prevent memory leaks
    };
  }, []); // Empty dependency array means this runs only once, on mount and unmount

  const startTimer = () => {
    if (!running) {
      setRunning(true); // Set running to true
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1); // Increment the timer every 10ms
      }, 10); // Set the interval to 10ms
    }
  };

  const stopTimer = () => {
    setRunning(false); // Set running to false
    clearInterval(intervalRef.current); // Clear the interval
  };

  const resetTimer = () => {
    stopTimer(); // Stop the timer
    setTime(0); // Reset the timer to 0
    setLaps([]); // Clear the laps
  };

  const recordLap = () => {
    if (running) {
      setLaps([...laps, time]); // Add the current time to the laps array
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const centiseconds = time % 100;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Lap Timer</h1>
      <div className="timer-display">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={recordLap}>Lap</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <ul className="laps">
        {laps.map((lap, index) => (
          <li key={index}>{formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Timer;