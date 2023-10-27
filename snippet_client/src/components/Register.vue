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
