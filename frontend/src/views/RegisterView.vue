<template>
    <div class="m-20">
        <h1 class="text-center text-4xl font-bold text-darkBlue mb-5">Registration</h1>
        <form @submit.prevent="" 
        class="flex flex-col justify-center items-center"
        >
            <input type="text" placeholder="type an username"
            class="border-b border-darkBlue p-2 m-3 w-60 hover:border-lightBlue"
            v-model="newUser.username"
            >
            <input type="text" placeholder="type an email"
            class="border-b border-darkBlue p-2 m-3 w-60 hover:border-lightBlue"
            v-model="newUser.email"
            >
            <input type="password" placeholder="type a password"
            class="border-b border-darkBlue p-2 m-3 w-60 hover:border-lightBlue"
            v-model="newUser.password"
            >
            <input type="submit" value="create account"
            class="rounded bg-darkBlue px-5 py-2 text-white cursor-pointer
            text-2xl hover:opacity-70"
            @click="handleRegister"
            >
        </form>
        <h1 class="text-center mt-5">
            Already have an account? 
            <router-link to="/login" class="hover:opacity-70 underline">
                Login
            </router-link>
        </h1>
    </div>
    <div v-if="registerError">
        <h1 class="text-4xl text-red-600 text-center font-bold">
            {{ registerError.message }}
        </h1>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useMutation} from '@vue/apollo-composable'
import {gql} from '@apollo/client/core'

const router = useRouter()

const newUser = ref({
    username:'',
    email:'',
    password:''
})

const {
    mutate:registerUser,
    onDone:registerDone,
    error:registerError
} = useMutation(gql`
    mutation($registerInput:RegisterInput){
        registerUser(registerInput:$registerInput){
            token
            id
            username
            email
        }
    }
`,() =>({
    variables:{
        registerInput:{
            username:newUser.value.username,
            email:newUser.value.email,
            password:newUser.value.password
        }
    }
}))

const handleRegister = () =>{
    if(newUser.value.username === '' || newUser.value.email === ""
    || newUser.value.password === ''
    ){
        alert('Fill all fields!')
    }
    registerUser()
}

registerDone((user) =>{
    const tokenJSON = JSON.stringify(user.data.registerUser.token)
    localStorage.setItem('token',tokenJSON) 

    router.push('/')
})
</script>