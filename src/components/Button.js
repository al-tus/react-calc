import './Button.css'

const Button = ( {className, value, onClick} ) => {
    return (
        <button className={className} onClick={onClick}>
            {value !== 'clear' ? value :
                <span className="material-symbols-outlined" >
                    backspace
                </span>}
        </button>
    )
}

export default Button;