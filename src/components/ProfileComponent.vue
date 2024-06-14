<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      user: {
        name: '',
        email: '',
        sex: '',
        birth: ''
      }
    };
  },
  mounted() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  },
  methods: {
    logout() {
      console.log('logout');
      localStorage.clear();
      this.$router.push('/login');
    }
  }
});
</script>

<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container d-flex justify-content-between">
      <RouterLink to="/main">
        <button class="btn btn-outline-secondary">Back to Posts</button>
      </RouterLink>
      <div class="navbar-brand d-flex align-items-center logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-gem mr-25"
             viewBox="0 0 16 16">
          <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z"/>
        </svg>
        <h1> Blog APP </h1>
      </div>
      <button class="btn btn-outline-secondary" @click="logout">Logout</button>
    </div>
  </nav>
  <div class="container-fluid w-50">
    <div class="card bg-secondary mb-3 about-me-card">
      <div class="card-header bg-secondary text-white">About me</div>
      <div class="card-body bg-secondary">
        <div class="row mb-3">
          <span class="col-4 text-white">Name :</span>
          <p class="col-7" id="name">{{ user.firstName }}</p>
        </div>
        <div class="row mb-3">
          <span class="col-4 text-white">Email :</span>
          <p class="col-7" id="email">{{ user.email }}</p>
        </div>
        <div class="row mb-3">
          <span class="col-4 text-white">Sex :</span>
          <p class="col-7" id="sex">{{ user.sex }}</p>
        </div>
        <div class="row mb-3">
          <span class="col-4 text-white">Birth date :&nbsp;</span>
          <p class="col-4" id="birth">{{ user.birth }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-fluid {
  height: 100vh;
}
</style>
