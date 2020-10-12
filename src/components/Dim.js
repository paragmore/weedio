import React, {useState} from 'react'
import { View, ActivityIndicator, Dimensions } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export function Dim() {
    const [dimensions, setDimensions] = useState({ window, screen });
    const onChange = ({ window, screen }) => {
      setDimensions({ window, screen });
    };
  
    useEffect(() => {
      Dimensions.addEventListener("change", onChange);
      return () => {
        Dimensions.removeEventListener("change", onChange);
      };
    });

    return dimensions
    
}
