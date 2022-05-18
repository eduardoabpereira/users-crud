import UserController from './user-controller'
import express from 'express'
import User from './user-model'
import fs from 'fs'
const userRouter = express.Router()
const userController = new UserController()

//CREATE
userRouter.post('/register', (req, res, next) => {
  userController.registerUser(req.body)
  .then(user => res.status(200).send(user))
  .catch((err) => {
    if (User.findOne(req.body.email)) {
      return res.send('Error: usuário já existe')
    } else {
    console.log('Falha ao cadastrar usuário')
    return res.status(400).send('Falha ao cadastrar usuário').next()
  }
  })
})

//SEARCH
userRouter.get('/:_id', (req, res, next) => {
    userController.searchUser(req.params._id)
    .then(user => res.status(200).send(user))
    .catch((err) => {
      console.log('Falha ao encontrar usuário: ', err)
      next
    })
})

//SEARCH ALL
userRouter.get('/', (req, res, next) => {
  userController.searchUser()
  .then(users => res.status(200).send(users))
  .catch((err) => {
    console.log('Falha ao listar todos os produtos: ', err)
    next
  })
})

//UPDATE
userRouter.put('/update/:_id', (req, res, next) => {
  userController.updateUser(req.params._id, req.body)
  .then(user => res.status(200).send(user))
  .catch((err) => {
    console.log('Falha ao atualizar usuário: ', err)
    next
  })
})

//DELETE
userRouter.delete('/delete/:_id', (req, res, next) => {
  userController.deleteUser(req.params._id)
  .then(user => res.status(200).send(user))
  .catch((err) => {
    console.log('Falha ao deletar usuário: ', err)
    next
  })
})

//SAVE USER ON FILE
userRouter.get('/save/:_id', (req, res, next) => {
  userController.searchUser(req.params._id)
  .then(user => {
    res.status(200).send(user)
    const file = JSON.stringify(user)
    fs.writeFileSync('./usersSaved.json', file, {flag: 'a+'})
  })
  .catch(err => console.log('Algo deu errado: ', err))
})

export default userRouter