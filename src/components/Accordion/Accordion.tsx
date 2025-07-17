import {
  AccordionDownArrow,
  AccordionDownArrowBlack,
  AccordionRightArrow,
  AccordionRightArrowBlack,
} from '../../assets';
import Image from '../Image/Image';
import './Accordion.scss';

function Accordion({
  active,
  name,
  content,
  details,
  onClick,
  isActive,
  brand,
  model,
  titleContent,
}: any) {
  return (
    <div
      className={isActive ? 'ri-accordion-item' : 'ri-inactive-accordion-item'}
    >
      <div className='d-flex flex-wrap justify-content-center'>
        <div className={'accordion-title'} onClick={onClick}>
          {active ? (
            <Image
              className='cl-down-arrow'
              src={isActive ? AccordionDownArrowBlack : AccordionDownArrow}
            />
          ) : (
            <Image
              className='cl-right-arrow'
              src={isActive ? AccordionRightArrowBlack : AccordionRightArrow}
            />
          )}
          {details ? (
            active ? (
              <div>{details}</div>
            ) : (
              <div
                className={
                  isActive
                    ? 'ri-accordion-title-txt'
                    : 'ri-inactive-accordion-title-txt'
                }
              >
                {name}
                {brand ? brand : ''}
              </div>
            )
          ) : (
            <div
              className={
                isActive
                  ? 'ri-accordion-title-txt'
                  : 'ri-inactive-accordion-title-txt'
              }
            >
              {name}
            </div>
          )}
        </div>
        {titleContent}
      </div>
      {active ? <div className='accordion-content'>{content}</div> : null}
    </div>
  );
}

export default Accordion;
