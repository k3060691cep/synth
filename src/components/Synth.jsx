import React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import { Oscillator } from "./Oscillator";


export const Synth = () =>{
 
  
    return (
      <div>
         <Oscillator/> 
         <Oscillator/> 
      </div>
    );
  }