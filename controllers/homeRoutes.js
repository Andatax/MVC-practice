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
		console.log(err);
		res.status(500).json(err);
	}
});

router.get("/signup", async (req, res) => {
	if (req.session.logged_in) {
		res.redirect("/");
	} else {
		res.render("signup");
	}
});
router.get("/dashboard", auth, async (req, res) => {
	try {
		console.log(req.session.user_id);
		const postData = await Post.findAll({
			where: { user_id: req.session.user_id },
			include: [{ model: User, as: "user", attributes: { exclude: ["password", "email"] } }],
		});

		const posts = postData.map(posts => posts.get({ plain: true }));
		console.log(posts);
		res.render("dashboard", {
			posts,
			loggedIn: req.session.logged_in,
		});
	} catch (err) {
		console.error("Error:", err);
	}
});

router.get("/post/:id", auth, async (req, res) => {
	try {
		const postId = req.params.id;
		// console.log(`PostId:, ${postId}`);
		const post = await Post.findByPk(postId, {
			include: [
				{
					model: Comment,
					include: [{ model: User, as: "user", attributes: { exclude: ["password", "email"] } }],
				},
				{ model: User, as: "user", attributes: { exclude: ["password", "email"] } },
			],
			order: [["date", "ASC"]],
		});
		console.log("post.datavalues variable---------------------------");
		console.log(post.dataValues);
		const postComments = post.comments.map(comment => comment.get({ plain: true }));
		// console.log("postComments variable---------------------------");
		// console.log(postComments);
		const user = post.user.get({ plain: true });
		// console.log("user variable---------------------------");
		// console.log(user);
		res.render("singlePost", {
			post: post.dataValues,
			comments: postComments,
			user: user,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		console.log(err);
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
