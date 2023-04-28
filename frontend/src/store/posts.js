// import apolloClient from '../../plugins/apollo'
// import { useQuery} from '@apollo/client';


// export default {
//     state:() =>({
//         posts:[]
//     }),
//     actions:{
//         async getAllPosts(){
//             const {data} = await apolloClient.query({
//                 query:useQuery({}),
//                 fetchPolicy:'no-cache'
//             })
//             this.posts = data
//         }
//     },
//     getters:{
//         allPosts: (state) => state.posts
//     }
// }