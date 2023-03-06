/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';

interface Heading {
  tag: string;
  text: string;
  element: Element;
  margin: number;
  level: number;
  active: boolean;
  bounds: DOMRect;
}

const useHeadings = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    const headingsArray = Array.from(
      document.querySelectorAll('h2, h3, h4, h5, h6'),
    );

    const newHeadings = headingsArray.map((heading) => ({
      tag: heading.tagName,
      text: heading.textContent || '',
      element: heading,
      level: Number(heading.tagName[1]) - 1,
      margin: (Number(heading.tagName[1]) - 1) * 16,
      active: false,
      bounds: heading.getBoundingClientRect(),
    }));
    setHeadings(() => newHeadings);
    let last = newHeadings[0];
    const handleScroll = () => {
      const scrollThreshold = window.scrollY;
      for (const heading of newHeadings) {
        if (heading.bounds.top >= scrollThreshold) {
          break;
        }
        last = heading;
      }

      if (selectedItem !== last.element.id) {
        setSelectedItem(last.element.id);
      }

      setHeadings(() => [...newHeadings]);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { headings, selectedItem };
};

export default useHeadings;
