import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { tttGrayPalette, tttRedPalette, tttWhite } from './themes.config';

// When this is in the same file as the tailwind theme config, compilation will fail
export const tttPrimeNgTheme = {
    options: {
        cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
        },
    },
    preset: definePreset(Aura, {
        primitive: {
            red: tttRedPalette,
            gray: tttGrayPalette,
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
    }),
};
