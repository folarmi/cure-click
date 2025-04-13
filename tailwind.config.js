/** @type {import('tailwindcss').Config} */
const { colors } = require("@radix-ui/colors");
const radixColors = require("@radix-ui/colors");

console.log("config", colors);

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        iris_1: "#FDFDFF",
        iris_2: "#F8F8FF",
        iris_3: "#F0F1FE",
        iris_4: "#E6E7FF",
        iris_5: "#DADCFF",
        iris_6: "#CBCDFF",
        iris_8: "#9B9EF0",
        iris_12: "#272962",
        iris_9: "#5B5BD6",
        text: "#1C2024",
        gray_2: "#F9F9F9",
        gray_3: "#F0F0F0",
        gray_4: "#E8E8E8",
        // Stopped at gray_9
        gray_9: "#8D8D8D",
        gray_10: "#838383",
        gray_11: "#646464",
        gray_12: "#202020",
        alpha_3: "rgba(0, 71, 241, 0.07)",
        suc_alpha_3: "rgba(0, 164, 51, 0.1)",
        suc_alpha_11: "rgba(0, 113, 63, 0.87)",
        alpha_9: "#0009321F",
        gray_bg: "#fcfcfc",
        neutral_7: "#00062E32",
        neutral_8: "#000830",
        neutral_9: "#8B8D98",
        neutral_11: "#60646C",
        neutral_12: "#60646C",
        grass_9: "#46A758",
        indigo_12: "#1F2D5C",
        gray_Alpha_3: "#0000000F",
        orange_10: "#EF5F00",
        accent_9: "#3E63DD",
        neutral_alpha_2: "#00005506",
        neutral_alpha_3: "#0000330F",
        neutral_alpha_6: "#00002F26",
        neutral_alpha_7: "#00062E32",
        neutral_alpha_11: "#0007149F",
        accent_alpha_11: "#002BB7C5",
        accent_alpha_3: "#0047F112",
        accent_alpha_3: "#0047F112",
        warning_9: "#FFC53D",
        error_9: "#E5484D",
        error_alpha_9: "#C40006D3",
        black_contrast: "#1C2024",
        tokens_colors_text: "#1C2024",
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        bg: "var(--color-bg)",
        // radix colors
        ...radixColors.blueA,
        ...radixColors.gray,
        ...radixColors.cyanA,
        ...radixColors.iris,
        ...radixColors.irisA,
        ...radixColors.grass,
        ...radixColors.grassA,
        ...radixColors.skyA,
        ...radixColors.tomato,
        ...radixColors.tomatoA,
        ...radixColors.greenA,
        ...radixColors.indigo,
      },
      boxShadow: {
        "auth-shadow":
          "0 8px 40px 0 rgba(0, 0, 0, 0.05), 0 12px 32px -16px rgba(0, 0, 51, 0.06)",
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ":root": {
          "--color-iris9": theme("colors.iris9"),
          "--color-cyanA12": theme("colors.cyanA12"),
        },
      });
    },
  ],
};
