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
	} catch (err) {
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
		if (!commentData) {
			res.status(404).json({ message: "Commment not found" });
			return;
		}

		res.status(200).json(commentData);
	} catch (err) {
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

		res.status(200).json(postData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});
module.exports = router;
