
const SvgSpinner = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={100}
    viewBox="0 0 100 100"
    {...props}
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

export default SvgSpinner