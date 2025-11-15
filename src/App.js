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
    ['AC', '+/-', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
]

function App() {
    const [calc, setCalc] = useState({
        value: 0,
        operator: '',
        outString: '0',
        evalString: '',
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

    const formatNumber = (x) => {
        const parts = x.toString().split('.');

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return parts.join('.');
    }

    const numberClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        let newOut
        let newEval

        if (calc.outString.endsWith('%')) {
            newOut = calc.outString;
            newEval = calc.evalString;
        } else if (calc.outString === '0') {
            newOut = newEval = value;
        } else {
            newOut = calc.outString + value;
            newEval = calc.evalString + value;
        }

        setCalc({
            ...calc,
            outString:newOut,
            evalString: newEval,
            res: formatNumber(safeEval(
                newEval.replace(/×/g, '*').replace(/÷/g, '/'))
            )
        })
    }

    const operatorClickHandler = (e) => {
        e.preventDefault();

        const value = e.target.innerHTML;


        const operatorRegex = /[+\-×÷]$/;

        let updatedOutString
        let updatedEvalString;


        if (operatorRegex.test(calc.outString)) {
            updatedOutString = calc.outString.replace(operatorRegex, value);
            updatedEvalString = calc.evalString.replace(operatorRegex, value);
        }
         else {
            updatedOutString = calc.outString + value;
            updatedEvalString = calc.evalString + value;
        }

        setCalc({
            ...calc,
            outString:  updatedOutString,
            evalString: updatedEvalString,
            res: calc.res
        })

    }

    const resetClickHandler = () => {
        setCalc({
            ...calc,
            outString: '',
            evalString: '',
            res: 0,
        })
    }

    const invertClickHandler = () => {

    }

    const percentClickHandler = () => {
        if (!calc.evalString && !calc.outString) return;

        const lastChar = calc.outString.slice(-1);

        if (lastChar === '%') {

            const newOutString = calc.outString + '%';

            const parts = calc.evalString.split(/([+\-×÷])/);
            const lastNum = parseFloat(parts[parts.length - 1]);

            if (isNaN(lastNum)) return;

            const newLastNum = lastNum / 100;

            const newEvalString = parts.slice(0, -1).join('') + String(newLastNum);

            setCalc({
                ...calc,
                outString: newOutString,
                evalString: newEvalString,
                res: safeEval(newEvalString.replace(/×/g, '*').replace(/÷/g, '/'))
            });
        }

        else {
            const exp = calc.evalString;
            const parts = exp.split(/([+\-×÷])/);

            let newOutString;
            let newEvalString;

            const num = parseFloat(parts[parts.length - 1]);
            if (isNaN(num)) return;

            if (parts.length === 1) {
                const percentValue = num / 100;
                newOutString = String(num) + "%";
                newEvalString = String(percentValue);
            }

            else {
                const op = parts[parts.length - 2];
                const baseEvalString = parts.slice(0, -1).join('');

                const index = calc.outString.lastIndexOf(String(num));


                const baseOutString = calc.outString.substring(0, index);

                if (op === '+' || op === '-') {
                    const baseExpression = parts.slice(0, -2).join('');
                    const baseValue = safeEval(baseExpression.replace(/×/g, '*').replace(/÷/g, '/'));
                    if (isNaN(baseValue)) return;

                    const percentValue = baseValue * num / 100;

                    newOutString = baseOutString + String(num) + "%";
                    newEvalString = baseEvalString + String(percentValue);
                }

                else {
                    const percentValue = num / 100;
                    newOutString = baseOutString + String(num) + "%";
                    newEvalString = baseEvalString + String(percentValue);
                }
            }

            setCalc({
                ...calc,
                outString: newOutString,
                evalString: newEvalString,
                res: safeEval(newEvalString.replace(/×/g, '*').replace(/÷/g, '/'))
            });
        }
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
            <InputDisplay value={calc.outString ? calc.outString : '0'} />
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
                                : value === 'AC' || value === '+/-' || value === '%'
                                    ? 'utility'
                                    : value === '0'
                                        ? 'zero'
                                        : ''
                        }
                        onClick={
                            value === 'AC'
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
