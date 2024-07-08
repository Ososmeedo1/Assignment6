import commentModel from "../../../../database/models/comments.model.js"
import postModel from "../../../../database/models/posts.model.js"
import userModel from "../../../../database/models/users.model.js"


export const createComment = async (req, res) => {
  const userExist = await userModel.findByPk(req.body.UserId)
  const postExist = await postModel.findByPk(req.body.PostId)

  if (userExist && postExist) {
    const comment = await commentModel.create(req.body)
    return res.status(201).json({ message: "Done", comment })
  }

  return res.status(404).json({ message: "Not Found" })

}

export const readComment = async (req, res) => {
  const comments = await commentModel.findAll({
    include: [
      {
        model: userModel,
        attributes: {
          exclude: ['id', 'password']
        }  
      },
      {
        model: postModel,
        attributes: {
          exclude: ['id']
        }
      }
    ]
  })

  res.status(200).json({ message: "Done", comments })
}

export const updateComment = async(req, res) => {
  const {id} = req.params
  
  const comment = await commentModel.update(req.body, {
    where: {
      id
    }
  })

  return comment[0] ? res.status(200).json({message: "Done"}) : res.status(404).json({message: "Not found"})
}

export const deleteComment = async(req, res) => {
  const {id} = req.params;

  const comment = await commentModel.destroy({
    where: {
      id
    }
  })

  return comment ? res.status(200).json({message: "Done"}) : res.status(404).json({message: "Not Found"})
}


