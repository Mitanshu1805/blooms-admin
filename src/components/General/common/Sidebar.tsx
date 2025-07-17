import { useLocation, useNavigate } from 'react-router-dom';
import { Close } from '../../../assets';
import './../General.scss';
import Image from '../../Image/Image';

const Sidebar = ({ sidebarOpen, handleToggleSidebar, setIsLogout }: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentTab = '/' + pathname.split('/').at(1);

  const sidebarMenu_data = [
    {
      id: 1,
      name: 'Dashboard',
      icon: 'bx bxs-dashboard',
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'User',
      icon: 'bx bx-user',
      path: '/user',
    },
    {
      id: 3,
      name: 'Crew',
      icon: 'bx bx-briefcase-alt-2',
      path: '/crew',
    },
    {
      id: 4,
      name: 'Roles And Rights',
      icon: 'bx bx-pie-chart-alt-2',
      path: '/roles',
    },
    {
      id: 5,
      name: 'Territories',
      icon: 'bx bx-location-plus',
      path: '/territories',
    },
    {
      id: 6,
      name: 'Disable TimeSlots',
      icon: 'bx bx-tone',
      path: '/time-slots',
    },
    {
      id: 7,
      name: 'Pink Dates',
      icon: 'bx bx-calendar-event',
      path: '/pink-dates',
    },
    {
      id: 8,
      name: 'Orders',
      icon: 'bx bx-cart',
      path: '/orders',
    },
    {
      id: 9,
      name: 'Discount Codes',
      icon: 'bx bxs-discount',
      path: '/codes',
    },
    {
      id: 10,
      name: 'Notification',
      icon: 'bx bxs-bell-plus',
      path: '/notification',
    },
    {
      id: 11,
      name: 'Feedback',
      icon: 'bx bxs-star-half',
      path: '/feedback',
    },
    {
      id: 12,
      name: 'Client',
      icon: 'bx bx-user',
      path: '/client',
    },
    {
      id: 13,
      name: 'Log out',
      icon: 'bx bx-log-out',
    },
  ];

  const handleTabClick = (path: string) => {
    if (sidebarOpen) {
      handleToggleSidebar();
    }
    navigate(path);
  };

  return (
    <div
      className={`col-xl-2 col-12 px-0 sidebar-main ${
        sidebarOpen ? 'open-sidebar' : ''
      }`}
    >
      <div className='flex-col-div sidebar'>
        {sidebarOpen ? (
          <Image
            onClick={handleToggleSidebar}
            className='close-icon'
            src={Close}
          />
        ) : (
          ''
        )}
        <div>
          <h3 className='sidebar-title'>BLOOMS</h3>
        </div>
        <div
          className='sidebar-tab'
          style={{ overflowY: 'auto', height: '90vh' }}
        >
          {sidebarMenu_data.map((item, index) => (
            <div
              className={`side-bar-navigate ${
                currentTab === item?.path ? 'active' : ''
              }`}
              onClick={() =>
                item?.id === 13
                  ? setIsLogout(true)
                  : handleTabClick(item?.path ? item?.path : '')
              }
            >
              <i className={`${item.icon} icon-white-color`}></i>
              &nbsp; <span className='sb-text'>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
