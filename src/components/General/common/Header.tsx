import { useEffect, useState, useRef } from "react";
import { Menu } from "../../../assets";
import Image from "../../Image/Image";
import ChangePasswordModal from "../../ChangePassModal";
import "./../General.scss";

const Header = ({ handleToggleSidebar }: any) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAdminClick = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user_details");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <span className="content-header-user">
              {user?.first_name?.charAt(0).toUpperCase() || "U"}
              {user?.last_name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>

          <div className="content-header-user-name">
            <span onClick={handleAdminClick}>{user?.first_name} ▾</span>

            {showDropdown && (
              <div
                className="admin-dropdown"
                ref={dropdownRef}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setShowModal(true);
                    setShowDropdown(false);
                  }}
                >
                  Change Password
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <ChangePasswordModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Header;
