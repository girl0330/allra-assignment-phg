// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard'],
      },

      colors: {
        // primary
        primary: {
          DEFAULT: '#18A0FB',
        },

        // secondary scale
        secondary: {
          700: '#005CA8',
          600: '#0074D0',
          400: '#2FADFF',
          300: '#77C9FF',
          200: '#B7E0FF',
          100: '#DFEFFF',
          50: '#EFF8FF',
        },

        // label scale
        'label-900': '#111827',
        'label-800': '#1F2937',
        'label-700': '#374151',
        'label-500': '#6B7280',
        'label-100': '#F3F4F6',

        // background
        'background-default': '#FFFFFF',
        'background-alternative': '#F5F6FA',

        // line scale
        'line-800': '#111827',
        'line-400': '#DFE3E8',
        'line-200': '#F3F4F6',

        // status
        'status-correct': '#07CC32',
        'status-error': '#FF2D2D',
        'status-caution': '#FCBE1D',
        'status-disable': '#CBD5E1',

        // components
        'component-dark': '#23272E',
        'component-light': '#D1D5DB',
        'component-assistive': '#F8FAFC',
        'component-alternative': '#F1F5F9',

        // materials
        'material-dimmed': '#0A0A0ABF', // 75%
        'material-scroll': '#37415152', // 32%
      },

      boxShadow: {
        normal: '0px 1px 4px rgba(96,100,136,0.04), 1px 4px 16px rgba(96,100,136,0.08)',
        strong: '1px -2px 10px rgba(96,100,136,0.10), -1px 4px 16px rgba(96,100,136,0.12)',
        heavy: '1px 8px 20px rgba(70,79,94,0.20), -1px -8px 16px rgba(50,55,63,0.16)',
      },

      borderRadius: {
        '2xs': '2px',
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '10px',
        xl: '12px',
        '2xl': '14px',
      },

      // 텍스트
      fontSize: {
        // Display
        'display-1': ['48px', { lineHeight: '140%', letterSpacing: '-0.02em' }],
        'display-2': ['40px', { lineHeight: '140%', letterSpacing: '-0.02em' }],

        // Title
        'title-1': ['32px', { lineHeight: '140%', letterSpacing: '-0.02em' }],
        'title-2': ['26px', { lineHeight: '140%', letterSpacing: '-0.02em' }],
        'title-3': ['20px', { lineHeight: '140%', letterSpacing: '-0.02em' }],
        'title-4': ['18px', { lineHeight: '144%', letterSpacing: '-0.02em' }],

        // Body
        'body-1': ['16px', { lineHeight: '150%', letterSpacing: '-0.01em' }],
        'body-2': ['15px', { lineHeight: '150%', letterSpacing: '-0.01em' }],
        'body-3': ['14px', { lineHeight: '150%', letterSpacing: '-0.01em' }],

        // Caption
        'caption-1': ['12px', { lineHeight: '140%', letterSpacing: '-0.01em' }],
        'caption-2': ['11px', { lineHeight: '140%', letterSpacing: '-0.01em' }],
      },
    },
  },
  plugins: [],
};
