import { useState } from 'react';

export const Paragraph = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <p
      className={`text-gray-600 mb-4 ${isExpanded ? '' : 'line-clamp-6'}`}
      onClick={handleToggle}
    >
      {text}
      {!isExpanded && text.length > 80 ? '...' : ''}
    </p>
  );
};
