import { ThemeType } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

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

export const tttPrimeNgTheme: ThemeType = {
    options: {
        darkModeSelector: '.dark',
        cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
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
                        0: '{gray.0}',
                        50: '{gray.50}',
                        100: '{gray.100}',
                        200: '{gray.200}',
                        300: '{gray.300}',
                        400: '{gray.400}',
                        500: '{gray.500}',
                        600: '{gray.600}',
                        700: '{gray.700}',
                        800: '{gray.800}',
                        900: '{gray.900}',
                        950: '{gray.950}',
                    },
                    primary: {
                        color: '{primary.500}',
                        contrastColor: '{surface.900}',
                    },
                    highlight: {
                        color: '{primary.700}',
                    },
                    formField: {
                        focusBorderColor: '{primary.color}',
                        floatLabelFocusColor: '{primary.color}',
                        floatLabelActiveColor: '{primary.color}',
                    },
                    list: {
                        option: {
                            icon: {
                                focusColor: '{primary.500}',
                            },
                        },
                    },
                    navigation: {
                        item: {
                            icon: {
                                focusColor: '{primary.500}',
                                activeColor: '{primary.500}',
                            },
                        },
                        submenuIcon: {
                            focusColor: '{primary.500}',
                            activeColor: '{primary.500}',
                        },
                    },
                },
                dark: {
                    surface: {
                        0: tttWhite,
                        50: '{gray.50}',
                        100: '{gray.100}',
                        200: '{gray.200}',
                        300: '{gray.300}',
                        400: '{gray.400}',
                        500: '{gray.500}',
                        600: '{gray.600}',
                        700: '{gray.700}',
                        800: '{gray.800}',
                        900: '{gray.900}',
                        950: '{gray.950}',
                    },
                    primary: {
                        color: '{primary.500}',
                        contrastColor: '{surface.0}',
                    },
                    highlight: {
                        color: '{primary.300}',
                    },
                    formField: {
                        focusBorderColor: '{primary.color}',
                        floatLabelFocusColor: '{primary.color}',
                        floatLabelActiveColor: '{primary.color}',
                    },
                    list: {
                        option: {
                            icon: {
                                focusColor: '{primary.500}',
                            },
                        },
                    },
                    navigation: {
                        item: {
                            icon: {
                                focusColor: '{primary.500}',
                                activeColor: '{primary.500}',
                            },
                        },
                        submenuIcon: {
                            focusColor: '{primary.500}',
                            activeColor: '{primary.500}',
                        },
                    },
                },
            },
        },
    }),
};
