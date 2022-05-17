import mongoose from 'mongoose'
import database from '../database/database'
import User from './user-model'

mongoose.connect(database.connectionString)

class UserController {
  registerUser(user) {
    console.log('Registrando um novo usuário no mongodb...')
    const newUser = new User(user)
    return newUser.save()
  }

  searchUser(idUser) {
    console.log("Buscando produtos no MongoDB...")
    const params = {}
    if(idUser !== undefined && idUser !== null) {
      params._id = idUser
      return User.findOne(params)
    }
    return User.find(params)
    }

  updateUser(idUser, update) {
    return User.findOneAndUpdate({_id: idUser}, update)
  }

  deleteUser(idUser) {
    return User.findOneAndDelete({_id: idUser})
  }
}

export default UserController