import postModel from "../../../../database/models/posts.model.js"
import userModel from "../../../../database/models/users.model.js"


export const createPost = async (req, res) => {
  const userExist = await userModel.findByPk(req.body.UserId)

  if (userExist) {
    const post = await postModel.create(req.body)
    return res.status(201).json({ mesaage: "Done", post })
  }

  return res.status(404).json({ message: "User not found" })
}

export const readPost = async (req, res) => {
  const posts = await postModel.findAll({
    include: {
      model: userModel,
      attributes: {
        exclude: ['password', 'id']
      }
    }
  })

  return res.status(200).json({ message: "Done", posts })
}

export const updatePost = async (req, res) => {
  const { id } = req.params;

  const post = await postModel.update(req.body, {
    where: {
      id
    }
  })

  return post[0] ? res.status(200).json({ message: "Done", post }) : res.status(404).json({ message: "Not Found" })
}

export const deletePost = async(req, res) => {
  const { id } = req.params
  const post = await postModel.destroy({
    where: {
      id
    }
  })

  return post ? res.status(200).json({message: "Done"}) : res.status(404).json({message: "Not Found"})
}


export const specificPost = async(req, res) => {
  const {id} = req.params;

  const postExist = await postModel.findByPk(id)
  
  if (postExist) {
    const getPost = await postModel.findOne({
      where: {id},
      include: {
        model: userModel,
        attributes: {
          exclude: ['password']
        }
      },
      attributes: {
        exclude: ['UserId']
      }
    })
    return res.status(200).json({message: "Done", post: getPost})


  }

  return res.status(404).json({message})
}