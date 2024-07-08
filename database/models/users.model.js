import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import postModel from "./posts.model.js";
import commentModel from "./comments.model.js";


const userModel = sequelize.define('User', {
  name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(150),
    allowNull: false
  }
})

userModel.hasMany(postModel, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
postModel.belongsTo(userModel)

userModel.hasMany(commentModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

commentModel.belongsTo(userModel)

export default userModel