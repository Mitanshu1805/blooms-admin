import { Menu } from "../../../assets";
import Image from "../../Image/Image";
import "./../General.scss";

const Header = ({ handleToggleSidebar }: any) => {
  return (
    <div className="home-section">
      <nav>
        <div className="sidebar-button">
          <div
            className="flex-row-div content-header-menu"
            onClick={handleToggleSidebar}
          >
            <Image src={Menu} />
          </div>
        </div>
        <div className="profile-details">
          <div className="content-header-user-icon">
            <span className="content-header-user">A</span>
          </div>
          <div className="content-header-user-name">
            <span>Admin</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
