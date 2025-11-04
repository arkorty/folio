/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
    animation: {
      'progress': 'progress 1.5s ease-in-out infinite',
    },
    keyframes: {
      progress: {
        '0%': { width: '0%' },
        '50%': { width: '70%' },
        '100%': { width: '100%' },
      },
    },
  },
};
export const plugins = [];
