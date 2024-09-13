<template>
  <div class="user">
    <span class="id">{{ index + 1 }}</span>
    <p class="firstName">{{ user.firstName }}</p>
    <p class="lastName"> {{ user.lastName }}</p>
    <p class="email">{{ user.email }}</p>
    <p v-if="store" class="role">{{store.roles.find(u => u.id == user.role)?.title || 'no title'}}</p>
    <p class="address">{{ user.address }}</p>
    <div class="buttons">
      <button @click="deleteUser(user.id)">x</button>
      <button @click="editUserDialog = true">
        <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 17.25V21h3.75L18.97 10.78l-3.75-3.75L3 17.25zM20.7 7.3c.39-.39.39-1.02 0-1.41l-2.88-2.88c-.39-.39-1.02-.39-1.41 0l-1.42 1.42 3.75 3.75 1.41-1.42z" fill="#000"/>
        </svg>
      </button> 
    </div>
  </div>
  <EditUserDialog :value="editUserDialog" :user="user" @input="editUserDialog = $event"/>

</template>

<script>
import { inject } from 'vue';
import EditUserDialog from './dialogBoxes/EditUserDialog.vue';

export default {
  components: {
    EditUserDialog
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    index: Number
  },
  data(){
    return{
      editUserDialog: false,
      store: null
    }
  },
  methods: {
    deleteUser(id){
        const index = this.store.users.findIndex(user => user.id === id);
        this.store.users.splice(index, 1)
        this.store.save()
    }
  },
  mounted(){
    this.store = inject("store")
  }
}

console.log()

</script>

<style scoped>

  div.user{
    display: flex;
    flex-direction: row;
    color: #000;
    border: 1px solid rgb(141, 150, 23);
    padding: 10px;
    align-items: center;
  }

  .id{
    margin-right: 10px;
    overflow: hidden;
    padding: 2px;
  }

  .firstName{
    width: 80px;
    overflow: hidden;
    padding: 2px;
    margin-right: 3px;
    text-overflow: ellipsis;
  }

  .lastName{
    width: 80px;
    overflow: hidden;
    padding: 2px;
    margin-right: 3px;
    text-overflow: ellipsis;
  }

  .email {
    overflow: hidden;
    padding: 2px;
    width: 150px;
    margin-right: 3px;
    text-overflow: ellipsis;
  }

  .role{
    overflow: hidden;
    padding: 2px;
    width: 70px;
  }

  .address{
    width: 70px;
    overflow: hidden;
    padding: 2px;
    margin-right: 3px;
    text-overflow: ellipsis;

  }

  .buttons{
    justify-content: space-between;
    width: 70px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    padding: 2px;
  }
</style>
