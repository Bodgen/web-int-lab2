<template>
  <div class="content container d-flex">
    <div class="w-50 bg-dark h-100 float-left d-flex flex-column align-items-center justify-content-center logo-app"
         style="color: #EEEEEE">
      <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" class="bi bi-gem logo"
           viewBox="0 0 16 16">
        <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z"/>
      </svg>
      <h1>Blog App</h1>
    </div>
    <div class="container w-50 d-flex flex-column align-items-center justify-content-start pt-4 form-block">
      <h3 style="margin-bottom: 20px">Sign Up</h3>
      <div class="container w-75">
        <form @submit.prevent="signUp">
          <div class="form-group">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" v-model="user.firstName" id="firstName" placeholder="Enter email">
              <label for="firstName">First Name</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" v-model="user.lastName" id="lastName" placeholder="Enter email">
              <label for="lastName">Last Name</label>
            </div>
            <div class="form-floating mb-3">
              <input type="email" class="form-control" v-model="user.email" id="email" placeholder="Enter email">
              <label for="email">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" class="form-control" v-model="user.password" id="password" placeholder="Enter email">
              <label for="password">Password</label>
            </div>
            <div class="form-floating mb-3">
              <select class="form-select ps-3" v-model="user.sex" id="sex">
                <option v-for="[value, key] in sexValueMap" :key="key" :value="value">{{ key }}</option>
              </select>
              <label for="sex">Sex</label>
            </div>
            <div class="form-floating mb-3">
              <input type="date" class="form-control" v-model="user.birth" id="birth_date">
              <label for="birth_date">Birth Date</label>
            </div>
            <div class="w-100  d-flex justify-content-center">
              <button type="submit" id="sign_up_button" class="btn btn-outline-secondary p-1 me-2">
                Sign Up
              </button>
              <RouterLink to="login" type="submit" id="sign_up_button" class="btn btn-outline-secondary p-1">
                Login
              </RouterLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SexValue } from "@/interfaces/user.interface";

export default {
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        sex: SexValue.MALE,
        birth: ''
      },
      sexValueMap: new Map<SexValue, string>([
        [SexValue.FEMALE, 'Female'],
        [SexValue.MALE, "Male"],
      ]),
    };
  },
  methods: {
    signUp(): void {
      localStorage.setItem('user', JSON.stringify({ ...this.user, id: Math.floor(Math.random() * 1000), posts: [] }));
      localStorage.setItem('loginInfo', JSON.stringify({ email: this.user.email, password: this.user.password}))
      this.$router.push('/main')
    }
  }
}
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "Georgia", monospace !important;
}

body{
  background: #EEEEEE;
  width: 100%;
}

.content {
  height: 100vh;
}

.form-block{
  margin-top: 50px;
}

@media (max-width: 820px) {
  body{
    max-width: 800px;
  }
  .logo-app{
    display: none !important;
  }
  .form-block{
    margin: auto;
  }
  .form-block .container{
    width: 100% !important;
  }
}

</style>
