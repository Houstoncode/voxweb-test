import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  login: String,
  name: String,
  surname: String,
  password: String,
})

export default mongoose.model('User', userSchema)
