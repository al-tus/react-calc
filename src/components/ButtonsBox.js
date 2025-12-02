import './ButtonsBox.css'


const ButtonsBox = ({ headerContent, buttonsContent }) => {
    return (
        <div className="buttons-box">
            <div className="header-box">
                {headerContent}
            </div>
            <div className="buttons">
                {buttonsContent}
            </div>
        </div>
    );
}


export default ButtonsBox;