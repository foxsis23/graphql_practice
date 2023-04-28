const Post = require('../models/PostModel')
const User = require('../models/User')

module.exports = {
    createPost:async(parent,args,context,info) =>{
        const {title,description,image,category} = args

        const post = new Post({title,description,image,category})
        await post.save()

        return post
    },
    deletePost:async(parent,args) =>{
        const post = await Post.findByIdAndDelete(args.id)

        return post
    },
    updatePost: async(parent,args) =>{
        const {title,description,image,category} = args

        const updatedPost = await Post.findByIdAndUpdate(args.id,{title,description,image,category},{new:true})

        return updatedPost
    },
    addPostToLiked: async(parent,args) =>{
        const posts = args.postInput
        const token = args.token

        const user = await User.findOne({token})

        const newLikedPosts = [...user.likedPosts,...posts]

        await User.findOneAndUpdate({token:token},{likedPosts:newLikedPosts})

        return posts
    }
}