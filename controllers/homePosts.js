const router = require("express").Router();
const { User } = require("../models");
const authenticated = require("../utils/authentication");

router.get("/", authenticated, async (req, res) => {
	try {
		const userPosts = await Post.findAll({
			order: [["date", "ASC"]],
		});

		const posts = userPosts.map(project => project.get({ plain: true }));

		res.render("login", {
			notes,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/login", (req, res) => {
	// If a session exists, redirect the request to the homepage
	if (req.session.logged_in) {
		res.redirect("/");
		return;
	}

	res.render("login");
});

module.exports = router;
