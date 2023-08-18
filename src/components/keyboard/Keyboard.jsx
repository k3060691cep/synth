import React from "react";
import style from "./keyboard.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";

const notesArr = [
  "C4",
  "Db4",
  "D4",
  "Eb4",
  "E4",
  "F4",
  "Gb4",
  "G4",
  "Ab4",
  "A4",
  "Bb4",
  "B4",
  "C5",
  "Db5",
  "D5",
  "Eb5",
  "E5",
  "F5",
  "Gb5",
  "G5",
  "Ab5",
  "A5",
  "Bb5",
  "B5",
  "C6",
  "Db6",
  "D6",
  "Eb6",
  "E6",
  
];

const white = [
  "C4",
  "D4",
  "E4",
  "F4",
  "G4",
  "A4",
  "B4",
  "C5",
  "D5",
  "E5",
  "F5",
  "G5",
  "A5",
  "B5",
  "C6",
  "D6",
  "E6", 
];
const offsetStyle = ["D4", "E4", "G4", "A4", "B4", "D5", "E5", "G5", "A5", "B5", "D6", "E6"];


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

export const Keyboard = () => { 

  const [keysPressed, setKeysPressed] = useState(new Set());
  const [activeNotes, setActiveNotes] = useState([]);
  const [oscType, setOscType] = useState("sawtooth");
  const [polySynth , setPolySynth] = useState({
    "volume": 0,
    "detune": 0,
    "portamento": 0,
    "envelope": {
      "attack": 0.1,
      "attackCurve": "linear",
      "decay": 0.6,
      "decayCurve": "exponential",
      "release": 0.2,
      "releaseCurve": "exponential",
      "sustain": 0.1
    },
    "oscillator": {
      "partialCount": 0,
      "partials": [],
      "phase": 0,
      "type": oscType 
    }
  });
  const [osc, setOsc] = useState({  
    count: 1,
    spread: 1,
    partialCount: 3,
    type: oscType
  });
  
  const [oscEnvelop, setOscEnvelop] = useState({
    attack : 0.005,
    attackCurve : "linear",
    decay : 0.1,
    decayCurve: "exponential",
    release: 1,
    releaseCurve: "exponential",
    sustain: 0.0  
  });
  const [feedbackDelay, setFeedbackDelay] = useState({
    delayTime: "8n",
    feedback: 0.2,
    wet: 0.8,
  });
 

  const synth = useRef(null);
  const fbD = useRef(null)
  //const feedbackDelay = useRef(null);

  const handleOscTypeChange = (event) => {
    const newOscType = event.target.value;
    setOscType(prev => prev = newOscType);
    setOsc((prev) =>  ({count: 1,
    spread: 1,
    type: newOscType}))
    setPolySynth(prevState => ({
      ...prevState,
      oscillator: {
        ...prevState.oscillator,
        type: newOscType
      }
    }));
    
  };
 
  useEffect(() => {
    //Tone.Synth, { oscillator: osc , envelope: oscEnvelop }
    let newOBJ = JSON.parse(JSON.stringify(polySynth)) 
    const synthTone =  new Tone.PolySynth(Tone.Synth, {...polySynth}).toDestination()
    const delay = new Tone.FeedbackDelay(feedbackDelay).toDestination();

    synth.current = synthTone
    fbD.current = delay
    console.log(polySynth);
  }, [osc, oscType,]);

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
        synth.current.triggerAttack([note]).connect(fbD.current);
        //synth.current.triggerAttackRelease(note).toMaster()
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
        synth.current.triggerRelease([note]);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    
    };
  }, [activeNotes, synth]);

  const playKey = (item) => {
   
  };

  return (
    <div>
      <input type="range" id="volume" name="volume" min="0" max="11" />
      <div>
        <label htmlFor="osc-type">Oscillator Type:</label>
        <select id="osc-type" value={oscType} onChange={handleOscTypeChange}>
          <option value="triangle">Triangle</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="square">Square</option>
          <option value="sine">Sine</option>
        </select>
      </div>
     
      <ul>
        {notesArr.map((item) => (
        
          <li
            onClick={(e) => playKey(item)}
            className={
              `${activeNotes.includes(item) ? style.active : ''}
              ${white.includes(item) ? style.white : style.black} 
               ${offsetStyle.includes(item) ? style.offset : ""}            
                `
          }
            key={item}
          ></li>
        ))}
      </ul>
     
    </div>
  );
};
