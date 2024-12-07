tailwind.config = {
  darkMode: "class",
  prefix: "tw-", // Apply prefix for all Tailwind classes
  theme: {
    extend: {
      colors: {
        primary: "#3B5B32",
        secondary: "#B9CB31",
        yellow:{
          new_main: "#EBBC47",
          main: "#DBCABB",
          sub_main: "#90742F",
          sub_main_50: "rgba(144,116,47,0.5)",
          sub_main_25: "rgba(144,116,47,0.25)",
          second_main: "rgba(219,202,187,0.35)"
        },
        white: {
          100: "#FFFFFF",
          65: "rgba(255,255,255,0.65)",
          60: "rgba(255,255,255,0.6)",
          40: "rgba(255,255,255,0.4)",
          25: "rgba(255,255,255,0.25)",
          0: "rgba(255,255,255,0)"
        },
        black:{
          100: "#000000",
          75: "rgba(0,0,0,0.75)",
          50: "rgba(0,0,0,0.5)",
          5: "rgba(0,0,0,0.05)",
        },
        gray:{
          main: "#DDDDDD",
          secondary: "#F2F2F2",
          text: "#C4C4C4",
          25: "rgba(221,221,221,0.25)"
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
      boxShadow:{
        'lg': '0px 4px 4px rgba(59, 91, 50, 0.35), inset 0px 0px 1px rgba(59, 91, 50, 0.35)',
        'md': '0px 4px 4px rgba(0, 0, 0, 0.5)',

      }
    },
  },
}
