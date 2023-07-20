import React, { useState, useEffect } from 'react';
import styles from './KeyPressTracker.module.css';
import * as Tone from "tone";

const frequencies = {
   a: "65.41" ,
   w: "69.30" ,
   s: "73.42" ,
   e: "77.78" ,
   d: "82.41" ,
   f: "87.31" ,
   t: "92.50" ,
   g: "98.00" ,
   y: "103.83" ,
   h: "110.00" ,
   u: "116.54" ,
   j: "123.47" ,
   k: "C5" ,
   o: "Db5" ,
   l: "D5" ,
   p: "Eb5" ,
   ";": "E5" ,
   "[": "F5" ,
};

function KeyPressTracker() {
  const [keysPressed, setKeysPressed] = useState(new Set());
  const [audioContext, setAudioContext] = useState(null);
  const [oscillators, setOscillators] = useState(new Map());
  const [waveform, setWaveform] = useState('sine');
   
  function handleWaveTypeChange(event) {
    setWaveform(event.target.value);
  }
  
  useEffect(() => {
    const newAudioContext = new AudioContext();
    setAudioContext(newAudioContext);

    return () => {
      newAudioContext.close();
    };
  }, []);

  useEffect(() => {
    if (!audioContext) return;


    function createOscillator(frequency) {
      const oscillator = audioContext.createOscillator();
      oscillator.type = waveform;
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.connect(audioContext.destination);
      oscillator.start();

      return oscillator;
    }

    function startNoteByKey(key) {
      const frequency = getFrequencyByKey(key);
      const oscillator = createOscillator(frequency, "16n");
      setOscillators(oscillators => new Map(oscillators).set(key, oscillator));
    }

    function stopNoteByKey(key) {
      const oscillator = oscillators.get(key);
      if (oscillator) {
        oscillator.stop();
        setOscillators(oscillators => {
          const newOscillators = new Map(oscillators);
          newOscillators.delete(key);
          return newOscillators;
        });
      }
    }

    function getFrequencyByKey(key) {
      const frequencies = {
        a: "130.81" ,
        w: "169.30" ,
        s: "173.42" ,
        e: "177.78" ,
        d: "182.41" ,
        f: "187.31" ,
        t: "192.50" ,
        g: "198.00" ,
        y: "1103.83" ,
        h: "1110.00" ,
        u: "1116.54" ,
        j: "123.47" ,
        k: "C5" ,
        o: "Db5" ,
        l: "D5" ,
        p: "Eb5" ,
        ";": "E5" ,
        "[": "F5" ,
     };
     
      return frequencies[key];
    }
  
    function handleKeyDown(event) {
      console.log(event.key);
      if (keysPressed.has(event.key)) return;
      startNoteByKey(event.key);
      setKeysPressed(keysPressed => {
        const newKeysPressed = new Set(keysPressed);
        newKeysPressed.add(event.key);
        return newKeysPressed;
      });
    }

    function handleKeyUp(event) {
      stopNoteByKey(event.key);
      setKeysPressed(keysPressed => {
        const newKeysPressed = new Set(keysPressed);
        newKeysPressed.delete(event.key);
        return newKeysPressed;
      });
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [audioContext, keysPressed, oscillators, waveform]);

  function renderKey(frequency, key) {
    const isPressed = keysPressed.has(key);
    return (
      <div
        className={`${styles.key} ${isPressed ? styles.pressed : ''}`}
        key={key}
      >
        <div className={styles.label}>{key}</div>
        <div className={styles.frequency}>{frequency} Hz</div>
      </div>
    );
  }

 

  const pianoRoll = Object.entries(frequencies).map(([key, frequency]) => {
    return renderKey(frequency, key);
  });

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <label>
          Wave Type:
          <select value={waveform} onChange={handleWaveTypeChange}>
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
          </select>
        </label>
      </div>
      <div className={styles.piano}>{pianoRoll}</div>
    </div>
  );
}

export default KeyPressTracker;