import './TopBar.css'
import topBar from '../assets/img/top-bar.jpg'

const TopBar = () => {
    return <img className='top-bar' src={String(topBar)} alt='TopBar' />
}

export default TopBar