import React from 'react';
import '../General.scss';

interface BreadcrumbsProps {
  breadcrumbs: string[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <div aria-label='blooms-breadcrumb'>
      <div className='blooms-breadcrumb'>
        {breadcrumbs.map((crumb, index) => (
          <div
            key={index}
            className={`breadcrumb-item `}
            aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
          >
            <span>{crumb}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;
