import React from 'react';

const PageSize = ({ setPageSize }) => {
  return (
    <nav aria-label="Page size">
      <ul className="pagination">
        {[10, 25, 50, 100].map((pageSize, index) => (
          <li className="page-item" key={index}>
            <a className="page-link" onClick={() => setPageSize(Number(pageSize))}>{pageSize}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PageSize;
