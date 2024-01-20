const router = require("express").Router();
const { Post } = require("../../models");
const auth = require("../../utils/authentication");
const { Comment } = require("../../models");

router.post("/", auth, async (req, res) => {
	const { title, body } = req.body;
	try {
		const newPost = await Post.create({
			title,
			body,
			userId: req.session.user_id,
		});
		res.status(200).json(newPost);
		console.log(newPost);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});
// router.post("/comment", auth, async (req, res) => {
// 	const { body } = req.body;
// 	console.log("error is after creating new comment");
// 	try {
// 		const newComment = await Comment.create({
// 			body,
// 			userId: req.session.user_id,
// 		});
// 		res.redirect("/");
// 	} catch (err) {
// 		console.log("error in route /comment");
// 		console.log(err);
// 	}
// });

router.post("/comment", auth, async (req, res) => {
	const { body, postId } = req.body;
	try {
		const newComment = await Comment.create({
			body,
			user_id: req.session.user_id,
			post_id: req.body.post_id,
		});
		res.redirect("/");
		console.log(newComment);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});
router.delete("/:id", async (req, res) => {
	try {
		console.log(req.params);
		const postData = await Post.destroy({
			where: { id: req.params.id },
		});

		if (!postData) {
			res.status(404).json({ message: "Post not found" });
			return;
		}

		res.status(200).json(postData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/posts/:id", auth, async (req, res) => {
	const { title, body } = req.body;
	try {
		const newComment = await Comment.create({
			body,
			userId: req.session.user_id,
			postId: req.params.id,
		});
		res.status(200).json(newComment);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get("/commentDelete/:id", async (req, res) => {
	try {
		const commentData = await Comment.destroy({
			where: { id: req.params.id },
		});
		res.redirect("/");
		res.status(200).json(commentData);
		if (!commentData) {
			res.status(404).json({ message: "Commment not found" });

			return;
		}
	} catch (err) {
		res.redirect("/");
		console.log(err);
		res.status(500).json(err);
	}
});

router.get("/postDelete/:id", async (req, res) => {
	try {
		console.log(req.params);
		const postData = await Post.destroy({
			where: { id: req.params.id },
		});

		if (!postData) {
			res.status(404).json({ message: "Post not found" });
			return;
		}
		res.redirect("/");
	} catch (err) {
		res.redirect("/");
		console.log(err);
		return res.status(500).json(err);
	}
});
module.exports = router;
