export const tttRed = '#a10f2b';
export const tttGray = '#40403e';
export const tttWhite = '#f5f3f2';
export const tttBlack = '#191919';
export const tttGreen = '#c6cfba';

export const tttRedPalette = {
    50: '#faf3f4',
    100: '#e8c5cc',
    200: '#d798a4',
    300: '#c56a7c',
    400: '#b33d53',
    500: tttRed,
    600: '#890d25',
    700: '#710b1e',
    800: '#590818',
    900: '#400611',
    950: '#28040b',
};

export const tttGrayPalette = {
    50: '#f5f5f5',
    100: '#d1d1d1',
    200: '#adadac',
    300: '#898987',
    400: '#646463',
    500: tttGray,
    600: '#363635',
    700: '#2d2d2b',
    800: '#232322',
    900: tttBlack,
    950: '#101010',
};

export const tttTailwindTheme = {
    fontFamily: {
        sans: ['Ubuntu', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Ubuntu Mono', 'ui-monospace', 'monospace'],
        heading: ['Rubik', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: tttWhite,
        red: tttRedPalette,
        gray: tttGrayPalette,
    },
    extend: {
        colors: {
            tttRed,
            tttGray,
            tttWhite,
            tttBlack,
            tttGreen,
        },
    },
};
