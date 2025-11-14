import './HeaderButton.css';
import historyIcon from '../assets/img/history-icon.png'
import undoIcon from '../assets/img/undo-icon.png'

const HeaderButton = ( {type, onClick} ) => {
    return (
        <button onClick={onClick} className="header-button">
            <img src={String(type === 'history' ? historyIcon : undoIcon)} alt={type}/>
        </button>
    )
}

export default HeaderButton;