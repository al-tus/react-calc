import { useState } from "react";

import './index.css'

import Wrapper from './components/Wrapper';
import Header from './components/Header';
import HeaderButton from "./components/HeaderButton";
import Displays from "./components/Displays";
import InputDisplay from "./components/InputDisplay";
import OutputDisplay from "./components/OutputDisplay";
import ButtonsBox from "./components/ButtonsBox";
import Button from "./components/Button";
import TopBar from "./components/TopBar";



const headerButtonsInfo =['history', 'undo']

const btnValues = [
    ['C', '+/-', '%', '÷'],
    ['7', '8', '9', '×'],
    ['5', '6', '7', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
]

function App() {
    const [calc, setCalc] = useState({
        value: 0,
        operator: '',
        outString: '',
        res: 0,
        curValue: 0,
        undo: [],
        history: []
    });

    const safeEval = (expr) => {
        try {
            // eslint-disable-next-line no-new-func
            return Function(`"use strict"; return (${expr})`)();
        } catch {
            return '';
        }
    };

    const numberClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        const newOut = calc.outString + value;

        setCalc({
            ...calc,
            outString: newOut,
            res: safeEval(
                newOut.replace(/×/g, '*').replace(/÷/g, '/')
            )
        })
    }

    const operatorClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        if (/[+\-×÷]$/.test(calc.outString)) return;

        const newOut = calc.outString + value;

        setCalc({
            ...calc,
            outString: newOut,
            res: calc.res
        })

        console.log(calc);
    }

    const resetClickHandler = () => {

    }

    const invertClickHandler = () => {

    }

    const percentClickHandler = () => {

    }

    const commaClickHandler = () => {

    }

    const equalsClickHandler = () => {

    }



  return (
    <Wrapper>
        <TopBar/>
        <Header>
            {headerButtonsInfo.map((type, i) => {
                return (
                    <HeaderButton
                        key={i}
                        type={type}
                        onClick={() => {
                            console.log(type);
                        }}
                    />
                )
            })}
        </Header>
        <Displays>
            <InputDisplay value={calc.outString ? calc.outString : '0'}/>
            <OutputDisplay result={calc.res ? calc.res : '0'}/>
        </Displays>
        <ButtonsBox>
            {btnValues.flat().map((value, i) => {
                return (
                    <Button
                        key={i}
                        value={value}
                        className={
                            value === '+' || value === '-' || value === '×' || value === '÷' || value === '='
                                ? 'operator'
                                : value === 'C' || value === '+/-' || value === '%'
                                    ? 'utility'
                                    : value === '0'
                                        ? 'zero'
                                        : ''
                        }
                        onClick={
                            value === 'C'
                                ? resetClickHandler
                                : value === '+/-'
                                    ? invertClickHandler
                                    : value === '%'
                                        ? percentClickHandler
                                        : value === '='
                                            ? equalsClickHandler
                                            : value === '+' || value === '-' || value === '×' || value === '÷'
                                                ? operatorClickHandler
                                                : value === '.'
                                                    ? commaClickHandler
                                                    : numberClickHandler
                        }
                    />
                )
            })}
        </ButtonsBox>

    </Wrapper>
  );
}

export default App;
