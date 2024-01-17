const User = require("./user");
const Post = require("./Post");
const Comment = require("./Comment");

Post.belongsTo(User, {
	foreignKey: "user_id",
	as: "user",
});
User.hasMany(Post, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
	hooks: true,
});
Post.belongsTo(User, {
	foreignKey: "user_id",
});
Post.hasMany(Comment, {
	foreignKey: "post_id",
	onDelete: "CASCADE",
	hooks: true,
});
Comment.belongsTo(Post, {
	foreignKey: "post_id",
});

User.hasMany(Comment, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
	hooks: true,
});
Comment.belongsTo(User, {
	foreignKey: "user_id",
	as: "user",
});

User.hasMany(Comment, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
	hooks: true,
});

module.exports = { User, Post, Comment };
