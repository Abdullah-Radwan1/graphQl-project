import type { Config } from "tailwindcss";

const config: Config = {
 content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
 ],
 theme: {
  extend: {
   colors: {
    primary: "#50C878",
    secondary: "#7CFC00",
   },
  },
 },
 plugins: [],
};
export default config;
