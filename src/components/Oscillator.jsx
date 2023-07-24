import React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";


export const Oscillator = (props) =>{
    const { keysPressed, activeNotes} = props

    const [waveType1, setWaveType1] = useState('sine');
    const [waveType2, setWaveType2] = useState('sawtooth');
  
    useEffect(() => {
      const osc1 = new Tone.Oscillator().toDestination();
      const osc2 = new Tone.Oscillator().toDestination();
      osc1.type = waveType1;
      osc2.type = waveType2;
        console.log("keysPressed:", keysPressed);
        console.log("activeNotes:", activeNotes);
        if(activeNotes.length > 0){
            osc1.start(activeNotes)
        }
      return () => {
        if(activeNotes.length){
            osc1.stop();
        } 
      };
    }, [waveType1, waveType2, keysPressed, activeNotes]);
  
    const handleWaveTypeChange = (oscillatorNum, event) => {
      const newWaveType = event.target.value;
      if (oscillatorNum === 1) {
        setWaveType1(newWaveType);
      } else if (oscillatorNum === 2) {
        setWaveType2(newWaveType);
      }
    };
  
    return (
      <div>
        <div>
          <h3>Oscillator 1 Wave Type: {waveType1}</h3>
          <label>
            <input
              type="radio"
              value="sine"
              checked={waveType1 === 'sine'}
              onChange={(e) => handleWaveTypeChange(1, e)}
            />
            Sine
          </label>
          <label>
            <input
              type="radio"
              value="triangle"
              checked={waveType1 === 'triangle'}
              onChange={(e) => handleWaveTypeChange(1, e)}
            />
            Triangle
          </label>
          <label>
            <input
              type="radio"
              value="square"
              checked={waveType1 === 'square'}
              onChange={(e) => handleWaveTypeChange(1, e)}
            />
            Square
          </label>
          <label>
            <input
              type="radio"
              value="sawtooth"
              checked={waveType1 === 'sawtooth'}
              onChange={(e) => handleWaveTypeChange(1, e)}
            />
            Sawtooth
          </label>
        </div>
        <div>
          <h3>Oscillator 2 Wave Type: {waveType2}</h3>
          <label>
            <input
              type="radio"
              value="sine"
              checked={waveType2 === 'sine'}
              onChange={(e) => handleWaveTypeChange(2, e)}
            />
            Sine
          </label>
          <label>
            <input
              type="radio"
              value="triangle"
              checked={waveType2 === 'triangle'}
              onChange={(e) => handleWaveTypeChange(2, e)}
            />
            Triangle
          </label>
          <label>
            <input
              type="radio"
              value="square"
              checked={waveType2 === 'square'}
              onChange={(e) => handleWaveTypeChange(2, e)}
            />
            Square
          </label>
          <label>
            <input
              type="radio"
              value="sawtooth"
              checked={waveType2 === 'sawtooth'}
              onChange={(e) => handleWaveTypeChange(2, e)}
            />
            Sawtooth
          </label>
        </div>
      </div>
    );
  }