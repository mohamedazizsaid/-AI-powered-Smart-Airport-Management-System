/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                airport: {
                    blue: '#1e3a8a',
                    accent: '#3b82f6',
                    dark: '#0f172a',
                    success: '#10b981',
                    warning: '#f59e0b',
                    danger: '#ef4444',
                }
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
