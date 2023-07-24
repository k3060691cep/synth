import "./App.css";
import { useState } from "react";
import  KeyPressTracker  from "./components/keyboard/KeyPressTracker";
import {Keyboard} from './components/keyboard/Keyboard'
import { Oscillator } from "./components/Oscillator";
import { Synth } from "./components/Synth";

function App() {
 
  return (
    <div className="App">
      <div>
        <Synth/>
      
      </div>
    </div>
  );
}

export default App;
