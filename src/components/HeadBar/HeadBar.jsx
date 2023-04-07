import './HeadBar.css'

const HeadBar = (props) => {

    function getIcon(){
        let iconLocation = require('../../Assests/find.svg')
        return(<img src={iconLocation} alt='search icon' className='search-icon'/>)
    }

    return (
        <header>
            <h1>MUSIC LIBRARY</h1>
            <div className='search-bar'>
                <input type='text' name='search' placeholder='search...'/>
                <button>{getIcon()}</button>
            </div>
        </header>
    );
}

export default HeadBar;