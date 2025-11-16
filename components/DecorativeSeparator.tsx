
import React from 'react';

const DecorativeSeparator = () => {
  return (
    <div className="flex items-center justify-center my-8 md:my-12">
      <svg width="250" height="30" viewBox="0 0 250 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-secondary">
        <line x1="0" y1="15" x2="80" y2="15" stroke="currentColor" strokeWidth="1"/>
        <path d="M100 15L110 5 L120 15 L110 25 L100 15Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M130 15L140 5 L150 15 L140 25 L130 15Z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="125" cy="15" r="5" fill="currentColor" />
        <line x1="170" y1="15" x2="250" y2="15" stroke="currentColor" strokeWidth="1"/>
      </svg>
    </div>
  );
};

export default DecorativeSeparator;
