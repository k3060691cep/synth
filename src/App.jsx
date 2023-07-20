import "./App.css";
import { useState } from "react";
import  KeyPressTracker  from "./components/keyboard/KeyPressTracker";
import {Keyboard} from './components/keyboard/Keyboard'

function App() {
 
  return (
    <div className="App">
      <div>
      < Keyboard/>
      </div>
    </div>
  );
}

export default App;
