import moment from 'moment';
import { ReceiptFooter, ReceiptHeader } from '../../../assets';
import Image from '../../Image/Image';

function ServiceReceipt({
  receiptRef,
  item,
  receiptData,
  dropdownValues,
}: any) {
  const serviceDataOne = [
    {
      label: 'Service Date',
      value: moment(receiptData?.service_date).format(
        'dddd, MMM DD, YYYY, hh:mm a'
      ),
    },
    { label: 'Order ID', value: item.oid },
    { label: 'Service Type', value: item.service_name },
  ];

  const serviceDataTwo = [
    { label: 'Service Duration', value: receiptData?.service_duration },
    { label: 'Charges', value: receiptData?.charges },
    { label: 'Amount Paid', value: receiptData?.amount_paid },
    { label: 'Remarks', value: receiptData?.remarks },
  ];

  return (
    <div className='receipt-print' ref={receiptRef}>
      <div className='header-print-main-div'>
        <Image className='header-footer-img' src={ReceiptHeader} />
      </div>
      <div className='content-print-main-div'>
        <div className='content-text-div'>
          <span className='content-print-text-one'>
            {item?.contact_person},<br />
            thanks for blooming with us.
          </span>
          <span className='content-print-text-three'>{item?.address} </span>
        </div>

        <div className='content-div'>
          {serviceDataOne?.map((subitem) => (
            <div className='content-print-details-div'>
              <strong className='content-print-details-label'>
                {subitem.label}
              </strong>
              <div className='edit-text-div'>
                <span className='content-print-details-title'>
                  : {subitem.value}
                </span>{' '}
              </div>
            </div>
          ))}
          <div className='content-details-rates-div'>
            <strong className='content-print-details-label'>Rates</strong>
            <div className='edit-text-div'>
              <div>
                {dropdownValues?.map((item: any) => (
                  <div className='content-print-details-title  pb-2'>
                    : {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {serviceDataTwo?.map((subitem) => (
            <div className='content-print-details-div'>
              <strong className='content-print-details-label'>
                {subitem.label}
              </strong>
              <div className='edit-text-div'>
                :&nbsp;
                <span
                  className={`content-print-details-title ${
                    subitem.label !== 'Service Duration'
                      ? 'print-input-border'
                      : ''
                  }`}
                >
                  {subitem.value}
                </span>{' '}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='footer-print-main-div'>
        <Image className='header-footer-img' src={ReceiptFooter} />
      </div>
    </div>
  );
}

export default ServiceReceipt;
