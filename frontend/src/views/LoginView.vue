<template>
   <div class="m-20">
        <h1 class="text-center text-4xl font-bold text-darkBlue mb-5">Login</h1>
        <form @submit.prevent="" 
        class="flex flex-col justify-center items-center"
        >
            <input type="text" placeholder="type an email"
            class="border-b border-darkBlue p-2 m-3 w-60 hover:border-lightBlue"
            v-model="user.email"
            >
            <input type="password" placeholder="type a password"
            class="border-b border-darkBlue p-2 m-3 w-60 hover:border-lightBlue"
            v-model="user.password"
            >
            <input type="submit" value="login"
            class="rounded bg-darkBlue px-5 py-2 text-white cursor-pointer
            text-2xl hover:opacity-70"
            @click="handleLogin"
            >
        </form>
        <h1 class="text-center mt-5">
            Don't have an account?
            <router-link to="/register" class="hover:opacity-70 underline">
                Register
            </router-link>
        </h1>
        <div v-if="loginError">
        <h1 class="text-4xl text-red-600 text-center font-bold">
            {{ loginError.message }}
        </h1>
    </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useMutation} from '@vue/apollo-composable'
import {gql} from '@apollo/client/core'

const user = ref({
    email:'',
    password:''
})

const router = useRouter()

const {
    mutate:loginUser,
    onDone:loginDone,
    error:loginError
} = useMutation(gql`
    mutation Mutation($loginInput: LoginInput) {
        loginUser(loginInput: $loginInput) {
            token
        }
    }
`,() =>({
    variables:{
        loginInput:{
            email:user.value.email,
            password:user.value.password
        }
    }
}))



const handleLogin = () =>{
    if(user.value.email === ""
    || user.value.password === ''
    ){
        alert('Fill all fields!')
    }
    loginUser()
}

loginDone((user) =>{
    const tokenJSON = JSON.stringify(user.data.loginUser.token)
    localStorage.setItem('token',tokenJSON) 

    router.push('/')
})
</script>