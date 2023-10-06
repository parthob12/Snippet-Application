<template style="display: block">
  <v-layout>
    <v-navigation-drawer v-model="drawer" class="drawer">
      <v-sheet color="grey-lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64">
          <v-icon icon="mdi-account-circle"></v-icon>
        </v-avatar>

        <div>{{ user.username }}</div>
        <div>Work Exp: {{ user.years_experience }} yrs</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <h4>Programming Languages</h4>
        <v-list-item>
          <v-list style="padding-left: 10px">
            <v-chip-group>
              <v-chip
                v-for="(item, i) in user.programming_languages"
                :key="i"
                >{{ item }}</v-chip
              >
            </v-chip-group>
