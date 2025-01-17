import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
  className?:string;
}

const RArrowButton: React.FC<ButtonProps> = ({ onClick, ariaLabel }) => {
  return (
    <div className="self-end">
      <button
        onClick={onClick}
        className="text-white bg-transparent hover:text-yellow-400 transition duration-300 transform hover:scale-110"
        aria-label={ariaLabel}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={6}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default RArrowButton;