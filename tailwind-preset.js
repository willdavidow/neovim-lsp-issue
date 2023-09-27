// Example preset
module.exports = {
  theme: {
    colors: {
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      white: '#FFF',
      black: '#000',
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        10: ['0.625rem', '1'],
        11: ['0.688rem', '1'],
        12: ['0.75rem', '1'],
        13: ['0.813rem', '1'],
        14: ['0.875rem', '1'],
        16: ['1rem', '1'],
        18: ['1.125rem', '1'],
        20: ['1.25rem', '1'],
        22: ['1.375rem', '1'],
        24: ['1.5rem', '1'],
        28: ['1.75rem', '1'],
        30: ['1.875rem', '1'],
        32: ['2rem', '1'],
        34: ['2.115rem', '1'],
        36: ['2.25rem', '1'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
