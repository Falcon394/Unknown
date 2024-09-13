<template>
  <div>
    <UserItem v-model="showAddDialog" v-for="user in users" :key="user.id" :user="user"/>
    <<button @click="showAddDialog = true">Open Dialog</button>
    <AddDialog :value="showAddDialog" @input="showAddDialog = $event" />
  </div>
</template>
<script>
import UserItem from './UserItem.vue';
import AddDialog from './AddDialog.vue';
// Import the JSON data
import userListData from '../../users.json';

export default {
  components: {
    UserItem,
    AddDialog
  },
  data() {
    return {
      users: userListData,
      showAddDialog: false,
      message: ''
    }
  },
  methods: {
    async fetchData() {
      try {
        // Make a GET request to the Node.js server
        const response = await axios.get('http://localhost:3000/api/data');
        this.message = response.data.message;
        console.log(this.message)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
  created(){
    this.fetchData()
  }
}

</script>



<style scoped>
/* Add your styles here */
</style>
