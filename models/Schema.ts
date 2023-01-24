import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  username:String, 
  email:String,  
  password:String  
})


export const Users = models.user||model('user', userSchema)
