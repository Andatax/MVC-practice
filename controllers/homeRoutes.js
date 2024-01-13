const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const auth = require("../utils/authentication");

router.get("/", auth, async (req, res) => {
	try {
		const homePosts = await Post.findAll({
			include: {
				attributes: { exclude: ["password", "email"] },
				model: User,
				as: "user",
			},
		});
		const posts = homePosts.map(posts => posts.get({ plain: true }));

		res.render("home", {
			posts,
			logged_in: req.session.logged_in,
		});
		console.log(posts);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/signup", async (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/");
	} else {
		res.render("signup");
	}
});
router.get("/dashboard", auth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.userId, {
			attributes: { exclude: ["password"] },
			include: [{ model: Post }],
		});

		const user = userData.get({ plain: true });
		console.log(user);
		res.render("dashboard", {
			...user,
			loggedIn: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/posts/:id", auth, async (req, res) => {
	try {
		const commentsPostData = await Post.findByPk(req.session.userId, {
			include: [{ model: Comment }],
			order: [["date", "ASC"]],
		});

		const posts = commentsPostData.map(posts => posts.get({ plain: true }));

		res.render("post", {
			posts,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/login", (req, res) => {
	if (req.session.logged_in) {
		res.redirect("/");
		return;
	} else {
		res.render("login");
	}
});

module.exports = router;
