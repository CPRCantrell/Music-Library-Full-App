import './NavButton.css'

const NavButton = (props) => {

    const name = props.buttonName

    function getIcon(){
        let iconName = name.toLowerCase().replace(' ','-')
        let iconLocation = require(`../../../Assests/${iconName}.svg`)
        return(<img src={iconLocation} alt={iconName} className='btn-icon'/>)
    }

    return (
        <>
        <button className={`${props.currentPage === name ? 'on-page':'off-page'}`} onClick={()=>props.setCurrentPage(name)}>{getIcon()}{name}</button>
        </>
    );
}

export default NavButton;