import './OutputDisplay.css';
import {Textfit} from "react-textfit";

const outputDisplay = ( {result } ) => {
    return (
        <Textfit className='output-screen' min={1} max={1000} throttle={50}>
            {result}
        </Textfit>
    )
}

export default outputDisplay;