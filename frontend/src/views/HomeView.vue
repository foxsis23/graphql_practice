<template>
    <div class="m-5">
        <h1 class="text-3xl text-darkBlue font-bold mb-2">Filter by category:</h1>
        <h1 class="text-darkBlue text-xl cursor-pointer hover:text-black flex flex-row max-w-fit"
        @click="selectedFilter.category = 'tableware'"
        >
            <svg-icon type="mdi" :path="mdiSilverwareForkKnife"></svg-icon>
            Tableware</h1>
        <h1 class="text-darkBlue text-xl cursor-pointer hover:text-black flex flex-row max-w-fit"
        @click="selectedFilter.category = 'furniture'"
        >
            <svg-icon type="mdi" :path="mdiTableFurniture"></svg-icon>
            Furniture</h1>
    </div>


    <div v-if="!loadingPost" class="flex flex-row m-20 flex-wrap justify-center">
        <div v-for="post in PostResult.getByCategory" :key="post.id" 
        class="rounded-lg m-2 mr-5 p-5 bg-lightDarkBlue hover:shadow-md
        w-[250px] flex flex-col justify-center relative
        ">
            <img :src="post.image" class="h-[250px]">
            <h1 class="text-4xl text-white mb-3">{{ post.title }}</h1>
            <p class="text-sm text-white max-w-[150px] m-2">{{ post.description }}</p>
            <span class="absolute bottom-0 right-0 m-2 text-white cursor-pointer"
            @click="() => deletePost({id:post.id})"
            >

                <svg-icon type="mdi" :path="mdiDeleteOutline"></svg-icon>
            </span>
            <span class="absolute bottom-0 left-0 m-2 text-white cursor-pointer"
            @click="likePost(post)"
            >

                <svg-icon type="mdi" :path="mdiThumbUp"></svg-icon>
            </span>
        </div>
    </div>
</template>


<script setup>
import {onMounted,ref} from 'vue'
import {useQuery,useMutation} from '@vue/apollo-composable'
import {gql} from '@apollo/client/core'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDeleteOutline,mdiTableFurniture,mdiSilverwareForkKnife,
    mdiThumbUp
 } from '@mdi/js';

const selectedFilter = ref({
    category:''
})

const token = JSON.parse(localStorage.getItem('token'))

const likedPosts = ref([
])

const {
    loading:loadingPost,
    result:PostResult,
    refetch:PostRefetch
} = useQuery(gql`
    query($category:String){
        # getAllPosts{
        #     title
        #     description
        #     image
        #     category
        #     id
        # }
        getByCategory(category:$category){
            title
            id
            description
            image
            category
        }
    }
`,selectedFilter)




const {
    mutate:deletePost,
    onDone:onPostDone
} = useMutation(gql`
    mutation($id:ID!){
        deletePost(id:$id){
             id
        }
    }
`)

const likePost = (post) =>{
    const likedPost = {title:post.title,description:post.description,
        image:post.image,id:post.id,category:post.category
        }
    if(!likedPosts.value.includes(likedPost)){
        likedPosts.value.push(likedPost)
        addPostToLiked({postInput:likedPosts.value,token:token})
    }
    return 
}

const{
    mutate:addPostToLiked,
    onDone:onPostLikeDone
} = useMutation(gql`
    mutation Mutation($postInput: [LikedPost], $token: String) {
        addPostToLiked(postInput: $postInput, token: $token) {
                title
            }
        }
`)

onPostLikeDone(() => likedPosts.value = [])

onPostDone(() => PostRefetch())

onMounted(()=>PostRefetch())
</script>