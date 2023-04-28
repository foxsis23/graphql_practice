<template>
    <div class="flex flex-col justify-left m-10" v-if="!loadingUser">
        <h1 class="text-darkBlue font-bold text-2xl">
          <span class="text-black">username:</span>
           {{ UserResult.user.username }}
        </h1>
        <p class="text-darkBlue font-bold text-2xl">
          <span class="text-black">email:</span>
           {{ UserResult.user.email }}</p>
        <h1 class="text-3xl font-bold text-black">Liked posts: </h1>
        <div class="flex flex-row flex-wrap max-w-2xl">
          <div v-for="post in UserResult.user.likedPosts" :key="post.id"
          class="rounded p-4 m-2 bg-lightDarkBlue hover:shadow-md
          flex flex-col justify-center items-center w-[150px] relative"
          >
              <img :src="post.image" class="h-[100px]">
              <h1 class="text-white mt-2 mb-2 text-xl">{{ post.title }}</h1>
              <p class="text-white text-sm">{{ post.description }}</p>
            <span class="absolute bottom-0 right-0 m-2 text-white cursor-pointer"
            @click="() => deleteLikedPost({id:post.id,token:UserResult.user.token})"
            >
                <svg-icon type="mdi" :path="mdiDeleteOutline"></svg-icon>
            </span>
          </div>
        </div>
    </div>

    <form ref="form" @submit.prevent="sendEmail">
      <label>Name</label>
      <input type="text" name="user_name">
      <label>Email</label>
      <input type="email" name="user_email">
      <label>Message</label>
      <textarea name="message"></textarea>
      <input type="submit" value="Send" class="border cursor-pointer p-2 bg-black text-white">
    </form>
</template>


<script setup>
import {useQuery,useMutation} from '@vue/apollo-composable'
import {gql} from '@apollo/client/core' 
import { ref } from 'vue';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDeleteOutline} from '@mdi/js';


const variables = ref({
  token:''
})


variables.value.token = JSON.parse(localStorage.getItem('token'))

const {
    loading:loadingUser,
    result:UserResult,
    refetch:UserRefetch
} = useQuery(gql`
  query($token:String){
    user(token:$token){
        username
        email
        token

        likedPosts{
          title
          image
          description
          id
        }
    }
  }
`,variables)


const {
  mutate:deleteLikedPost,
  onDone:onDeletePostDone
} = useMutation(gql`
  mutation Mutation($deleteLikedPostId: ID, $token: String) {
  deleteLikedPost(id: $deleteLikedPostId, token: $token) {
    title
  }
}
`)


onDeletePostDone(() => UserRefetch())
</script>

<script>
import emailjs from "@emailjs/browser"

export default {
  methods: {
    sendEmail() {
      emailjs.sendForm('service_wa1xyvv', 'template_ktwczh8', this.$refs.form, 'XAu02dshObKmFMUA5')
        .then((result) => {
            console.log('SUCCESS!', result.text);
        }, (error) => {
            console.log('FAILED...', error.text);
        });
    }
  }
}
</script>