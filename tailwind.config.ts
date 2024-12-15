/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';
import { tttTailwindTheme } from './src/app/themes.config';
import typographyPlugin from '@tailwindcss/typography';
// @ts-expect-error no declared types at this time
import primeUiPlugin from 'tailwindcss-primeui';

const config: Config = {
    content: ['./src/**/*.{html,ts}'],
    darkMode: 'selector',
    theme: tttTailwindTheme,
    plugins: [primeUiPlugin, typographyPlugin],
};

export default config;
