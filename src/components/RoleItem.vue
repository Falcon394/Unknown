<template>
    <div class="role">
        <span>{{index + 1}}</span>
        <div class="data">
            <p class="title">{{role.title}}</p>
            <p class="desc">{{role.description}}</p>
        </div>
        <div class="btns">
            <button class="delete-btn" @click="deleteRole(role.id)">x</button>
            <button class="edit-btn" @click="editRoleDialog = true">
                <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17.25V21h3.75L18.97 10.78l-3.75-3.75L3 17.25zM20.7 7.3c.39-.39.39-1.02 0-1.41l-2.88-2.88c-.39-.39-1.02-.39-1.41 0l-1.42 1.42 3.75 3.75 1.41-1.42z" fill="#000"/>
                </svg>
            </button> 
        </div>
        <p class="created">{{role.createdAt}}</p>
        
    </div>
    <EditRoleDialog :value="editRoleDialog" :key="role.id" :role="role"  @input="editRoleDialog = $event" />
</template>

<script>
    import EditRoleDialog from './dialogBoxes/EditRoleDialog.vue';
    import { inject } from 'vue';

    export default{
        components: {
            EditRoleDialog
        },
        props: {
            role: {
                type: Object,
                default: {
                    title: '',
                    description: '',
                    createdAt: ''
                },
                required: true
            },
            index: Number
        },
        data(){
            return {
                editRoleDialog: false,
                store: null
            }
        },
        methods: {
            deleteRole(id){
                const index = this.store.roles.findIndex(role => role.id === id);
                this.store.roles.splice(index, 1)
                this.store.save()
            }
        },
        mounted(){
            this.store = inject("store")
        }
    }
</script>

<style scoped>
    div.role{
        color: #000;
        padding: 15px;
        position: relative;
        display: flex;
        align-items: center;
        border: 1px solid orange;
        margin: 5px;
    }
    div.role span{
        margin-right: 15px;
    }
    .role .data{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 50px 20px 0;
    }
    .desc{
        max-height: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .created{
        position: absolute;
        right: 0;
        bottom: 0;
        margin-top: 10px;
        padding: 10px;
        margin-right: 10px;
    }
    .btns{
        position: absolute;
        display: flex;
        right: 10px;
    }
    .btns button{
        justify-content: space-between;
    }
    .delete-btn{
        font-size: 22px;
        margin-right: 5px;
        padding: 0 8px;
    }
</style>