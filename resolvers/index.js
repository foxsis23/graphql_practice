const PostQuery = require('../resolvers/Post')
const UserQuery = require('../resolvers/Users')

const PostMutations = require('../mutations/Post')
const UsersMutations = require('../mutations/Users')

const resolvers = {
    Query:{
        ...PostQuery,
        ...UserQuery
    },
    Mutation:{
        ...PostMutations,
        ...UsersMutations
    }
}

module.exports = resolvers