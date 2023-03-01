import React, { useState, useRef, useEffect } from 'react';
import './Stopwatch.css';

function Stopwatch() {
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [reachTime, setReachTime] = useState(300);
    const intervalRef = useRef(null);
  
    const handleStart = () => {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    };
  
    const handleStop = () => {
      clearInterval(intervalRef.current);
      setIsActive(false);
      setTimer(0);
    };
  
    const handleReset = () => {
      clearInterval(intervalRef.current);
      setIsActive(false);
      setTimer(0);
      handleStart();
    };
  
    const handleTimeChange = (event) => {
      const value = event.target.value;
      setReachTime(value);
    };
  
    const handleAlert = () => {
      if (timer === reachTime) {
        alert("Time's up!");
      }
    };
  
    useEffect(() => {
      handleAlert();
    }, [timer]);
  
    const formatTime = (timeInSeconds) => {
      const minutes = Math.floor(timeInSeconds / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    };
  
    return (
      <div className="container">
        <h1>Stopwatch</h1>
        <div className="timer">{formatTime(timer)}</div>
        <div className="buttons">
          {!isActive && (
            <button className="start" onClick={handleStart}>
              Start
            </button>
          )}
          {isActive && (
            <button className="stop" onClick={handleStop}>
              Stop
            </button>
          )}
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
          <label>
            Alert when time reaches:
            <input
              type="number"
              value={reachTime}
              onChange={handleTimeChange}
              min="1"
              max="3600"
            />
            seconds
          </label>
        </div>
      </div>
    );
  }

export default Stopwatch;