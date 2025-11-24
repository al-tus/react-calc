import './Button.css'

const Button = ( {className, value, onClick} ) => {
    return (
        <button className={className} onClick={onClick}>
            {
                value === 'clear'
                    ? <span className="material-symbols-outlined">backspace</span>
                    : value === 'history'
                        ? <span className="material-symbols-outlined">history</span>
                        : value
            }
        </button>
    )
}

export default Button;