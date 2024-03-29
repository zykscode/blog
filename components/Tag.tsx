import kebabCase from 'kebab-case';
import Link from 'next/link';

const Tag = ({ text }: { text: string }) => {
  return (
    <Link legacyBehavior={true} href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {text.split(' ').join('-')}
      </a>
    </Link>
  );
};

export default Tag;
