import express from 'express'
import passport from 'passport'
import passportLocal from 'passport-local'
import morgan from 'morgan'
import expressSession from 'express-session'
import mongoose from 'mongoose'
import omit from 'lodash/omit.js'
import User from './db/index.js'

passport.use(
  new passportLocal.Strategy(
    { usernameField: 'login', passwordField: 'password' },
    function (login, password, cb) {
      User.findOne({ login }, (err, user) => {
        if (err) {
          return cb(err)
        }

        if (!user) {
          return cb(null, false)
        }

        if (user.password !== password) {
          return cb(null, false)
        }

        return cb(null, user)
      })
    }
  )
)

const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.get('/', function (req, res) {
  res.send('Its api page')
})

app.get('/user', function (req, res) {
  res.send(req.user)
})

passport.serializeUser(function (user, cb) {
  cb(null, user.id)
})

passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    if (err) {
      return cb(err)
    }

    cb(null, user)
  })
})

app.post('/user/settings', (req, res) => {
  const { user, body } = req

  if (!user) {
    return res.status(419).send({
      success: false,
      logOut: true,
      message: 'Время действия сессии закончилось',
    })
  }

  User.findOneAndUpdate(
    { login: user.login },
    body,
    { upsert: true },
    async (err, doc) => {
      if (err)
        return res.status(500).send({
          success: false,
          message: 'Произошла ошибка, попробуйте позже',
        })

      const findUser = await User.findOne({ login: doc.login })

      return res.send({
        success: true,
        message: 'Успешно сохранено',
        user: findUser,
      })
    }
  )
})

app.post('/auth/login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err)

    if (!user) {
      res.status(401).send({
        success: false,
        message: 'Неправильный логин или пароль',
      })
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }

      return res.send({ success: true, user })
    })
  })(req, res, next)
})

app.post('/auth/register', async function (req, res) {
  const { login, name, surname, password } = req.body
  const id = new mongoose.Types.ObjectId()

  const findUser = await User.findOne({ login })

  if (findUser) {
    return res.status(401).send({
      success: false,
      message: 'Данный пользователь уже зарегистрирован!',
    })
  }

  const user = await User.create({
    _id: id,
    login,
    name,
    surname,
    password,
  })

  req.logIn(user, function (err) {
    if (err)
      return res.status(500).send({
        success: false,
        message: 'Произошла ошибка, попробуйте позже',
      })

    return res.send({ success: true, user: omit(user, 'password') })
  })
})

app.get('/logout', function (req, res) {
  req.logout()
})

app.get('/user/profile', function (req, res) {
  if (!req.user) {
    return res.status(419).send({
      success: false,
      message: 'Время действия сессии закончилось',
    })
  }

  return res.send(req.user)
})

app.listen(3003)
