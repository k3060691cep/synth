import React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import { Oscillator } from "./Oscillator";
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

export const Synth = () =>{
    const [keysPressed, setKeysPressed] = useState(new Set());
    const [activeNotes, setActiveNotes] = useState([]);
    const synth = useRef(null);


    useEffect(() => {
        function onKeyDown(event) {
          if (keysPressed.has(event.key)) return;
          setKeysPressed(keysPressed => {
            const newKeysPressed = new Set(keysPressed);
            newKeysPressed.add(event.key);
            return newKeysPressed;
          });
          const note = notes[event.key];
          
          if (note && !activeNotes.includes(note)) {
            setActiveNotes([...activeNotes, note]);
            
          }
        }
    
        function onKeyUp(event) {
          const note = notes[event.key];
          setKeysPressed(keysPressed => {
            const newKeysPressed = new Set(keysPressed);
            newKeysPressed.delete(event.key);
            return newKeysPressed;
          });
          if (note) {
            setActiveNotes(activeNotes.filter((n) => n !== note));
            
          }
        }
    
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
    
        return () => {
          window.removeEventListener("keydown", onKeyDown);
          window.removeEventListener("keyup", onKeyUp);
        
        };
      }, [activeNotes, synth]);
  
    return (
      <div>
        <Oscillator notes = {notes} keysPressed={keysPressed} activeNotes={activeNotes}/>
      </div>
    );
  }