import { siteMetadata } from '#/data/siteMetadata';

const formatDate = (date: string | number | Date) => {
  const now = new Date(date).toLocaleDateString(siteMetadata.locale);

  return now;
};

export default formatDate;
