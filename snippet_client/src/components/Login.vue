<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <h2>Welcome to Snippet App</h2>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="user.username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="user.password" required />
      </div>
      <button type="submit">Login</button>
      <div v-if="error" class="error-message">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const user = this.user;
        console.log(user);
        const response = await axios.post(
          "http://localhost:8080/users/login",
          user
        );
        console.log(response);
        if (response.status == 200) {
          const token = response.headers.authorization;
          console.log(token);

          localStorage.setItem("authToken", token);
