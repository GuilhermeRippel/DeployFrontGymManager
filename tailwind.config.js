import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        Pump: {
            "0%": { transform: 'scale(0.5)', opacity: "0", visibility: "hidden" },
            "50%": { transform: 'scale(1.02)', opacity: "0.5", visibility: "visible" },
            "100%": { transform: 'scale(1)', opacity: "1", visibility: "visible" },
          },
          Pump2: {
            "0%": { transform: 'scale(0.5)', opacity: "0", visibility: "hidden" },
            "50%": { transform: 'scale(1.02)', opacity: "0.5", visibility: "visible" },
            "100%": { transform: 'scale(1)', opacity: "1", visibility: "visible" },
          },
          Pump3: {
            "0%": { transform: 'scale(0.5)', opacity: "0", visibility: "hidden" },
            "50%": { transform: 'scale(1.02)', opacity: "0.5", visibility: "visible" },
            "100%": { transform: 'scale(1)', opacity: "1", visibility: "visible" },
          },
          RotateY: {
            from: {transform: "rotateY(0deg)"},
            to: {transform: "rotateY(360deg)"},
          },
          ShowMenu: {
            from: {transform: "translateX(30%) translateY(-35%) scale(0)", opacity: "0"},
            to: {transform: "translateX(0) translateY(0) scale(1)", opacity: "1"},
          },
          HiddenMenu: {
            from: {transform: "translateX(0) translateY(0) scale(1)", opacity: "1"},
            to: {transform: "translateX(30%) translateY(-35%) scale(0)", opacity: "0"},
          },
          RightToLeft: {
            from: {transform: "translateX(160%)", opacity: "0.2"},
            to: {transform: "translateX(0)", opacity: "1"},
          }
      },
      animation: {
        Pump: 'Pump 0.8s ease-out forwards 0s',
        Pump2: 'Pump 0.8s ease-out forwards 0.2s',
        Pump3: 'Pump 0.8s ease-out forwards 0.4s',
        RotateY: 'RotateY 1.2s ease-out  0.7s',
        ShowMenu: 'ShowMenu 0.25s ease-out',
        HiddenMenu: 'HiddenMenu 0.25s ease-out forwards',
        RightToLeft: 'RightToLeft 0.4s ease-out',
      },
      fontFamily: {
         montserrat: ["Monstserrat", "sans-serif"]
      },
      boxShadow: {
        'inner-lg': 'inset 0 4px 8px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}