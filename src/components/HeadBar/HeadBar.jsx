import React, { useState } from 'react';
import logo from '../../Assests/library.svg'
import './HeadBar.css'

const HeadBar = (props) => {

    const [firstApearance, setFirstApearance] = useState(true);

    function animation(){
        if(props.currentPage === 'Search'){
            if(firstApearance){setFirstApearance(false)}
            return 'search-page'
        }
        else if(!firstApearance){
            return 'non-search-page'
        }
        else{return 'load'}
    }

    return (
        <header className={animation()}>
            <h1>MUSIC <img src={logo} alt='Music Library Logo' className='logo'/> <span>Library</span></h1>
            <div className='search-bar'>
                <input type='text' name='search'/>
                <button onClick={()=>props.setCurrentPage('Search')}>Search</button>
            </div>
        </header>
    );
}

export default HeadBar;