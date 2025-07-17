import {
  Accordion,
  BrandDetails,
  Button,
  LotiFiles,
  Pagination,
  SearchBar,
  ServiceDetails,
  TableComp,
  TableLoader,
} from '../../components';
import ModalDetails from '../../components/Screen/ServiceComponent/ModalDetails';
import PropertyComponent from './PropertyComponent';
import { SubServiceTableData } from './ServiceTableData';

interface ServiceProps {
  selectedPage: number;
  userListData: any;
  isLoading: boolean;
  onEditHandler: (value: any) => void;
  onDeleteHandler: (value: any) => void;
  onBrandDeleteHandler: (value: any) => void;
  onBrandEditHandler: (value: any) => void;
  onModelEditHandler: (value: any) => void;
  onModelDeleteHandler: (value: any) => void;
  toggleUserPopup: () => void;
  setSelectedPage: (value: number) => void;
  searchInput: string;
  propertySearchInput: string;
  handleChangeSearch: (value: string) => void;
  handlePropertyChangeSearch: (value: string) => void;
  accordionData: any;
  selectedAccordion: string;
  onAccordionPress: (value: any) => void;
  onSubEditHandler: (value: any) => void;
  onSubDeleteHandler: (value: any) => void;
  toggleSubUserPopup: (value: any) => void;
  toggleLocationPopup: (value: any) => void;
  onUpdateServiceStatus: (value: any) => void;
  onPropertyEditHandler: (value: any) => void;
  onDeletePropertyHandler: (value: any) => void;
  toggleBrandPopup: (value: any) => void;
  toggleModalPopup: (value: any) => void;
  locationListData: any;
  location_name: any;
  propertySelectedPage: any;
  setPropertySelectedPage: (val: any) => void;
  limit: number;
  setLimit: (val: number) => void;
  handleSubServiceSwitchChange: (val: any) => void;
  handlePropertySwitchChange: (val: any) => void;
  setIsOpenServiceAccordion: (val: boolean) => void;
  openServiceAccordion: boolean;
  setIsOpenPropertyAccordion: (val: boolean) => void;
  openPropertyAccordion: boolean;
  isPropertyLoading: boolean;
  brandList: any;
  onBrandPress: (val: any) => void;
  selectedBrand: string;
  modalList: any;
  onModalPress: (val: any) => void;
  selectedModal: string;
  isBrandLoading: boolean;
  isModalLoading: boolean;
  isSubServiceLoading: boolean;
}

