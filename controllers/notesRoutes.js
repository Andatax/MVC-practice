const router = require("express").Router();
const { User } = require("../models");
const authenticated = require("../utils/auth");

router.get("/", authenticated, async (req, res) => {
	try {
		const userNotes = await Note.findAll({
			order: [["date", "ASC"]],
		});

		const notes = userNotes.map(project => project.get({ plain: true }));

		res.render("notesPage", {
			notes,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
