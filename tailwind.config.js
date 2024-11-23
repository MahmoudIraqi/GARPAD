// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./*.html", "./assets/js/*.js"],
  prefix: "tw-", // Apply prefix for all Tailwind classes
  theme: {
    extend: {
      colors: {
        primary: "#3B5B32",
        secondary: {
          main: "#DBCABB",
          sub_main: "#90742F",
          sub_main_50: "rgba(144,116,47,0.5)",
          sub_main_25: "rgba(144,116,47,0.25)",
          second_main: "rgba(219,202,187,0.35)"
        },
        white: {
          100: "#FFFFFF",
          60: "rgba(255,255,255,0.6)",
          40: "rgba(255,255,255,0.4)",
          0: "rgba(255,255,255,0)"
        },
        black:{
          100: "#000000",
          75: "rgba(0,0,0,0.75)",
          50: "rgba(0,0,0,0.5)",
          5: "rgba(0,0,0,0.05)",
        },
        gradient_bg:{
          1: "linear-gradient(267.8deg, rgba(144, 116, 47, 0.5) -8.42%, rgba(255, 255, 255, 0) 210.43%)"
        },
        text: "#2C3E24"
      },
      fontFamily: {
        'normal': ['"HelveticaNeueLT Arabic 55 Roman"'],
        'bold': ['"HelveticaNeueLT Arabic 75 Bold"'],
      },
    },
  },
  plugins: [],
}
