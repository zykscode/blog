import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  email: {
      type: String,
      required: true,
      unique: true
  },
  username: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  firstName: {
      type: String,
      default: null
  },
  lastName: {
      type: String,
      default: null
  },
  bio: {
      type: String,
      default: null
  },
  admin: {
      type: Boolean,
      default: false
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
});

export const Users = models.user||model('user', userSchema)
