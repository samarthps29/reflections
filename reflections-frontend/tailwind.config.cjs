/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{tsx,ts}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				inter: ["inter", "serif"],
				mono: ["Caveat"],
				serif: ["Poppins"],
			},
		},
	},
	plugins: [],
};
