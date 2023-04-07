import NavButton from './NavButton/NavButton'
import newSongIcon from '../../Assests/new-song.svg'
import './NavBar.css'

const NavBar = (props) => {
    const profilePicture = require('../../Assests/self.jpg')

    return (
        <nav>
            <div className='nav-profile'>
                <img src={profilePicture} alt='profile' className='profile-pic'/>
                <div>
                    <p className='welcome'>Welcome,</p>
                    <p>Chris Figueroa</p>
                </div>
            </div>
            <div className='navigation'>
                <NavButton currentPage={props.currentPage} setCurrentPage={props.setCurrentPage} buttonName={'Explore'}/>
                <NavButton currentPage={props.currentPage} setCurrentPage={props.setCurrentPage} buttonName={'Search'}/>
                <p>Personal</p>
                <NavButton currentPage={props.currentPage} setCurrentPage={props.setCurrentPage} buttonName={'Favorites'}/>
                <NavButton currentPage={props.currentPage} setCurrentPage={props.setCurrentPage} buttonName={'Playlists'}/>
            </div>
            <div className='add-song'>
                <button className='new-song'>New Song</button>
            </div>
        </nav>
    );
}

export default NavBar;