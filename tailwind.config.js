/** @type {import('../tailwindcss').Config} */
module.exports = {
	purge: false,
	content: [
		"./views/layouts/*.handlebars",
		"./views/*.handlebars",
		"./views/partials/*.handlebars",
		"./views/commentsView.handlebars",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
