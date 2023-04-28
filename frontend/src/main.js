import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from '../plugins/apollo'
import './index.css'


createApp(App).provide(DefaultApolloClient,apolloClient).use(store).use(router).mount('#app')
