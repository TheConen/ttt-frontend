import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';

export const tttRed = '#a10f2b';
export const tttGray = '#40403e';
export const tttWhite = '#f5f3f2';
export const tttBlack = '#191919';
export const tttGreen = '#c6cfba';

export const tttPrimeNgTheme = definePreset(Aura, {
    primitive: {
        red: {
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
        },
        gray: {
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
        },
    },
    semantic: {
        primary: {
            50: '{red.50}',
            100: '{red.100}',
            200: '{red.200}',
            300: '{red.300}',
            400: '{red.400}',
            500: '{red.500}',
            600: '{red.600}',
            700: '{red.700}',
            800: '{red.800}',
            900: '{red.900}',
            950: '{red.950}',
        },
        colorScheme: {
            light: {
                surface: {
                    0: tttWhite,
                    50: '{surface.50}',
                    100: '{surface.100}',
                    200: '{surface.200}',
                    300: '{surface.300}',
                    400: '{surface.400}',
                    500: '{surface.500}',
                    600: '{surface.600}',
                    700: '{surface.700}',
                    800: '{surface.800}',
                    900: '{surface.900}',
                    950: '{surface.950}',
                },
                primary: {
                    color: '{primary.500}',
                },
            },
            dark: {
                surface: {
                    0: tttWhite,
                    50: '{surface.50}',
                    100: '{surface.100}',
                    200: '{surface.200}',
                    300: '{surface.300}',
                    400: '{surface.400}',
                    500: '{surface.500}',
                    600: '{surface.600}',
                    700: '{surface.700}',
                    800: '{surface.800}',
                    900: '{surface.900}',
                    950: '{surface.950}',
                },
                primary: {
                    color: '{primary.500}',
                },
            },
        },
    },
});
