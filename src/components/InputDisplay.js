import { Textfit } from 'react-textfit';
import "./InputDisplay.css";

const inputDisplay = ( {value} ) => {
    return (
       <Textfit className='input-screen' mode="single" max={30}>
           {value}
       </Textfit>
    )
}

export default inputDisplay;