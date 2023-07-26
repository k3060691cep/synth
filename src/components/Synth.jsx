import React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import { Oscillator } from "./Oscillator";
import { Keyboard } from "./keyboard/Keyboard";


export const Synth = () =>{
 
  
    return (
      <div>
        <div className="synth">
          
         <Keyboard/> 
        </div>
      </div>
    );
  }