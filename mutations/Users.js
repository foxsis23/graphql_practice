const User = require('../models/User')
const {ApolloError} = require('apollo-server-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    registerUser:async(_,{registerInput:{username,email,password}}) =>{

        const oldUser = await User.findOne({email})

        if(oldUser){
            throw new ApolloError('A user is already registered with email: ' + email,'USER_ALREADY_EXISTS')
        }

        let encryptedPassword = await bcrypt.hash(password,10)

        const newUser = new User({
            username,
            email:email.toLowerCase(),
            password:encryptedPassword
        })

        const token = jwt.sign({
            user_id:newUser._id,email
        },"UNSAFE_STRING",{
            expiresIn:'2h'
        })

        newUser.token = token


        const res = await newUser.save()

        return {
            id:res.id,
            username:res.username,
            email:res.email,
            token:res.token
        }
    },
    loginUser:async(_,{loginInput:{email,password}}) =>{

        const user = await User.findOne({email})
        
        if(user && (await bcrypt.compare(password,user.password))){
            const token = jwt.sign({
                user_id:user._id,email
            },"UNSAFE_STRING",{
                expiresIn:'2h'
            })

            await User.findOneAndUpdate({email},{token:token})
            
            return {
                id:user._id,
                username:user.username,
                email:user.email,
                token:token
            }
        }

        throw new ApolloError('Incorrect password','INCORRECT_PASSWORD')

        
    },
    deleteLikedPost: async(parent,args) =>{
        const {token,id} = args

        const user = await User.findOne({token})

        const updatedLikedPosts = user.likedPosts.filter(post => post.id != id)

        await User.findOneAndUpdate({token},{likedPosts:updatedLikedPosts})

        return user.likedPosts
    }
}