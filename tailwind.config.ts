import type { Config } from 'tailwindcss';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg-color': '#09141A',
        'custom-bg-card-color': '#0E191F',
        'button-gradient-start': '#62CDCB',
        'button-gradient-end': '#4599DB',
        'white-opacity-9': 'rgba(255, 255, 255, 0.09)',
      },
      backgroundImage: {
        'custom-gradient':
          'radial-gradient(121.73% 121.49% at 100% -3.39%, #1F4247 0%, #0D1D23 56.18%, #09141A 100%)',
        'custom-text-gradient-1':
          'linear-gradient(74.08deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)',
        'custom-text-gradient-2':
          'linear-gradient(134.86deg, #ABFFFD 2.64%, #4599DB 102.4%, #AADAFF 102.4%)',
      },
       boxShadow: {
       'custom-gradient':
          'radial-gradient(121.73% 121.49% at 100% -3.39%, #1F4247 0%, #0D1D23 56.18%, #09141A 100%)',
        'custom-text-gradient-1':
          'linear-gradient(74.08deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)',
        'custom-text-gradient-2':
          'linear-gradient(134.86deg, #ABFFFD 2.64%, #4599DB 102.4%, #AADAFF 102.4%)',
      },
      fontSize: {
        '14px': '14px',
      },
       zIndex: {
        '99': '99',
      }
    },
  },
  plugins: [
    plugin(function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, any>, options?: any) => void;
    }) {
      /** @type {Record<string, any>} */
        const newUtilities = {
        '.bg-clip-text': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
        },
        '.text-transparent': {
          color: 'transparent',
        },
        '.underline-gradient': {
          position: 'relative',
          display: 'inline-block',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: '0',
            bottom: '2px', // Adjust position as needed
            width: '100%',
            height: '2px', // Adjust height as needed
            background: 'linear-gradient(74.08deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)', // Adjust gradient colors
            transform: 'scaleY(0.5)', // Adjust thickness as needed
            transformOrigin: 'bottom',
          },
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
export default config;
