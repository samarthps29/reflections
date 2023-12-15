/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{tsx,ts}"],
	darkMode: "class",
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
		},
		extend: {
			fontFamily: {
				inter: ["inter", "serif"],
				serif: ["Poppins"],
			},
		},
	},
	plugins: [],
};
