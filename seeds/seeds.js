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

	const posts = await Post.bulkCreate(
		postsdb.map(post => ({
			...post,
			user_id: users[Math.floor(Math.random() * users.length)].id,
		}))
	);
	for (const comment of commentsdb) {
		const randomUser = users[Math.floor(Math.random() * users.length)];
		await Comment.create({
			...comment,
			user_id: randomUser.id,
			post_id: posts[Math.floor(Math.random() * posts.length)].id,
			user_name: randomUser.name,
		});
	}
	process.exit(0);
};

seedDb();
