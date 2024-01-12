const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		body: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "user",
				key: "id",
			},
		},
		post_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "post",
				key: "id",
			},
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		hook: {
			beforeUpdate: async commentUpdate => {
				commentUpdate.date = await new Date();
				return commentUpdate;
			},
		},
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: "comment",
	}
);
module.exports = Comment;
