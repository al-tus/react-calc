import { useState } from "react";

import './index.css'

import Wrapper from './components/Wrapper';
import Displays from "./components/Displays";
import InputDisplay from "./components/InputDisplay";
import OutputDisplay from "./components/OutputDisplay";
import ButtonsBox from "./components/ButtonsBox";
import Button from "./components/Button";
import Ellipses from "./components/Ellipses";
import HeaderBox from "./components/HeaderBox";
import HistoryDisplay from "./components/HistoryDisplay";

const btnValues = [
    ['AC', '( )', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['+/-', '0', '.', '=']
]

const headerBtn = [
    ['history'], ['clear']
]

function App() {
    const [calc, setCalc] = useState({
        outString: '',
        evalString: '',
        res: 0,
        history: [],
    });

    const [isShow, setIsShow] = useState(false);

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

    const calculatePreview = (expression) => {
        if (!expression) return 0;

        let evalStr = expression.replace(/×/g, '*').replace(/÷/g, '/')

        const openCount = (evalStr.match(/\(/g) || []).length
        const closeCount = (evalStr.match(/\)/g) || []).length

        if (openCount > closeCount) {
            let diff = openCount - closeCount;

            while (diff > 0) {
                const lastOpenIndex = evalStr.lastIndexOf('(');
                if (lastOpenIndex !== -1) {
                    evalStr = evalStr.slice(0, lastOpenIndex) + evalStr.slice(lastOpenIndex + 1)
                    diff--
                } else{
                    break;
                }
            }

            while (/[+\-*/]$/.test(evalStr)) {
                evalStr = evalStr.slice(0, -1)
            }

            if (evalStr === '') return calc.res;

            const result = safeEval(evalStr);
            return result === '' || isNaN(result) ? calc.res : formatNumber(result);
        }

        const result = safeEval(evalStr)
        return result === '' || isNaN(result) ? calc.res : formatNumber(result);
    }

    const numberClickHandler = (e) => {
        e.preventDefault();

        const value = e.target.innerHTML;

        if (!(/[+\-×÷]$/.test(calc.outString)) && calc.res === 0) {
            calc.outString = ''
            calc.evalString = ''
        }


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
            res: calculatePreview(newEval)
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
             if (calc.outString === '') {
                 updatedOutString = '0' + value
                 updatedEvalString = '0' + value;
             } else{
                 updatedOutString = calc.outString + value;
                 updatedEvalString = calc.evalString + value;
             }
        }

        setCalc({
            ...calc,
            outString: updatedOutString ,
            evalString: updatedEvalString,
            res: calculatePreview(updatedEvalString)
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

    const clearClickHandler = () => {
        if (calc.outString === '0') return;

        let newOut = calc.outString.slice(0, -1);
        let newEval = calc.evalString.slice(0, -1);

        if (newOut === '') {
            setCalc({
                ...calc,
                outString: '',
                evalString: '',
                res: 0
            });
            return;
        }

        setCalc({
            ...calc,
            outString: newOut,
            evalString: newEval,
            res: calculatePreview(newEval)
        });

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

    const parenthesisClickHandler = () => {
        const lastChar = calc.outString.slice(-1)
        const openCount = (calc.outString.match(/\(/g) || []).length;
        const closeCount = (calc.outString.match(/\)/g) || []).length

        let newOut = calc.outString
        let newEval = calc.evalString

        const canClose = openCount > closeCount
        const isValidClosingSpot = /[0-9)%]/.test(lastChar)

        if (canClose && isValidClosingSpot) {
            newOut += ')'
            newEval += ')'
        } else {
            if (/[0-9)%]/.test(lastChar)) {
                newOut += '×('
                newEval += '*('
            } else {
                if (newOut === '0') {
                    newOut = '('
                    newEval = '('
                } else {
                    newOut += '(';
                    newEval += '(';
                }
            }
        }

        setCalc({
            ...calc,
            outString: newOut,
            evalString: newEval,
            res: calculatePreview(newEval)
        })

    }

    const commaClickHandler = () => {
        const parts = calc.evalString.split(/[+\-×÷(]/);
        const currentNumber = parts[parts.length - 1];

        if(currentNumber && currentNumber.includes('.')) return;

        let prefix = ''

        const lastChar = calc.outString.slice(-1)
        if (calc.outString === '' || /[+\-×÷(]/.test(lastChar) || calc.outString === '0'){
            prefix = '0'

            if (calc.outString === '0') {
                setCalc({
                    ...calc,
                    outString: '0.',
                    evalString: '0.'
                })
                return;
            }
        }

        setCalc({
            ...calc,
            outString: calc.outString + prefix + '.',
            evalString: calc.evalString + prefix + '.',
        })
    }

    const equalsClickHandler = () => {
        if (!calc.evalString) return;

        let evalStr = calc.evalString.replace(/×/g, '*').replace(/÷/g, '/');

        const openCount = (evalStr.match(/\(/g) || []).length;
        const closeCount = (evalStr.match(/\)/g) || []).length;

        if (openCount > closeCount) {
            evalStr += ')'.repeat(openCount - closeCount);
        }

        const result = safeEval(evalStr)

        console.log(calc.outString)

        if (result !== '' && !isNaN(result)) {
            setCalc({
                ...calc,
                res: 0,
                outString: String(result),
                evalString: String(result),
                history: [...calc.history, {res: calc.res, outString: calc.outString, evalString: calc.evalString}]
            })
        }
    }

    const historyClickHandler = () => {
        setIsShow(!isShow)
    }



  return (
      <>
        <Ellipses />

        <Wrapper>
            <HistoryDisplay className={isShow ? 'show-history' : ''} history={calc.history}/>
            <Displays>
                <InputDisplay value={calc.outString ? calc.outString : '0'} />
                <OutputDisplay result={
                    calc.outString !== '' && calc.res === 0
                    ? ''
                        : calc.res
                }/>
            </Displays>
            <ButtonsBox
                headerContent={
                    <HeaderBox>
                        {headerBtn.flat().map((value, i) => {
                            return (
                                <Button
                                    key={i}
                                    value={value}
                                    onClick={
                                        value === 'clear'
                                            ? clearClickHandler
                                            : historyClickHandler
                                    }
                                />
                            )
                        })}
                    </HeaderBox>
                }
                buttonsContent={
                    btnValues.flat().map((value, i) => {
                            return (
                                <Button
                                    key={i}
                                    value={value}
                                    className={
                                        value === '+' || value === '-' || value === '×' || value === '÷'
                                            ? 'operator'
                                            : value === 'AC' || value === 'clear' || value === '%' || value === '( )'
                                                ? 'utility'
                                                : value === '='
                                                    ? 'equal'
                                                    : 'number'
                                    }
                                    onClick={
                                        value === 'AC'
                                            ? resetClickHandler
                                            : value === '( )'
                                                ? parenthesisClickHandler
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
                        })
                }
            >
            </ButtonsBox>

        </Wrapper>
      </>
  );
}

export default App;
