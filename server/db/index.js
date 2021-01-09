import mongoose from 'mongoose'

import User from './user.schema.js'

mongoose
  .connect(
    'mongodb+srv://houston:199056@cluster0.6pycj.mongodb.net/voxweb?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('moongoose connect')
  })
  .catch((error) => {
    console.log(error)
  })

export default User
