import type { Config } from "tailwindcss";
import base from "../tailwind.config";

const config: Config = { ...base, content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "../src/**/*.{ts,tsx}"] };
export default config;
