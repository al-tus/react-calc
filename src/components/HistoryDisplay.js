import './HistoryDisplay.css'


const HistoryDisplay = ({ history, className }) => {


    return (
        <div className={`history-display ${className}`}>
            {
                [...history].reverse().map((item, index) => (
                    <div key={index} className='history-box'>
                        <p className='inpt-dis-history'>{item.outString}</p>
                        <p className='out-dis-history'>{item.res}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default HistoryDisplay;