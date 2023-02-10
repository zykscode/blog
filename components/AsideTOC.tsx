import React from 'react';

import useHeadings from '#/lib/useHeadings';

function AsideTOC() {
  const { headings, selectedItem } = useHeadings();
  return (
    <aside className="aside">
      <div className="aside-table-of-contents">
        <div className="aside-table-of-contents-header">Table of Contents</div>
        <nav className="table-of-contents">
          {headings.map((heading) => (
            <a
              key={heading.element.id}
              href={`#${heading.element.id}`}
              className={`table-of-contents-item table-of-contents-item-indent-level-${
                heading.level
              } ${
                heading.element.id === selectedItem
                  ? 'table-of-contents-active-item'
                  : ''
              }`}
            >
              <span
                className="table-of-contents-item-body"
                style={{ display: 'inline-block', marginLeft: heading.margin }}
              >
                {heading.text}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default AsideTOC;
