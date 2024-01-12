const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res) => {
	try {
		const userInfo = await User.findOne({ where: { email: req.body.email } });
		res.render("main", {
			notes,
			logged_in: req.session.logged_in,
		});
		if (!userInfo) {
			res.status(400).json({ message: "Incorrect email or password, please try again" });
			return;
		}

		const validPassword = await userInfo.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({ message: "Incorrect email or password, please try again" });
			return;
		}

		req.session.save(() => {
			req.session.user_id = userInfo.id;
			req.session.logged_in = true;

			res.json({ user: userInfo, message: "You are now logged in!" });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post("/logout", (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

router.post("/signup", async (req, res) => {
	try {
		const { email, password } = req.body;
		const userInfo = await User.create({ email, password });

		req.session.loggedIn = true;
		req.session.userId = userInfo.id;
		res.status(200).json(userInfo);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
