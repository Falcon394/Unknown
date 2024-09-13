import './assets/main.css'
import { createApp, reactive } from 'vue'
import App from './App.vue'
var app = createApp(App)




let users = reactive(
    []
),
roles = reactive(
    []
)

const save = () => {
    console.log(roles)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('roles', JSON.stringify(roles))
}

const clear = () => {
    users = []
}

const load = () => {
    try {
        users = JSON.parse(localStorage.getItem('users'))
        roles = JSON.parse(localStorage.getItem('roles'))
    } catch (e) {
        users = []
        roles = []
    }
}

load()

const store = {
    users, roles, save, clear, load
}


app.provide('store', store)



app.mount('#app')
