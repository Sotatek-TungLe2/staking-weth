import React from "react";
import './styles.scss'
export const Heading = ({children}) => {
  return (
    <h2>
      <svg xmlns="http://www.w3.org/2000/svg">
        <filter id="motion-blur-filter" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="100 0"></feGaussianBlur>
        </filter>
      </svg>

      <span filter-content="S">{children}</span>
    </h2>
  );
};
