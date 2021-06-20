const newsModel = require('../model/query')
const { rows } = require('../../database/pg')
const { sign, verify } = require('../../function/jwt')

const signup = async(req, res) => {
    const { username, firstname, lastname, email, password, confpassword } = req.body  
    if (password === confpassword) {  
      const checkUsername = await rows(newsModel.CHECK_USERNAME, username.toLowerCase())
      const checkEmail = await rows(newsModel.CHECK_EMAIL, email)  
      if (checkUsername.length > 0) {
        return res.send({message:'this is username alredy token'}).status(401)
      } else if(checkEmail.length > 0) {
        return res.send({message:'this is email alredy token'}).status(401)
      } else {
        const [ { user_id, name } ] = await rows(newsModel.SIGNUP, username.toLowerCase(), firstname, lastname, email, password)
        const accessToken = sign({user_id, name})
        return res.send({accessToken, message:'user succesfully signup'}).status(200)
      }
    } else {
      return res.send({message:'parolni turlicha kirittingiz'}).status(400)
    }
}

const login = async(req, res) => {

    const { username, password } = req.body
  
    try {
      const foundUser = await rows(newsModel.LOGIN, username.toLowerCase(), password)
  
      if(foundUser.length) {
        const [{ user_id, name }] = foundUser
        const accessToken = sign({user_id, name})
        res.send({accessToken}).status(201)
      }else{
        res.send({message: 'login yoki parol xato'})
      }
  
    } catch (error) {
      console.log(error.message)
      res.status(400).send({status: 400, error: message})
    }
  
}


module.exports = {
    signup,
    login,
}