function ServiceComponent({
  selectedPage,
  userListData,
  isLoading,
  onEditHandler,
  onDeleteHandler,
  toggleUserPopup,
  setSelectedPage,
  accordionData,
  selectedAccordion,
  onAccordionPress,
  onSubEditHandler,
  onSubDeleteHandler,
  toggleSubUserPopup,
  searchInput,
  handleChangeSearch,
  onUpdateServiceStatus,
  toggleLocationPopup,
  locationListData,
  onPropertyEditHandler,
  onDeletePropertyHandler,
  propertySearchInput,
  handlePropertyChangeSearch,
  location_name,
  propertySelectedPage,
  setPropertySelectedPage,
  limit,
  setLimit,
  handleSubServiceSwitchChange,
  handlePropertySwitchChange,
  setIsOpenServiceAccordion,
  openServiceAccordion,
  setIsOpenPropertyAccordion,
  openPropertyAccordion,
  isPropertyLoading,
  toggleBrandPopup,
  brandList,
  onBrandPress,
  selectedBrand,
  toggleModalPopup,
  modalList,
  onModalPress,
  selectedModal,
  onBrandEditHandler,
  onBrandDeleteHandler,
  onModelEditHandler,
  onModelDeleteHandler,
  isBrandLoading,
  isModalLoading,
  isSubServiceLoading,
}: ServiceProps) {
  const HeaderData = [
    'No',
    'Label',
    'Order Label',
    'Status',
    'Handle (Web page binding)',
    'Cost',
    'Transport Fees',
    'Description',
    'Q. Label',
    'Q. Minimum',
    'Q. Maximum',
    'Q. Default',
    'Q. Base',
    'Q. Increment',
    'Action',
  ];

  const listData = SubServiceTableData(userListData, selectedPage);

  return (
    <div className='details-list-card card'>
      <Accordion
        name={'SERVICE LIST (' + location_name + ')'}
        isActive={true}
        active={openServiceAccordion}
        onClick={() => setIsOpenServiceAccordion(!openServiceAccordion)}
        content={
          <div>
            <div className='details-list-top'>
              <div className='details-list-top-left' />
              <div className='details-list-top-right'>
                <Button
                  className='details-list-btn'
                  name={'Add Service'}
                  onClick={toggleUserPopup}
                />
                <SearchBar onChange={handleChangeSearch} value={searchInput} />
              </div>
            </div>

            {isLoading ? (
              <TableLoader />
            ) : (
              <div>
                {accordionData?.data?.length > 0 && accordionData?.data ? (
                  <div>
                    {accordionData?.data?.map((item: any) => (
                      <Accordion
                        name={item.service_name}
                        active={selectedAccordion === item?.service_id}
                        isActive={item.is_active}
                        onClick={() => {
                          onAccordionPress(item.service_id);
                        }}
                        brand={item?.has_brand === true ? ' ( Brand ) ' : ''}
                        details={
                          <div className='service-card-main-view'>
                            <ServiceDetails
                              data={item}
                              onEditHandler={(value: any) =>
                                onEditHandler(value)
                              }
                              onDeleteHandler={(value: any) =>
                                onDeleteHandler(value)
                              }
                              toggleSubUserPopup={(value: any) =>
                                toggleSubUserPopup(value)
                              }
                              onUpdateServiceStatus={(value: any) =>
                                onUpdateServiceStatus(value)
                              }
                              toggleBrandPopup={toggleBrandPopup}
                            />
                          </div>
                        }
                        content={
                          item.has_brand ? (
                            <div>
                              {brandList?.data?.length > 0 ? (
                                <div>
                                  {isBrandLoading ? (
                                    <TableLoader />
                                  ) : (
                                    <div>
                                      {brandList?.data?.map((brand: any) => (
                                        <Accordion
                                          name={brand.brand_name}
                                          active={
                                            selectedBrand ===
                                            brand?.service_brand_id
                                          }
                                          isActive={brand.is_active}
                                          onClick={() => {
                                            onBrandPress(
                                              brand.service_brand_id
                                            );
                                          }}
                                          brand={
                                            brand?.service_brand_id
                                              ? ' ( Brand ) '
                                              : ''
                                          }
                                          details={
                                            <div className='service-card-main-view'>
                                              <BrandDetails
                                                data={brand}
                                                onEditHandler={(value: any) =>
                                                  onBrandEditHandler(value)
                                                }
                                                onDeleteHandler={(value: any) =>
                                                  onBrandDeleteHandler(value)
                                                }
                                                toggleSubUserPopup={(
                                                  value: any
                                                ) => toggleModalPopup(value)}
                                              />
                                            </div>
                                          }
                                          content={
                                            <div>
                                              {modalList?.data?.length > 0 &&
                                              modalList.data ? (
                                                <div>
                                                  {isModalLoading ? (
                                                    <TableLoader />
                                                  ) : (
                                                    <div>
                                                      {modalList?.data?.map(
                                                        (model: any) => (
                                                          <Accordion
                                                            name={
                                                              model.model_name
                                                            }
                                                            active={
                                                              selectedModal ===
                                                              model?.brands_model_id
                                                            }
                                                            isActive={
                                                              model.is_active
                                                            }
                                                            onClick={() => {
                                                              onModalPress(
                                                                model.brands_model_id
                                                              );
                                                            }}
                                                            brand={
                                                              model?.brands_model_id
                                                                ? ' ( Model ) '
                                                                : ''
                                                            }
                                                            details={
                                                              <div className='service-card-main-view'>
                                                                <ModalDetails
                                                                  data={model}
                                                                  onEditHandler={(
                                                                    value: any
                                                                  ) =>
                                                                    onModelEditHandler(
                                                                      value
                                                                    )
                                                                  }
                                                                  onDeleteHandler={(
                                                                    value: any
                                                                  ) =>
                                                                    onModelDeleteHandler(
                                                                      value
                                                                    )
                                                                  }
                                                                  toggleSubUserPopup={(
                                                                    value: any
                                                                  ) =>
                                                                    toggleSubUserPopup(
                                                                      value
                                                                    )
                                                                  }
                                                                />
                                                              </div>
                                                            }
                                                            content={
                                                              <div>
                                                                <div className='details-list-table'>
                                                                  <TableComp
                                                                    isLoading={
                                                                      isSubServiceLoading
                                                                    }
                                                                    listHeaderData={
                                                                      HeaderData
                                                                    }
                                                                    listData={
                                                                      listData
                                                                    }
                                                                    onDeleteHandler={(
                                                                      value: any
                                                                    ) =>
                                                                      onSubDeleteHandler(
                                                                        value
                                                                      )
                                                                    }
                                                                    onEditHandler={(
                                                                      value: any
                                                                    ) =>
                                                                      onSubEditHandler(
                                                                        value
                                                                      )
                                                                    }
                                                                    handleChange={(
                                                                      value: any
                                                                    ) =>
                                                                      handleSubServiceSwitchChange(
                                                                        value
                                                                      )
                                                                    }
                                                                  />
                                                                </div>
                                                                {listData?.length >
                                                                0 ? (
                                                                  <div className='details-list-pagination'>
                                                                    <Pagination
                                                                      totalCount={
                                                                        userListData?.totalPages ??
                                                                        1
                                                                      }
                                                                      onPageChange={(
                                                                        page: number
                                                                      ) =>
                                                                        setSelectedPage(
                                                                          page
                                                                        )
                                                                      }
                                                                      selectedPage={
                                                                        selectedPage
                                                                      }
                                                                    />
                                                                  </div>
                                                                ) : null}
                                                              </div>
                                                            }
                                                          />
                                                        )
                                                      )}
                                                    </div>
                                                  )}
                                                </div>
                                              ) : (
                                                <LotiFiles message='No Data Found!' />
                                              )}
                                            </div>
                                          }
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <LotiFiles message={'No Data Found!'} />
                              )}
                            </div>
                          ) : (
                            <div>
                              <div className='details-list-table'>
                                <TableComp
                                  isLoading={isSubServiceLoading}
                                  listHeaderData={HeaderData}
                                  listData={listData}
                                  onDeleteHandler={(value: any) =>
                                    onSubDeleteHandler(value)
                                  }
                                  onEditHandler={(value: any) =>
                                    onSubEditHandler(value)
                                  }
                                  handleChange={(value: any) =>
                                    handleSubServiceSwitchChange(value)
                                  }
                                />
                              </div>
                              {listData?.length > 0 ? (
                                <div className='details-list-pagination'>
                                  <Pagination
                                    totalCount={userListData?.totalPages ?? 1}
                                    onPageChange={(page: number) =>
                                      setSelectedPage(page)
                                    }
                                    selectedPage={selectedPage}
                                  />
                                </div>
                              ) : null}
                            </div>
                          )
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <LotiFiles message={'No Data Found!'} />
                )}
              </div>
            )}
          </div>
        }
      />

      <Accordion
        name={'PROPERTY LIST (' + location_name + ')'}
        isActive={true}
        active={openPropertyAccordion}
        onClick={() => setIsOpenPropertyAccordion(!openPropertyAccordion)}
        content={
          <PropertyComponent
            limit={limit}
            setLimit={setLimit}
            toggleLocationPopup={toggleLocationPopup}
            handlePropertyChangeSearch={handlePropertyChangeSearch}
            propertySearchInput={propertySearchInput}
            isLoading={isPropertyLoading}
            locationListData={locationListData}
            propertySelectedPage={propertySelectedPage}
            onPropertyEditHandler={onPropertyEditHandler}
            onDeletePropertyHandler={onDeletePropertyHandler}
            handlePropertySwitchChange={handlePropertySwitchChange}
            setPropertySelectedPage={setPropertySelectedPage}
          />
        }
      />
    </div>
  );
}

export default ServiceComponent;
