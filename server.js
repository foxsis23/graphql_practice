const express = require('express')
// const {ApolloServer} = require('apollo-server-express')
const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')
const resolvers = require('./resolvers/index')
const typeDefs = require('./typeDefs')
const cors = require('cors')


async function startServer(){
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })

    app.use(cors())
    app.use(express.json())

    

    // apolloServer.applyMiddleware({app:app}) 

    await mongoose.connect('mongodb+srv://admin:admin@cluster0.iko7511.mongodb.net/?retryWrites=true&w=majority',{
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then(apolloServer.listen(4000)).then(() => console.log('Connected!'))


    // app.listen(4000,() =>console.log('Server is running on PORT:4000'))
}

startServer()