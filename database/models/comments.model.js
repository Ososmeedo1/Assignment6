import { DataTypes } from "sequelize";
import sequelize from "../connection.js";


const commentModel = sequelize.define('Comment', {
  content: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
})



export default commentModel;

