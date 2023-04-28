const mongoose = require('mongoose')
const Post = require('./PostModel')

const userSchema = mongoose.Schema({
   username:{
        type:String,
        default:null
   },
   email:{
        type:String,
        unique:true
   },
   password:{
        type:String
   },
   token:{
        type:String
   },
   likedPosts:{
     type:Array,
     ref:Post
   }
})

module.exports = mongoose.model('user',userSchema)