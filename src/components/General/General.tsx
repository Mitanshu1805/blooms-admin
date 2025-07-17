import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./General.scss";
import Sidebar from "./common/Sidebar";
import Header from "./common/Header";
import DeletePopup from "../DeletePopup/DeletePopup";

interface GeneralProps {
  Component: any;
}

const General: FC<GeneralProps> = ({ Component }: any) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="col-md-12 content">
      <Sidebar
        sidebarOpen={sidebarOpen}
        handleToggleSidebar={handleToggleSidebar}
        setIsLogout={setIsLogout}
      />
      <div className="col-xl-10 col-12 sb-content">
        <div className="sb-content-header">
          <Header handleToggleSidebar={handleToggleSidebar} />
        </div>
        <div className="content-index">
          <Component />
        </div>
      </div>
      {isLogout ? (
        <DeletePopup
          logout="Are you sure want to Logout"
          DeleteSubmitHandler={handleLogout}
          CancelDeleteSubmitHandler={() => setIsLogout(false)}
        />
      ) : null}
    </div>
  );
};

export default General;
