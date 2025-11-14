import './OutputDisplay.css';
import {Textfit} from "react-textfit";

const outputDisplay = ( {result } ) => {
    return (
        <Textfit className='output-screen' mode="single" max={50}>
            {result}
        </Textfit>
    )
}

export default outputDisplay;