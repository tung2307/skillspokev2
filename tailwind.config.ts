import { type Config } from "tailwindcss";
const { withUt } = require("uploadthing/tw");

export default withUt({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
}) satisfies Config;
