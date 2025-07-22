import { useEffect, useState } from "react";
import {
  Button,
  NumberDropdown,
  Pagination,
  SearchBar,
  TableComp,
} from "../../../components";
import { ModulesList } from "../../../screens/RolesAndRights/RolesApis";
import { RolesPermissionTableData } from "./RolesPermissionsTableData";

function RolesPermissionTable({
  handleCheckboxChange,
  selectedPermissions,
}: any) {
  const [modulesListData, setModulesListData] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const HeaderData = [
    "No",
    "Module",
    "Read",
    "Write",
    "Update",
    "Delete",
    "Select All",
  ];

  const fetchModules = async () => {
    setIsLoading(true);
    try {
      const modulesDataResponse: any = await ModulesList(
        size,
        selectedPage,
        searchInput,
        setIsLoading
      );

      setModulesListData(modulesDataResponse?.data?.data || []);
    } catch (err) {
      console.error("Error fetching modules:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [selectedPage, size, searchInput]);

  const listData = RolesPermissionTableData({
    modulesListData,
    selectedPermissions,
    handleCheckboxChange,
  });

  return (
    <div className="roles-permission-wrapper">
      <div className="details-list-table">
        <TableComp
          isLoading={isLoading}
          listHeaderData={HeaderData}
          listData={listData}
        />
      </div>
    </div>
  );
}

export default RolesPermissionTable;
