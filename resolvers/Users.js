const { ApolloError } = require('apollo-server-errors')
const User  = require('../models/User')

module.exports = {
    user:async(_,{token}) =>{
        try {
            const user = await User.findOne({token:token})

            return user
        } catch (error) {
            throw new ApolloError(error.message)
        }
        
    }
}