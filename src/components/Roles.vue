<template>
    <div v-if="store" class="roles">
        <RoleItem v-for="(role, index) in store.roles" :index="index" :role="role" :key="role.id"/>
        <button class="add-role" @click="showDialog = true">Add Role</button>
        <AddRoleDialog :value="showDialog" @input="showDialog = $event" />
    </div>
</template>

<script>
import RoleItem from './RoleItem.vue';
import AddRoleDialog from './dialogBoxes/AddRoleDialog.vue';
import { inject } from 'vue';

export default{
    name: 'Roles',
    components: {
        RoleItem,
        AddRoleDialog
    },
    data(){
        return {
            roles: [1],
            store: null,
            showDialog: false
        }
    },
    methods: {
        
    },
    mounted(){
        this.store = inject("store")
    }
}
    
</script>

<style scoped>
    .roles{
        background-color: #ffff;
        margin-top: 70px;
        width: 100%;
        height: 100%;
    }
    .add-role{
        padding: 10px;
        display: block;
        margin: 10px auto;
    }
</style>
