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
