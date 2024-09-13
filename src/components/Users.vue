<template>
  <div class="users">
    <div v-if="store && store.users && store.users.length > 0" class="user">
      <span class="id">id</span>
      <p class="firstName">First Name</p>
      <p class="lastName"> Last Name</p>
      <p class="email">Email</p>
      <p v-if="store" class="role">Role</p>
      <p class="address">Address</p>
    </div>
    <UserItem v-if="store" v-for="(user, index) in store.users" :index="index" :key="user.id" :user="user"/>
    <button class="add-user" @click="onShowAddDialog()">Add User</button>
    <AddDialog :value="showAddDialog" @input="showAddDialog = $event" />
  </div>
</template>
<script>
import UserItem from './UserItem.vue';
import AddDialog from './dialogBoxes/AddUserDialog.vue';
import { inject } from 'vue'

export default {
  components: {
    UserItem,
    AddDialog,
  },
  data() {
    return {
      showAddDialog: false,
      message: '',
      store: null
    }
  },
  methods: {
    onShowAddDialog(){
      if(this.store && this.store.roles && this.store.roles.length > 0) this.showAddDialog = true
      else alert("you need to add role first")
    }
  },
  mounted() {
    this.store = inject('store')
  }
}

</script>



<style scoped>
/* Add your styles here */
  div.users{
    width: 100%;
    overflow-y: scroll;
    margin-top: 70px;
    z-index: 100;
  }
  .add-user{
    padding: 10px;
    display: block;
    margin: 10px auto;
  }
  div.user{
    display: flex;
    flex-direction: row;
    color: #000;
    border: 1px solid rgb(141, 150, 23);
    padding: 10px;
    align-items: center;
  }

  .id{
    margin-right: 3px;
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
    width: 140px;
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
</style>
