import { Textfit } from 'react-textfit';
import React from 'react';
import "./InputDisplay.css";

const inputDisplay = ( {value} ) => {
    const regex = /([×÷*/+-])/g;

    const parts = value.split(regex);

    const isOperator = (char) => ['×', '÷', '+', '-'].includes(char);

    return (
       <Textfit className='input-screen' min={1} max={100} throttle={30}>
           {parts.map((part, i) => {
               if(isOperator(part.trim())) {
                   return (
                       <span key={i} className="operator">
                           {part}
                       </span>
                   );
               } else {
                   return <React.Fragment key={i}>{part}</React.Fragment>
               }
           })}
       </Textfit>
    )
}

export default inputDisplay;