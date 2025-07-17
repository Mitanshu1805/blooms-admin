import moment from 'moment';
import { QuoteHeader, ReceiptFooter } from '../../../assets';
import Image from '../../Image/Image';

function ServiceQuote({ quoteRef, item, quoteData }: any) {
  const serviceDataOne = [
    {
      label: 'Date',
      value: moment(quoteData?.service_date).format(
        'dddd, MMM DD, YYYY, hh:mm a'
      ),
    },
    { label: 'Quote ID', value: quoteData.quote_id },
    { label: 'Service', value: quoteData.service },
    { label: 'Crew', value: quoteData?.crew },
    { label: 'Quote Amt', value: quoteData?.amount },
  ];

  return (
    <div className='receipt-print' ref={quoteRef}>
      <div className='header-print-main-div'>
        <Image className='header-footer-img' src={QuoteHeader} />
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
              <span className='content-print-details-label'>
                {subitem.label}
              </span>
              <div className='edit-text-div'>
                <span className='content-print-details-title'>
                  : {subitem.value}
                </span>{' '}
              </div>
            </div>
          ))}
          <div style={{ marginTop: '40px' }}>
            <span className='content-print-details-label'>Scope</span>
            <div className='content-print-details-div'>
              <div className='edit-text-div'>
                <span
                  className={`content-print-details-title print-input-border`}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {quoteData?.scope}
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <span className='content-print-details-label'>
              Image Attachments
            </span>
            <div className='quote-img-section-print'>
              {quoteData.images.map((image: any, index: number) => (
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <span className='content-print-details-label'>Remarks</span>
            <div className='content-print-details-div'>
              <div className='edit-text-div'>
                <span
                  className={`content-print-details-title print-input-border`}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {quoteData?.remarks}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-print-main-div'>
        <Image className='header-footer-img' src={ReceiptFooter} />
      </div>
    </div>
  );
}

export default ServiceQuote;
