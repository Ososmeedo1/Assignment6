
import { Sequelize } from "sequelize";


const sequelize = new Sequelize('mysql://u3p9fi3ifbcnt3ej:oG6B8VCfrk0ptv0BaDHn@b8praf0lutrx15kmeuru-mysql.services.clever-cloud.com:3306/b8praf0lutrx15kmeuru')


sequelize.authenticate().then(() => {
  console.log("DB connected");
})
.catch((error) => {
  console.log("fail to connect");
})

export default sequelize;

// any comment