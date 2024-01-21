const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const moment = require("moment");

class Post extends Model {}

Post.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
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
		user_name: {
			type: DataTypes.VIRTUAL,
			get() {
				return this.getDataValue("user") ? this.getDataValue("user").name : null;
			},
		},
		date: {
			type: DataTypes.DATE,
			get() {
				return moment(this.getDataValue("date")).format("MMM DD, YY");
			},
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		hook: {
			beforeUpdate: async postUpdate => {
				postUpdate.date = await new Date();
				return postUpdate;
			},
		},
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: "post",
	}
);

module.exports = Post;
