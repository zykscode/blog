import React, { useState } from 'react';

interface Props {
  text: string;
}

const ReadWordsOut: React.FC<Props> = ({ text }) => {
  const [isReading, setIsReading] = useState(false);

  const handleClick = () => {
    setIsReading(!isReading);
    if (isReading) {
      speechSynthesis.cancel();
    } else {
      const words = text.split(' ');
      words.forEach((word) => {
        const utterance = new SpeechSynthesisUtterance(word);
        speechSynthesis.speak(utterance);
      });
    }
  };

  return (
    <div>
      <p>{text}</p>
      <button onClick={handleClick}>
        {isReading ? 'Stop' : 'Start'} Reading
      </button>
    </div>
  );
};

export default ReadWordsOut;
