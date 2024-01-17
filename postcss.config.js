const purgecss = require("@fullhuman/postcss-purgecss");
const cssnano = require("cssnano");
module.exports = {
	plugins: [
		require("tailwindcss"),
		require("autoprefixer"),
		cssnano({
			preset: "default",
		}),
		purgecss({
			content: ["./views/layouts/*.handlebars", "./views/*.handlebars", "./views/partials/*.handlebars", "./views/commentsView.handlebars"],
			defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
		}),
	],
};
