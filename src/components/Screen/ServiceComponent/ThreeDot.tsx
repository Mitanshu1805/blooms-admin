import { useEffect, useRef, useState } from 'react';
import Image from '../../Image/Image';
import ThreeDotsVertical from '../../../assets/svgs/ThreeDotsVertical.svg';

export default function ThreeDotsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: any) => {
    alert(`You clicked ${option}`);
    setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className='three-dots-container' ref={menuRef}>
      <div className='service-card-three-dots' onClick={toggleMenu}>
        <Image src={ThreeDotsVertical} />
      </div>

      {isOpen && (
        <div className='three-dots-menu'>
          <ul className='menu-options'>
            <li onClick={() => handleOptionClick('Option 1')}>Option 1</li>
            <li onClick={() => handleOptionClick('Option 2')}>Option 2</li>
            <li onClick={() => handleOptionClick('Option 3')}>Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}
