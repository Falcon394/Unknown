<template>
    <div v-if="isVisible" class="dialog-overlay" @click.self="close">
        <div class="dialog-content">
            <button class="dialog-close" @click="close">×</button>
            <form @submit.prevent="submitForm">
                <label for="title">Title</label>
                <input required type="text" placeholder="title" v-model="title">
                <label for="desc">Descriptioin</label>
                <input required type="text" placeholder="descriptioin" v-model="desc">
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
    import { inject } from 'vue';
    import { v4 as id } from 'uuid';

    export default{
        props: {
            value: {
                type: Boolean,
                default: false
            },
            role: {
                type: Object,
                required: true
            }
        },
        data(){
            return {
                store: null,
                title: this.role.title,
                desc: this.role.description,
            }
        },
        methods: {
            close() {
                this.$emit('input', false);
            },
            submitForm(){
                let currentRole = this.store.roles.find(role => role.id === this.role.id)
                currentRole.title = this.title
                currentRole.description = this.desc
                this.store.save()
                this.close()
            }
        },
        computed: {
            isVisible() {
                return this.value;
            }
        },
        mounted(){
            this.store = inject('store')
        }
    }
</script>
<style scoped>
    .dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(201, 189, 142, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99;
    }

    .dialog-content {
        background: #fff;
        padding: 20px;
        border-radius: 4px;
        position: relative;
        max-width: 500px; /* Optional: Limit width of dialog */
        width: 100%;
    }

    .dialog-close {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 20px;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    label {
        color: #000;
        margin-bottom: 5px;
    }

    input {
        margin-bottom: 10px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
    }

    button[type="submit"] {
        margin-top: 10px;  
    }
</style>