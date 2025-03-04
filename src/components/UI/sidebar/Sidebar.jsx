import React, {useState} from 'react'; 
import './Sidebar.css';
import done from '../../../images/check-circle_1.png';
import today from '../../../images/calendar_2_1.png';
import calendar from '../../../images/calendar_3_1.png';
import tag from '../../../images/price_tag_white.png';
import {Link} from 'react-router-dom';
import UserService from '../../../API/UserService';

const Sidebar = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(parseInt(localStorage.getItem('activeMenu')));

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const items = [
    {name: "Today", icon: today, id: 1},
    {name: "Week", icon: calendar, id: 2},
    {name: "Done", icon: done, id: 3},
    {name: "Tags", icon: tag, id: 4}
  ]

  return (
    <div>
      <button className="burger-button" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="close">
          <div className={`close-void ${isOpen ? 'open' : ''}`}>

          </div>
          <button className="close-button" onClick={toggleSidebar}>
            x
          </button>
        </div>

        <div className="sidebar-items">
          { items.map(
            (item) =>
            <Link to={`/${item.name}`} replace>
              <div 
              className={`sidebar-item ${isOpen ? 'open' : ''} ${item.id === activeMenu ? 'active' : ''}`} 
              onClick={() => {
                setActiveMenu(item.id)
                localStorage.setItem('activeMenu', item.id.toString())
                }}>

                <a className="item-content">
                  <div className="image-container">
                    <img className="item-img" src={item.icon} alt=""/>
                  </div>
                  <span className="item-text">{item.name}</span>
                </a>
                
              </div>
            </Link>
          )}
        </div>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={() => {
            UserService.logout().then(() => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload();
            })
            console.log("Logged out");
          }}>
            Log out
          </button>
        </div>
      </div>  
    </div>
  );
};

export default Sidebar;
