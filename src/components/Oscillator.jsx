import React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";


export const Oscillator = () =>{
    const [waveType, setWaveType] = useState('sine');
    const [activeNotes, setActiveNotes] = useState({});
    const [attack, setAttack] = useState(0.1);
    const [decay, setDecay] = useState(0.2);
    const [sustain, setSustain] = useState(0.5);
    const [release, setRelease] = useState(1);

    useEffect(() => {
     // Инициализируем Tone.js
     //Tone.start();
   
     // Функция для обработки нажатия клавиш
     const handleKeyDown = (e) => {
       const note = getNoteFromKey(e.key);
       if (note && !activeNotes[note]) {
         // Создаем новый осциллятор и добавляем его в список активных нот
         const oscillator = new Tone.Oscillator(note, waveType).toDestination();
         const envelope = new Tone.Envelope({
          attack,
          decay,
          sustain,
          release,
        }).connect(oscillator.volume);
         
         envelope.triggerAttack();
         oscillator.start();
         setActiveNotes((prevActiveNotes) => ({ ...prevActiveNotes, [note]: oscillator }));
       }
     };
     const handleKeyUp = (e) => {
      const note = getNoteFromKey(e.key);
      if (note && activeNotes[note]) {
        // Отключаем и удаляем осциллятор из списка активных нот
        activeNotes[note].envelope.triggerRelease();
        activeNotes[note].oscillator.stop();
    
        activeNotes[note].oscillator.dispose();
        setActiveNotes((prevActiveNotes) => {
          const updatedActiveNotes = { ...prevActiveNotes };
          delete updatedActiveNotes[note];
          return updatedActiveNotes;
        });
      }
    };
      // Функция для обработки отпускания клави
      // Получаем ноту из нажатой клавиши
      const getNoteFromKey = (key) => {
        const notes = {
          z: "C4",
          s: "Db4",
          x: "D4",
          d: "Eb4",
          c: "E4",
          v: "F4",
          g: "Gb4",
          b: "G4",
          h: "Ab4",
          n: "A4",
          j: "Bb4",
          m: "B4",
          q: "C5",
          2: "Db5",
          w: "D5",
          3: "Eb5",
          e: "E5",
          r: "F5",
          5: "Gb5",
          t: "G5",
          6: "Ab5",
          y: "A5",
          7: "Bb5",
          u: "B5",
          i: "C6",
          9: "Db6",
          o: "D6",
          0: "Eb6",
          p: "E6",
        
        };
        return notes[key.toLowerCase()];
      };
  
      // Добавляем слушатели событий для обработки нажатия/отпускания клавиш
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
  
      // Очистка слушателей при размонтировании компонента
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };

    }, [waveType, activeNotes, attack, decay, sustain, release]);
    const handleWaveTypeChange = (event) => {
      const newWaveType = event.target.value;
      setWaveType(newWaveType);     
    };
  
    return (
      <div>
        <div>
          <h3>Oscillator 1 Wave Type: {waveType}</h3>
          <label>
            <input
              type="radio"
              value="sine"
              checked={waveType === 'sine'}
              onChange={(e) => handleWaveTypeChange(e)}
            />
            Sine
          </label>
          <label>
            <input
              type="radio"
              value="triangle"
              checked={waveType === 'triangle'}
              onChange={(e) => handleWaveTypeChange(e)}
            />
            Triangle
          </label>
          <label>
            <input
              type="radio"
              value="square"
              checked={waveType === 'square'}
              onChange={(e) => handleWaveTypeChange(e)}
            />
            Square
          </label>
          <label>
            <input
              type="radio"
              value="sawtooth"
              checked={waveType === 'sawtooth'}
              onChange={(e) => handleWaveTypeChange(e)}
            />
            Sawtooth
          </label>
        </div>
        <div>
        <label>Attack:</label>
        <input type="range" min="0" max="1" step="0.01" value={attack} onChange={(e) => setAttack(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Decay:</label>
        <input type="range" min="0" max="1" step="0.01" value={decay} onChange={(e) => setDecay(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Sustain:</label>
        <input type="range" min="0" max="1" step="0.01" value={sustain} onChange={(e) => setSustain(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Release:</label>
        <input type="range" min="0" max="1" step="0.01" value={release} onChange={(e) => setRelease(parseFloat(e.target.value))} />
      </div>
       </div>
    );
  }