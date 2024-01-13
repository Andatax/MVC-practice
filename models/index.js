const User = require("./user");
const Post = require("./Post");
const Comment = require("./Comment");

Post.belongsTo(User, {
	foreignKey: "user_id", // foreign key in the Post model
	as: "user", // alias for the association
});

module.exports = { User, Post, Comment };
