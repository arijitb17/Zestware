// components/Underline.tsx
import React from 'react';

interface UnderlineProps {
  color?: string; // Optional color for the underline
  thickness?: string; // Optional thickness for the underline
  width?: string; // Optional width for the underline
}

const Underline: React.FC<UnderlineProps> = ({ color = 'black', thickness = '2px', width = '100%' }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        height: thickness,
        width: width,
      }}
    />
  );
};

export default Underline;
