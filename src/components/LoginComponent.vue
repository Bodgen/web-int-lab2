<template>
  <div class="content container d-flex">
    <div
      class="w-50 bg-dark h-100 float-left d-flex flex-column align-items-center justify-content-center logo-app"
      style="color: #eeeeee"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="160"
        height="160"
        fill="currentColor"
        class="bi bi-gem logo"
        viewBox="0 0 16 16"
      >
        <path
          d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z"
        />
      </svg>
      <h1>Blog App</h1>
    </div>
    <div
      class="container w-50 d-flex flex-column align-items-center form-block"
    >
      <h3 style="margin-bottom: 20px">Login</h3>
      <div class="container w-50">
        <form @submit.prevent="login">
          <div class="form-group">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Email"
                v-model="email"
              />
              <label for="email">Email</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Enter password"
                v-model="password"
              />
              <label for="password">Password</label>
            </div>
            <div class="w-100 d-flex justify-content-center">
              <RouterLink
                  type="submit"
                  id="login_button"
                  class="btn btn-outline-secondary p-1 me-2"
                  to="registration"
              >
                Sign Up
              </RouterLink>
              <button
                type="submit"
                id="login_button"
                class="btn btn-outline-secondary p-1"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface ILoginInfo {
  email: string;
  password: string;
}
export default {
  name: "LoginComponent",
  data(): ILoginInfo {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
  },
  methods: {
    async login() {
      try {
        await this.saveLoginInfo({ email: this.email, password: this.password });
        this.$router.push('/main');
      } catch (e) {
        console.error('Error during login:', e);
      }
    },
    saveLoginInfo(loginInfo: ILoginInfo): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "Georgia", monospace !important;
}

body {
  background: #eeeeee;
  width: 100%;
}

.content {
  height: 100vh;
}

.form-block {
  margin-top: 50px;
}

@media (max-width: 820px) {
  body {
    max-width: 800px;
  }
  .logo-app {
    display: none !important;
  }
  .form-block {
    margin: auto;
  }
  .form-block .container {
    width: 100% !important;
  }
}
</style>
