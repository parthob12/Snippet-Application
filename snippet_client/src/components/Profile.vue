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
          </v-list>
        </v-list-item>
      </v-list>
      
      <v-list-item link prepend-icon="mdi-bookmark" title="Bookmarks">
        <template v-slot:append>
          <v-badge
            color="green"
            :content="user && user.bookmarks ? user.bookmarks.length : 0"
            inline
          ></v-badge>
        </template>
      </v-list-item>

      <br />
      <v-btn
        density="compact"
        size="large"
        @click="addSnippet()"
        text="Add snippet"
      ></v-btn>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center">
      <div class="card">
        <v-card
          color="indigo"
          v-for="(item, i) in user.snippets"
          style="margin-top: 15px"
        >
          <v-card-item>
            <div>
              <div class="text-h5 mb-1">{{ item.title }}</div>
              <div class="text-h7">{{ item.code_snippet }}</div>
              <br />
              <br />
              <div class="text-h7 text-left">
                <timeago :datetime="item.created" />
              </div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-chip>{{ item.programming_languages }}</v-chip>
          </v-card-actions>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  data() {
    return {
      user: {},
      cards: ["Today", "Yesterday"],
      drawer: null,
      links: [
        ["mdi-inbox-arrow-down", "Inbox"],
        ["mdi-send", "Send"],
        ["mdi-delete", "Trash"],
        ["mdi-alert-octagon", "Spam"],
      ],
    };
  },
  async created() {
    const { id } = this.$route.params;

    try {
      const response = await axios.get(
        `http://localhost:8080/users/${id}?snippets=true&bookmarks=true`
      );
      // Snippet response
      this.user = response.data;

      this.pic = `https://api.dicebear.com/7.x/initials/svg?seed=${this.user.username}&backgroundColor=27b8c7`;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async addSnippet() {
      const token = localStorage.getItem("authToken");
      console.log(token);
    },
  },
};
</script>

<style>
body {
  display: block !important;
}

.card {
  width: 100%;
}
</style>
