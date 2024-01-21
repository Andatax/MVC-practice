const router = require("express").Router();
const { User } = require("../../models");
router.post("/login", async (req, res) => {
	try {
		const userInfo = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		if (!userInfo) {
			return res.status(400).json({ message: "Incorrect email or password, please try again" });
		}
		const validatePassword = await userInfo.checkPassword(req.body.password);
		if (!validatePassword) {
			return res.status(400).json({ message: "Incorrect email or password, please try again" });
		}
		req.session.save(() => {
			req.session.logged_in = true;
			req.session.user_id = userInfo.id;
			res.status(200).json({ user: userInfo, message: "Logged in successfully" });
			console.log(req.session);
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get("/logout", (req, res) => {
	console.log(req.session.logged_in);
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.redirect("/login");
		});
	} else {
		res.redirect("/login");
	}
});

router.post("/signup", async (req, res) => {
	try {
		const { email, password,name } = req.body;
		const userInfo = await User.create({ email, password,name });

		req.session.logged_in = true;
		req.session.user_id = userInfo.id;
		res.status(200).json(userInfo);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
