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
			user_id: req.session.user_id,
		});
		res.status(200).json(newPost);
		console.log(newPost);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

// router.post("/update", auth, async (req, res) => {
// 	const { id, title, body } = req.body;

// 	try {
// 		console.log("Update request received:", { id, title, body, user_id: req.session.user_id });

// 		const [, updatedPost] = await Post.update(
// 			{ title, body },
// 			{ where: { id, user_id: req.session.user_id } }
// 		);

// 		console.log("Updated post:", updatedPost);

// 		if (updatedPost === 1) {
// 			res.status(200).json({ message: "Post updated successfully" });
// 		} else {
// 			res.status(404).json({ message: "Post not found or user unauthorized" });
// 		}
// 	} catch (err) {
// 		console.log("Error updating post:", err);
// 		res.status(500).json({ message: "Internal Server Error" });
// 	}
// });

router.post("/comment", auth, async (req, res) => {
	const { body, post_id } = req.body;
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
