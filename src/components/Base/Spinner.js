export const Spinner = () => (
  <svg
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    data-testid="spinner"
  >
    <g fill="none" strokeLinecap="round" stroke="currentColor">
      <circle strokeWidth="10" className="opacity-25" cx="50" cy="50" r="45" />
      <circle
        strokeWidth="10"
        className="animate-spinner"
        cx="50"
        cy="50"
        r="45"
      />
    </g>
  </svg>
);