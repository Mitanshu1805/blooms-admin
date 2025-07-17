import React from 'react';
import {
  Button,
  NumberDropdown,
  Pagination,
  SearchBar,
  TableComp,
} from '../../components';
import { PropertyTableData } from './ServiceTableData';

interface PropertyProps {
  toggleLocationPopup: (val: boolean) => void;
  onPropertyEditHandler: (val: any) => void;
  onDeletePropertyHandler: (val: any) => void;
  isLoading: boolean;
  locationListData: any;
}

function PropertyComponent({
  toggleLocationPopup,
  locationListData,
  isLoading,
  onPropertyEditHandler,
  onDeletePropertyHandler,
}: PropertyProps) {
  const PropertyHeaderData = [
    'No',
    'Label',
    'Order Label',
    'Cost',
    'Currency',
    'Action',
  ];

  const propertylistData = PropertyTableData(locationListData);

  return (
    <div>
      <div className='details-list-table'>
        <TableComp
          isLoading={isLoading}
          listHeaderData={PropertyHeaderData}
          listData={propertylistData}
          onEditHandler={(value: any) => onPropertyEditHandler(value)}
          onDeleteHandler={(value: any) => onDeletePropertyHandler(value)}
        />
      </div>
    </div>
  );
}

export default PropertyComponent;
