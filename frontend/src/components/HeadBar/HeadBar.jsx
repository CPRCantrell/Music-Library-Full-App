import logo from '../../Assests/library.svg'
import './HeadBar.css'

const HeadBar = (props) => {

    function animation(){
        if(props.currentPage === 'Search'){
            return 'search-page'
        }
        else{
            return 'non-search-page'
        }
    }

    return (
        <header className={animation()}>
            <h1>MUSIC <img src={logo} alt='Music Library Logo' className='logo'/> <span>Library</span></h1>
            <div className='search-bar'>
                <input type='text' value={props.initialSearch} onChange={(e)=>props.setInitialSearch(e.target.value)}/>
                <button className='btn' onClick={()=>props.setCurrentPage('Search')}>Search</button>
            </div>
        </header>
    );
}

export default HeadBar;