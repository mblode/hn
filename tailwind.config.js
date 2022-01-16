module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  mode: 'jit',
  darkMode: 'media',
  theme: {
    extend: {
      keyframes: {
        spinner: {
          '0%': { strokeDasharray: '40 242.6', strokeDashoffset: '286.6' },
          '50%': { strokeDasharray: '141.3', strokeDashoffset: '141.3' },
          '100%': { strokeDasharray: '40 242.6', strokeDashoffset: '0' },
        },
      },
      animation: {
        spinner: 'spinner 1s cubic-bezier(1,1,1,1) 0s infinite',
      },
    },
  },
  plugins: [],
}
