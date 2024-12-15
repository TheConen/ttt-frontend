import { PluginAPI } from 'tailwindcss/types/config';

export const tttRed = '#a10f2b';
export const tttGray = '#40403e';
export const tttWhite = '#f5f3f2';
export const tttBlack = '#191919';
export const tttGreen = '#c6cfba';

export const tttRedPalette = {
    0: tttWhite,
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
    0: tttWhite,
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
    extend: {
        colors: {
            tttRed: { ...tttRedPalette, DEFAULT: tttRed },
            tttGray: { ...tttGrayPalette, DEFAULT: tttGray },
            tttWhite,
            tttBlack,
            tttGreen,
        },
        fontFamily: {
            sans: ['Ubuntu', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            mono: ['Ubuntu Mono', 'ui-monospace', 'monospace'],
            heading: ['Rubik', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            logo: ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        },
        typography: (theme: PluginAPI['theme']) => ({
            ttt: {
                css: {
                    // TODO These colors probably need to be tweaked a bit, currently it's just a copy of
                    // https://github.com/tailwindlabs/tailwindcss-typography/blob/main/src/styles.js#L1089 using tttGrayPalette instead of default tailwind gray palette
                    '--tw-prose-body': theme('colors.tttGray[700]'),
                    '--tw-prose-headings': theme('colors.tttGray[900]'),
                    '--tw-prose-lead': theme('colors.tttGray[600]'),
                    '--tw-prose-links': theme('colors.tttGray[900]'),
                    '--tw-prose-bold': theme('colors.tttGray[900]'),
                    '--tw-prose-counters': theme('colors.tttGray[500]'),
                    '--tw-prose-bullets': theme('colors.tttGray[300]'),
                    '--tw-prose-hr': theme('colors.tttGray[200]'),
                    '--tw-prose-quotes': theme('colors.tttGray[900]'),
                    '--tw-prose-quote-borders': theme('colors.tttGray[200]'),
                    '--tw-prose-captions': theme('colors.tttGray[500]'),
                    '--tw-prose-kbd': theme('colors.tttGray[900]'),
                    '--tw-prose-kbd-shadows': theme('colors.tttGray[900])'),
                    '--tw-prose-code': theme('colors.tttGray[900]'),
                    '--tw-prose-pre-code': theme('colors.tttGray[200]'),
                    '--tw-prose-pre-bg': theme('colors.tttGray[800]'),
                    '--tw-prose-th-borders': theme('colors.tttGray[300]'),
                    '--tw-prose-td-borders': theme('colors.tttGray[200]'),
                    '--tw-prose-invert-body': theme('colors.tttGray[300]'),
                    '--tw-prose-invert-headings': theme('colors.tttWhite'),
                    '--tw-prose-invert-lead': theme('colors.tttGray[400]'),
                    '--tw-prose-invert-links': theme('colors.tttWhite'),
                    '--tw-prose-invert-bold': theme('colors.tttWhite'),
                    '--tw-prose-invert-counters': theme('colors.tttGray[400]'),
                    '--tw-prose-invert-bullets': theme('colors.tttGray[600]'),
                    '--tw-prose-invert-hr': theme('colors.tttGray[700]'),
                    '--tw-prose-invert-quotes': theme('colors.tttGray[100]'),
                    '--tw-prose-invert-quote-borders': theme('colors.tttGray[700]'),
                    '--tw-prose-invert-captions': theme('colors.tttGray[400]'),
                    '--tw-prose-invert-kbd': theme('colors.tttWhite'),
                    '--tw-prose-invert-kbd-shadows': theme('colors.tttWhite'),
                    '--tw-prose-invert-code': theme('colors.tttWhite'),
                    '--tw-prose-invert-pre-code': theme('colors.tttGray[300]'),
                    '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
                    '--tw-prose-invert-th-borders': theme('colors.tttGray[600]'),
                    '--tw-prose-invert-td-borders': theme('colors.tttGray[700]'),
                },
            },
        }),
    },
};
