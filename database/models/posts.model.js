


import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import commentModel from "./comments.model.js";


const postModel = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  content: {
    type: DataTypes.STRING(300),
    allowNull: false
  }
})

postModel.hasMany(commentModel, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

commentModel.belongsTo(postModel)

export default postModel