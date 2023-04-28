const {gql} = require('apollo-server-express')

const typeDefs = gql`
    type Post{
        id:ID
        title:String
        description:String
        image:String
        category:String
    }

    type Query{
        getAllPosts:[Post]
        getPost(id:ID):Post
        getByCategory(category:String):[Post]
        user(token:String):User
    }

    input PostInput{
        title:String
        description:String
    }

    input LikedPost{
        id:ID
        title:String
        description:String
        image:String
        category:String
    }

    type Mutation{
        createPost(title:String,description:String,image:String,category:String):Post
        deletePost(id:ID!):Post
        updatePost(title:String,description:String,image:String,category:String,id:ID):Post
        registerUser(registerInput:RegisterInput):User
        loginUser(loginInput:LoginInput):User
        addPostToLiked(postInput:[LikedPost],token:String):[Post]
        deleteLikedPost(token:String,id:ID):Post
    }

    type User{
        username:String
        email:String
        password:String
        token:String
        id:ID
        likedPosts:[Post]
    }

    input RegisterInput{
        username:String
        email:String
        password:String
    }

    input LoginInput{
        email:String
        password:String
    }

`


module.exports = typeDefs