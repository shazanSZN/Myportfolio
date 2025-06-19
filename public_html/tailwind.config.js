/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './script.js',
        './styles.css',
        './assets/**/*.html',
        './assets/**/*.js'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                purple: '#7E74F1',
                'purple-light-1': '#EAE6FE',
                'purple-light-2': '#F5F3FE',
                cinder: '#232E35',
                'cinder-light': '#656D72',
                light: '#FBFBFB',
                'light-2': '#f1f1f1',
                'light-3': '#f5f5f5',
                'light-4': '#D9D9D9',
                'midnight-express': '#081c48',
                licorice: '#1A1F2C',
            },
            fontFamily: {
                primary: ['Inter', 'sans-serif'],
                secondary: ['Plus Jakarta Sans', 'serif'],
            },
            fontSize: {
                xs: '0.75rem',
                sm: '0.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
                '6xl': '4rem',
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                pulse: 'pulse 6s infinite alternate',
                rotate: 'rotate 30s linear infinite',
                zoom: 'zoom 0.3s ease',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                pulse: {
                    '0%': { opacity: '0.6', transform: 'scale(1)' },
                    '100%': { opacity: '0.9', transform: 'scale(1.05)' },
                },
                rotate: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                zoom: {
                    from: { transform: 'scale(0.7)' },
                    to: { transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
};
