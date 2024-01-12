const sequelize = require("../config/connection");
const { Post, Comment, User } = require("../models");

const usersdb = require("./users.json");
const postsdb = require("./posts.json");
const commentsdb = require("./comments.json");

const seedDb = async () => {
	await sequelize.sync({ force: true });

	const users = await User.bulkCreate(usersdb, {
		individualHooks: true,
		returning: true,
	});
	for (const post of postsdb) {
		await Post.create({
			...post,
			user_id: users[Math.floor(Math.random() * users.length)].id,
		});
	}
	for (const comment of commentsdb) {
		await Comment.create({
			...comment,
			user_id: users[Math.floor(Math.random() * users.length)].id,
		});
	}
	process.exit(0);
};

seedDb();
