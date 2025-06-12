// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        slideDown: "slideDown 0.5s ease-out forwards",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
};

