<template>
  <div class="wrapper">
    <!-- Header -->
    <div class="header">
      <h1>Snippet Application</h1>
    </div>

    <!-- Registration Form -->
    <div>
      <form class="two-column-form" @submit.prevent="register">
        <div class="column">
          <input
            type="text"
            v-model="user.username"
            placeholder="Username"
            required
          />
          <input
            type="password"
            v-model="user.password"
            placeholder="Password"
            required
          />
        </div>

        <div class="column">
          <input
            type="text"
            v-model="user.programming_languages"
            placeholder="Programming Languages (Add multiple with commas)"
          />
          <input
            type="text"
            v-model="user.years_experience"
            placeholder="Years of Experience"
          />
          <button type="submit">Register</button>
          <p class="login">
            Already Registered?
            <router-link to="/login" class="login-link">Login</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
                years_experience: '',
                programming_languages: ''
            },
            error: null
        };
    },
    methods: {
        async register() {
            try {
                const user = this.user;
                user.programming_languages = this.user.programming_languages.split(',');

                const response = await axios.post(
                    'http://localhost:8080/users/register',
                    user
                );
                console.log(response.data);

                // redirect after successful registrations
                this.$router.push('/login');
            } catch (error) {
                console.log(error);
                this.error = 'username already exists';
            
            }
        }
    }
};
</script>

<style scoped>
.header {
  text-align: center;
  color:  violet;
  padding-bottom: 20px;
}

h1.header {
  font-size: 18px;
}

.two-column-form {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.two-column-form .column {
  flex: 1;
  padding: 0 10px;
}

form {
  margin: 10px auto;
}

input {
  font-family: "Saira Extra Condensed", sans-serif;
  color: red;
  margin-bottom: 15px;
  padding: 10px 10px;
  border-radius: 5px;
  border: 1px solid grey;
  width: 100%;
}

button {
  width: 100%;
  cursor: pointer;
}

.login {
  display: flex;
  justify-content: center;
  color: #f8f8ff;
}

.login-link {
  display: flex;
  justify-content: center;
  color: #b492ad;
  text-decoration: underline;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}


input,
button,
.login {
  margin-bottom: 10px;
}
</style>
