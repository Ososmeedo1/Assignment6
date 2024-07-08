import commentModel from "../../../../database/models/comments.model.js";
import postModel from "../../../../database/models/posts.model.js";
import userModel from "../../../../database/models/users.model.js";
import bcrypt from 'bcrypt'

export const signUp = async (req, res) => {
  const { email, password } = req.body;

  const userExist = await userModel.findOne({
    where: { email }
  })

  if (userExist) {
    return res.status(409).json({ message: "Email already exists" })
  }

  const hashPassword = bcrypt.hashSync(password, 8);
  req.body.password = hashPassword;

  const newUser = await userModel.create(req.body)
  return res.status(201).json({ message: "Done" })
}

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  const userExist = await userModel.findOne({
    where: { email }
  })

  if (userExist) {
    const match = bcrypt.compareSync(password, userExist.password)
    if (match) {
      return res.status(200).json({ message: "Done", user: userExist.id })
    }
    return res.status(400).json({ message: "Invalid Email or Password" })
  }

  return res.status(400).json({ message: "Invalid Email or Password" })
}

export const specificUser = async (req, res) => {

  const { userId, postId } = req.params;

  const userExist = await userModel.findOne({
    where: {
      id: userId
    },
    attributes: {
      exclude: ['password']
    }
  })
  console.log(userExist);

  if (userExist) {
    const post = await postModel.findOne({
      where: {
        id: postId
      },
      attributes: {
        exclude: ['UserId']
      }
    })

    const comments = await commentModel.findAll({
      where: {
        PostId: postId
      },
      attributes: {
        exclude: ['PostId', 'UserId']
      }
    })



    return res.status(200).json({ message: "Done", userExist, post, comments })
  }


  return res.status(404).json({ message: "Not Found" })
}