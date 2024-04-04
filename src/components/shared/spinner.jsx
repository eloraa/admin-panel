import * as React from 'react';

const Spinner = React.forwardRef(({ className, strokeWidth = 6, radius = '45%', ...props }, ref) => {
  return (
    <svg className={className} viewBox="0 0 54 54" fill="none" {...props}>
      <circle cx="50%" cy="50%" r={radius} strokeWidth={strokeWidth} strokeLinecap="round" stroke="currentColor" fill="none" transformOrigin="50% 50%">
        <animateTransform attributeName="transform" type="rotate" values="-90;810" keyTimes="0;1" dur="2s" repeatCount="indefinite"></animateTransform>
        <animate
          attributeName="stroke-dashoffset"
          values="0%;0%;-157.080%"
          calcMode="spline"
          keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0"
          keyTimes="0;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="stroke-dasharray"
          values="0% 314.159%;157.080% 157.080%;0% 314.159%"
          calcMode="spline"
          keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0"
          keyTimes="0;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </circle>
    </svg>
  );
});
Spinner.displayName = 'Spinner';

export { Spinner };
