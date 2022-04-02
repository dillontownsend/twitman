const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', 'Work Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'twitterBlue': '#1DA1F2',
                'twitterDarkest': '#15202B',
                'twitterDarker': '#192734',
                'twitterDark': '#223036',
                'twitterGrey': '#8899A6',
            },
        },
        
    },
    plugins: [

    ],
}
