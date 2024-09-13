<template>
  <div class="wrapper">
    <div v-if="store">
      <div class="menu" @click="Toggle(e)">
        <p :class="{ active: active }">users</p>
        <p :class="{ active: !active }">roles</p>
      </div>
      <Users v-if="active" />
      <Roles v-else />
    </div>
  </div>
</template>

<script>
import Users from './components/Users.vue'
import Roles from './components/Roles.vue'
import { inject } from 'vue'


export default {
  components: {
    Users,
    Roles
  },
  data() {
    return {
      active: true,
      store: null
    };
  },
  methods: {
    Toggle(e) {
      this.active = !this.active
    }
  },
  mounted() {
    this.store = inject('store')
  }
}

</script>

<style scoped>
.wrapper {
  background-color: #fff;
  position: fixed;
  left: 35%;
  width: 30%;
  height: 90%;
  overflow-y: auto;
}

.wrapper .menu {
  background-color: red;
  position: fixed;
  top: 0;
  left: 35%;
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 100;
}

.wrapper .menu p {
  cursor: pointer;
  font-size: 40px;
  padding: 0 20px;
  margin: 0 20px;
}

.wrapper .menu p.active {
  text-decoration: underline 3px solid yellow;
}
</style>
