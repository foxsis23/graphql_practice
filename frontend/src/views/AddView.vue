<template>
<div class="m-20">
    <h1 class="text-4xl text-lightDarkBlue text-center font-bold mb-5">Add new post</h1>
    <form @submit.prevent="handleCreatePost" class="flex flex-col items-center">
        <input type="text" placeholder="title" class="p-3 border-b border-darkBlue mb-3"
        v-model="newPost.title"
        >
        <input type="text" placeholder="description" class="p-3 border-b border-darkBlue mb-3"
        v-model="newPost.description"
        >
        <input type="text" placeholder="image(url)" class="p-3 border-b border-darkBlue mb-3"
        v-model="newPost.image"
        >
        <input type="text" placeholder="category" class="p-3 border-b border-darkBlue mb-3"
        v-model="newPost.category"
        >
        <input type="submit" value="add" class="
        rounded bg-darkBlue px-5 py-2 text-white cursor-pointer
        text-2xl
        ">
    </form>
</div>
</template>


<script setup>
import { useRouter } from 'vue-router';
import {ref} from 'vue'
import {useMutation} from '@vue/apollo-composable'
import {gql} from '@apollo/client/core'

const newPost = ref({
    title:'',
    description:'',
    image:'',
    category:''
})

const router = useRouter()

const {
    mutate:createPost,
    onDone:onPostDone
} = useMutation(gql`
    mutation($title:String,$description:String,$image:String,$category:String){
        createPost(title:$title,description:$description,image:$image,category:$category){  
            id
        }
    }
`,() =>({
    variables:{
        title:newPost.value.title,
        description:newPost.value.description,
        image:newPost.value.image,
        category:newPost.value.category
    }
})
)

const handleCreatePost = () =>{
    if(newPost.value.title === '' || newPost.value.description === '' ||
    newPost.value.category === '' || newPost.value.image === ''
    ){
        alert('Fill all fields!')
        return
    }
    createPost()
}

onPostDone(() =>{
    router.push('/')
})

</script>