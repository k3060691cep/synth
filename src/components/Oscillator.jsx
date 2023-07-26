import React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";


export const Oscillator = () =>{
    const [waveType, setWaveType] = useState('sine');

    const [activeNotes, setActiveNotes] = useState({});

    useEffect(() => {
     // Инициализируем Tone.js
     //Tone.start();
   
     // Функция для обработки нажатия клавиш
     const handleKeyDown = (e) => {
       const note = getNoteFromKey(e.key);
       if (note && !activeNotes[note]) {
         // Создаем новый осциллятор и добавляем его в список активных нот
         const oscillator = new Tone.Oscillator(note, waveType).toDestination();
         console.log(note);
         
         oscillator.start();
         setActiveNotes((prevActiveNotes) => ({ ...prevActiveNotes, [note]: oscillator }));
       }
     };
     const handleKeyUp = (e) => {
      const note = getNoteFromKey(e.key);
      if (note && activeNotes[note]) {
        // Отключаем и удаляем осциллятор из списка активных нот
        activeNotes[note].stop();
        activeNotes[note].dispose();
        setActiveNotes((prevActiveNotes) => {
          const updatedActiveNotes = { ...prevActiveNotes };
          delete updatedActiveNotes[note];
          return updatedActiveNotes;
        });
      }
    };
  
      // Функция для обработки отпускания клавиш
      
  
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
   
      
    
    }, [waveType, activeNotes]);
  
    const handleWaveTypeChange = (event) => {
      const newWaveType = event.target.value;

      console.log(event);
     
      
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
       </div>
    );
  }