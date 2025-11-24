import './Ellipses.css'

const Ellipses = () => {
    return(
        <>
            <svg className="ellipse ellipse-1" viewBox="0 0 1000 1000">
                <ellipse cx="500" cy="500" rx="500" ry="500" />
            </svg>

            <svg className="ellipse ellipse-2" viewBox="0 0 1000 1000">
                <ellipse cx="500" cy="500" rx="500" ry="500" />
            </svg>
        </>
    )
}

export default Ellipses