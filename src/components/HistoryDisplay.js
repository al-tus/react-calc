import './HistoryDisplay.css'
import React from 'react';

const HistoryDisplay = ({ history, className }) => {
    const isOperator = (char) => ['×', '÷', '+', '-'].includes(char);

    return (
        <div className={`history-display ${className}`}>
                {history.length === 0
                ? <div className='empty-history'>History is empty</div>
                : <div className='history-items' style={history.length <= 1 ? {overflow: 'hidden'} : {}}>
                    <div className='cover'>
                    {[...history].map((item, index) => {

                        const parts = item.outString?.split(/([×÷*/+-])/g)

                        return(
                            <div key={index} className='history-box'>
                                <p className="inpt-dis-history">
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
                                </p>
                                <p className='out-dis-history'>{item.res}</p>
                            </div>
                        )
                    })
                    }
                </div>
                  </div>
            }

        </div>
    )
}

export default HistoryDisplay;