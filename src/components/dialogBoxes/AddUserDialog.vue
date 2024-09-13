<template>
    <div v-if="isVisible" class="dialog-overlay" @click.self="close">
        <div class="dialog-content">
            <button class="dialog-close" @click="close">×</button>
            <form @submit.prevent="submitForm">
                <label for="role">Role:</label>
                <select name="role" id="role" @change="handleRole($event)" required>
                    <option disabled selected value="">Choose a role</option>
                    <option v-for="role in store.roles" :key="role.id" :value="role.id">{{ role.title }}</option>
                </select>
                <div v-if="errors.role" class="error">{{ errors.role }}</div>

                <label for="first-name">First Name:</label>
                <input type="text" id="first-name" placeholder="First name" v-model="formData.firstName" required />
                <div v-if="errors.firstName" class="error">{{ errors.firstName }}</div>

                <label for="last-name">Last Name:</label>
                <input type="text" id="last-name" placeholder="Last name" v-model="formData.lastName" required />
                <div v-if="errors.lastName" class="error">{{ errors.lastName }}</div>

                <label for="email">Email:</label>
                <input type="email" id="email" placeholder="Email" v-model="formData.email" required />
                <div v-if="errors.email" class="error">{{ errors.email }}</div>

                <label for="password">Password:</label>
                <input type="password" id="password" placeholder="Password" v-model="formData.password" required />
                <div v-if="errors.password" class="error">{{ errors.password }}</div>

                <label for="address">Address:</label>
                <input type="text" id="address" placeholder="Address" v-model="formData.address" required />
                <div v-if="errors.address" class="error">{{ errors.address }}</div>

                <label for="gender">Gender:</label>
                <select name="gender" @change="handleGender($event)"  required>
                    <option value="" selected disabled>Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
                <div v-if="errors.gender" class="error">{{ errors.gender }}</div>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>
  
  

<script>
import { inject } from 'vue';
import { v4 as id } from 'uuid';

export default {
    name: 'AddDialog',  
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            roles: [],
            store: null,
            formData: {
                role: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                address: '',
                gender: ''
            },
            errors: {}
        }
    },
    computed: {
        isVisible() {
            return this.value;
        }
    },
    methods: {
        close() {
        this.$emit('input', false);
        },
        submitForm() {
            if (this.validateForm()) {
                console.log(this.formData)
                this.store.users.push(
                    {   id: id(), 
                        email: this.formData.email,
                        firstName: this.formData.firstName,
                        lastName: this.formData.lastName,
                        password: this.formData.passowrd,
                        address: this.formData.address,
                        role: this.formData.role,
                        gender: this.formData.gender
                    })
                    this.store.save()
                console.log(this.store.users)    
                this.close();
            } else {
                console.error('Form validation failed');
            }
        },
        validateForm() {
            this.errors = {};
            let valid = true;

            if (!this.formData.role) {
                this.errors.role = 'Role is required.';
                valid = false;
            }
            if (!this.formData.firstName) {
                this.errors.firstName = 'First name is required.';
                valid = false;
            }
            if (!this.formData.lastName) {
                this.errors.lastName = 'Last name is required.';
                valid = false;
            }
            if (!this.formData.email) {
                this.errors.email = 'Email is required.';
                valid = false;
            }
            if (!this.formData.password) {
                this.errors.password = 'Password is required.';
                valid = false;
            }
            if (!this.formData.address) {
                this.errors.address = 'Address is required.';
                valid = false;
            }
            if (!this.formData.gender) {
                this.errors.gender = 'Gender is required.';
                valid = false;
            }

            return valid;
        },
        handleGender(e){
            this.formData.gender = e.target.value
            console.log(this.formData.gender)
        },
        handleRole(e){
            this.formData.role = e.target.value
            console.log(this.formData.role)
        }
    },
    mounted() {
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

input, select {
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
