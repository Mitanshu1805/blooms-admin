import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '../../assets';
import { Button, Image, LotiFiles, TableLoader } from '../../components';
import Breadcrumbs from '../../components/General/common/BreadCrumbs';
import ThreeDotsMenu from '../../components/Screen/ServiceComponent/ThreeDot';
import './Service.scss';

interface ServiceProps {
  isLoading: boolean;
  accordionData: any;
  searchInput: string;
  location_name: any;
  toggleUserPopup: () => void;
  handleChangeSearch: (value: any) => void;
}

function ServiceComponent({
  isLoading,
  accordionData,
  searchInput,
  location_name,
  toggleUserPopup,
  handleChangeSearch,
}: ServiceProps) {
  const navigation = useNavigate();

  return (
    <>
      <Breadcrumbs breadcrumbs={['Territories', location_name]} />
      <div className='details-list-card card'>
        <div className='row'>
          <div className='col-12'>
            <div className='service-search-btn-container'>
              <div className='d-flex'>
                <div className='service-search-input-container'>
                  <Image
                    className='content-searchBar-search'
                    src={SearchIcon}
                  />
                  <input
                    className='content-searchBar-input'
                    placeholder='Search'
                    onChange={(e) => handleChangeSearch(e)}
                    value={searchInput}
                  />
                </div>
              </div>
              <Button
                className='details-list-btn'
                name={'Add Service'}
                onClick={toggleUserPopup}
              />
            </div>
          </div>
        </div>
        {isLoading ? (
          <TableLoader />
        ) : (
          <div className='row'>
            {accordionData?.data && accordionData?.data.length > 0 ? (
              accordionData?.data?.map((item: any) => (
                <div className='d-flex col-6 col-md-2'>
                  <div
                    className={`service-grid-card-container ${
                      item?.is_active ? '' : 'service-card-disabled'
                    }`}
                    onClick={() => {
                      navigation(
                        '/territories/services/' +
                          item.service_name.toLowerCase().replace(' ', '-'),
                        {
                          state: item,
                        }
                      );
                    }}
                  >
                    <Image
                      className='service-icon-img'
                      src={item?.service_icon}
                      alt={item?.service_name}
                    />
                    <div className='service-name-title-container'>
                      <span className='service-name-title'>
                        {item?.service_name}
                      </span>
                      {/* <ThreeDotsMenu /> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <LotiFiles message={'No Data Found!'} />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ServiceComponent;
