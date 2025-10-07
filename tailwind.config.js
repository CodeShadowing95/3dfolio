/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx}"];
export const mode = "jit";
export const theme = {
    extend: {
        colors: {
            primary: "#050816",
            secondary: "#aaa6c3",
            tertiary: "#151030",
            "black-100": "#100d25",
            "black-200": "#090325",
            "white-100": "#f3f3f3",
        },
        boxShadow: {
            card: "0px 35px 120px -15px #211e35",
        },
        screens: {
            xs: "450px",
        },
        backgroundImage: {
            "hero-pattern": "url('/src/assets/herobg.png')",
        },
        keyframes: {
            "accordion-down": {
                from: {
                    height: "0",
                },
                to: {
                    height: "var(--radix-accordion-content-height)",
                },
            },
            "accordion-up": {
                from: {
                    height: "var(--radix-accordion-content-height)",
                },
                to: {
                    height: "0",
                },
            },
            "fade-out": {
                from: {
                    opacity: "1",
                },
                to: {
                    opacity: "0",
                },
            },
            "fade-in": {
                from: {
                    opacity: "0",
                },
                to: {
                    opacity: "1",
                },
            },
            "scale-in": {
                from: {
                    transform: "scale(0.95)",
                    opacity: "0",
                },
                to: {
                    transform: "scale(1)",
                    opacity: "1",
                },
            },
            "slide-up": {
                from: {
                    transform: "translateY(20px)",
                    opacity: "0",
                },
                to: {
                    transform: "translateY(0)",
                    opacity: "1",
                },
            },
            "progress-fill": {
                from: {
                    width: "0%",
                },
                to: {
                    width: "100%",
                },
            },
            "portal-left": {
                from: {
                    transform: "translateX(0)",
                },
                to: {
                    transform: "translateX(-100%)",
                },
            },
            "portal-right": {
                from: {
                    transform: "translateX(0)",
                },
                to: {
                    transform: "translateX(100%)",
                },
            },
        },
        animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            "fade-out": "fade-out 0.6s ease-out forwards",
            "fade-in": "fade-in 0.6s ease-out forwards",
            "scale-in": "scale-in 0.6s ease-out forwards",
            "slide-up": "slide-up 0.6s ease-out forwards",
            "progress-fill": "progress-fill 2s ease-out forwards",
            "portal-left": "portal-left 0.8s ease-in-out forwards",
            "portal-right": "portal-right 0.8s ease-in-out forwards",
        },
    },
};
export const plugins = [];