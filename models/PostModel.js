const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        default:'',
    },
    description:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:''
    },
    category:{
        type:String,
        default:''
    }
})

module.exports = mongoose.model('post',PostSchema)