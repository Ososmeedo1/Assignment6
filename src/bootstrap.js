import sequelize from "../database/connection.js";
import commentRouting from "./modules/comments/comment.routes.js";
import postRouting from "./modules/posts/post.routes.js";
import userRouting from "./modules/users/user.routes.js";



const bootstrap = (app, express) => {
  app.use(express.json());
  sequelize.sync({alter: false})
  app.use('/users', userRouting)
  app.use('/posts', postRouting)
  app.use('/comments', commentRouting)
  app.use('*', (req, res) => {
    return res.json({message: "Not Found"})
  })
}

export default bootstrap