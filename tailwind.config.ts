/** @type {import('tailwindcss').Config} */
import { tttTailwindTheme } from './src/app/themes.config';

export default {
    content: ['./src/**/*.{html,ts}'],
    theme: tttTailwindTheme,
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require('tailwindcss-primeui')],
};
