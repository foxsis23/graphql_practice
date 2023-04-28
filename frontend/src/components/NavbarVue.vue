<template>
<div class="bg-lightBlue flex flex-row justify-between items-center p-5">
   <div class="text-4xl font-bold text-white flex">
      <svg-icon type="mdi" :path="mdiAbjadHebrew" size="40"
      class="text-darkBlue"
      ></svg-icon> Manage
   </div>
   <div class="flex justify-center items-center">
    <div class="text-darkBlue flex flex-col mr-4" v-if="!loadingUser">
        <div v-if="isAuthenticated">
          <h1 class="text-darkBlue font-bold text-xl">{{ UserResult.user.email }}</h1>
          <button class="text-white rounded p-2 bg-red-500 hover:opacity-70"
          @click="logout"
          >
            logout
          </button>
        </div>
        
    </div>
    <div class="text-white hover:text-darkBlue cursor-pointer mr-2">
        <router-link :to="linkProfile">
          <svg-icon type="mdi" :path="mdiAccount" size="40"></svg-icon>
        </router-link>
      </div>
      <div class="text-white hover:text-darkBlue cursor-pointer mr-2">
        <router-link to="/">
          <svg-icon type="mdi" :path="mdiHome" size="40"></svg-icon>
        </router-link>
      </div>
      <div class="text-white hover:text-darkBlue cursor-pointer mr-2">
        <router-link to="/add">
          <svg-icon type="mdi" :path="mdiPlus" size="40"></svg-icon>
        </router-link>
      </div>
      <div class="text-white hover:text-darkBlue cursor-pointer">
        <router-link to="/about">
          <svg-icon type="mdi" :path="mdiInformation" size="40"></svg-icon>
        </router-link>
      </div>
   </div>
  </div>
</template>


<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiHome,mdiPlus,mdiInformation,mdiAbjadHebrew,mdiAccount } from '@mdi/js';

import {useQuery} from '@vue/apollo-composable'
import {gql} from '@apollo/client/core' 
import { ref } from 'vue';
import router from '@/router';

const variables = ref({
  token:''
})

const isAuthenticated = localStorage.getItem('token') ? true : false

const linkProfile = isAuthenticated ? '/profile' : '/register'

if(isAuthenticated){
  variables.value.token = JSON.parse(localStorage.getItem('token'))
}


const {
    loading:loadingUser,
    result:UserResult,
    refetch:UserRefetch
} = useQuery(gql`
  query($token:String){
    user(token:$token){
      email
      token
    }
  }
`,variables)

const logout = () =>{
  localStorage.removeItem('token')
  UserRefetch()
  router.push('/')
}
</script>