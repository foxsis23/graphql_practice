const  {
    ApolloClient,
    createHttpLink,
    InMemoryCache
  } = require('@apollo/client/core')

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
  })


const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

export default apolloClient