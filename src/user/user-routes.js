import UserController from './user-controller'
import express from 'express'
const userRouter = express.Router()
const userController = new UserController()

//CREATE
userRouter.post('/register', (req, res, next) => {
  userController.registerUser(req.body)
  .then(user => res.status(200).send(user))
  .catch((err) => {
    console.log('Falha ao cadastrar usuário: ', err)
    next
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
userRouter.put('/:_id', (req, res, next) => {
  userController.updateUser(req.params._id, req.body)
  .then(user => res.status(200).send(user))
  .catch((err) => {
    console.log('Falha ao atualizar usuário: ', err)
    next
  })
})

//DELETE
userRouter.delete('/:_id', (req, res, next) => {
  userController.deleteUser(req.params._id)
  .then(user => res.status(200).send(user))
  .catch((err) => {
    console.log('Falha ao deletar usuário: ', err)
    next
  })
})

export default userRouter