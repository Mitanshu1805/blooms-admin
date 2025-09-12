import { useLocation, useNavigate } from "react-router-dom";
import { Close } from "../../../assets";
import "./../General.scss";
import Image from "../../Image/Image";
import { hasPermission } from "../../../utils/permissions.utils";

const Sidebar = ({ sidebarOpen, handleToggleSidebar, setIsLogout }: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentTab = "/" + pathname.split("/").at(1);

  const sidebarMenu_data = [
    {
      id: 1,
      name: "Dashboard",
      icon: "bx bxs-dashboard",
      path: "/dashboard",
      permissionKey: "dashboard",
    },
    {
      id: 2,
      name: "User",
      icon: "bx bx-user",
      path: "/user",
      permissionKey: "user",
    },
    {
      id: 3,
      name: "Crew",
      icon: "bx bx-briefcase-alt-2",
      path: "/crew",
      permissionKey: "crew",
    },
    {
      id: 4,
      name: "Roles And Rights",
      icon: "bx bx-pie-chart-alt-2",
      path: "/roles",
      permissionKey: "roles",
    },
    {
      id: 5,
      name: "Territories",
      icon: "bx bx-location-plus",
      path: "/territories",
      permissionKey: "territories",
    },
    {
      id: 6,
      name: "Disable TimeSlots",
      icon: "bx bx-tone",
      path: "/disable_timeslots",
      permissionKey: "disable_timeslots",
    },
    {
      id: 7,
      name: "Pink Dates",
      icon: "bx bx-calendar-event",
      path: "/pink_dates",
      permissionKey: "pink_dates",
    },
    {
      id: 8,
      name: "Orders",
      icon: "bx bx-cart",
      path: "/orders",
      permissionKey: "orders",
    },
    {
      id: 9,
      name: "Discount Codes",
      icon: "bx bxs-discount",
      path: "/discount_codes",
      permissionKey: "discount_codes",
    },
    {
      id: 10,
      name: "Notification",
      icon: "bx bxs-bell-plus",
      path: "/notification",
      permissionKey: "notification",
    },
    {
      id: 11,
      name: "Feedback",
      icon: "bx bxs-star-half",
      path: "/feedback",
      permissionKey: "feedback",
    },
    {
      id: 12,
      name: "Client",
      icon: "bx bx-user",
      path: "/client",
      permissionKey: "client",
    },
    {
      id: 13,
      name: "Offer",
      // icon: "bx bx-purchase-tag",
      icon: "bx bx-gift",
      path: "/offer",
      // permissionKey: "offer",
    },
    {
      id: 14,
      name: "Log out",
      icon: "bx bx-log-out",
    },
  ];

  const handleTabClick = (path: string) => {
    if (sidebarOpen) {
      handleToggleSidebar();
    }
    navigate(path);
  };

  const filteredSidebarMenu = sidebarMenu_data.filter((item) => {
    // Show logout always
    // if (item.name === "Log out") return true;

    // Show only if permissionKey exists and user has 'read' permission
    return item.permissionKey
      ? hasPermission(item.permissionKey, "read")
      : true;
  });

  return (
    <div
      className={`col-xl-2 col-12 px-0 sidebar-main ${
        sidebarOpen ? "open-sidebar" : ""
      }`}
    >
      <div className="flex-col-div sidebar">
        {sidebarOpen ? (
          <Image
            onClick={handleToggleSidebar}
            className="close-icon"
            src={Close}
          />
        ) : (
          ""
        )}
        <div>
          <h3 className="sidebar-title">BLOOMS</h3>
        </div>
        <div
          className="sidebar-tab"
          style={{ overflowY: "auto", height: "90vh" }}
        >
          {filteredSidebarMenu.map((item, index) => (
            <div
              className={`side-bar-navigate ${
                currentTab === item?.path ? "active" : ""
              }`}
              onClick={() =>
                item?.id === 14
                  ? setIsLogout(true)
                  : handleTabClick(item?.path ? item?.path : "")
              }
            >
              <i className={`${item.icon} icon-white-color`}></i>
              &nbsp; <span className="sb-text">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
