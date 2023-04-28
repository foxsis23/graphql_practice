const Post = require('../models/PostModel')

module.exports = {
    getAllPosts:async() =>{
        const posts = await Post.find()

        return posts
    },
    getPost:async(parent,args) =>{
        const post = await Post.findById(args.id)
        
        return post
    },
    getByCategory: async(parent,args) =>{
        if(args.category){
            const posts = await Post.find({category:args.category})
            return posts
        }
        const posts = await Post.find()

        return posts
    }
}