import React from 'react';

type TocHeading = {
  value: string;
  depth: number;
  url: string;
};

type TOCInlineProps = {
  toc: TocHeading[];
  indentDepth?: number;
  fromHeading?: number;
  toHeading?: number;
  asDisclosure?: boolean;
  exclude?: string | string[];
};

const TOCInline = (props: TOCInlineProps) => {
  const {
    toc,
    fromHeading = 1,
    toHeading = 6,
    asDisclosure = false,
    exclude = '',
  } = props;

  const re = Array.isArray(exclude)
    ? new RegExp(`^(${exclude.join('|')})$`, 'i')
    : new RegExp(`^(${exclude})$`, 'i');

  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading &&
      heading.depth <= toHeading &&
      !re.test(heading.value),
  );

  const marginTop = (heading: number) => {
    if (heading === 1) {
      return '0';
    }
    if (heading === 2) {
      return '16px';
    }
    if (heading === 3) {
      return '24px';
    }
    return '32px';
  };

  const tocList = (
    <>
      {filteredToc.map((heading) => (
        <a
          key={heading.value}
          href={heading.url}
          className={`notion-table-of-contents-item notion-table-of-contents-item-indent-level-${
            heading.depth - 1
          }`}
        >
          <span
            className="notion-table-of-contents-item-body"
            style={{
              display: 'inline-block',
              marginLeft: `${marginTop(heading.depth)}`,
            }}
          >
            {heading.value}
          </span>
        </a>
      ))}{' '}
    </>
  );

  return (
    <>
      {asDisclosure ? (
        <details open>
          <summary className="ml-6 py-2 text-xl font-bold">
            Table of Contents
          </summary>
          <div className="ml-6">{tocList}</div>
        </details>
      ) : (
        tocList
      )}
    </>
  );
};

export default TOCInline;
