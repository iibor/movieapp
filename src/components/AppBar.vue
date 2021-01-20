<template>
  <div>
    <v-app-bar
      app
      color="#add8e6"
      absolute
      dark
      shrink-on-scroll
      src="film.jpg"
      scroll-target="#scrolling-techniques-2"
    >
      <v-app-bar-nav-icon @click="show = !show"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon style="color: red">mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-2"
      class="overflow-y-auto"
      max-height="600"
    >
    </v-sheet>
    <v-navigation-drawer v-model="show" absolute left temporary>
      <v-list nav dense>
        <v-list-item-group active-class="border" color="#636363">
          <v-list-item to="/">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/top-movies">
            <v-list-item-title>Top Movies</v-list-item-title>
          </v-list-item>
          <v-list-item to="/profile">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-spacer></v-spacer>
        <v-list-item v-if="!userId" to="/sign-up">
          <v-btn elevation="2" outlined color="primary">Sign Up</v-btn>
        </v-list-item>
        <v-list-item v-if="userId">
          <v-btn elevation="2" @click="logoutUser" outlined color="primary"
            >Logout</v-btn
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    show: false,
  }),
  methods: {
    async logoutUser() {
      await firebase.auth().signOut();
      this.$store.dispatch("user/clearUserData");
      this.$router.replace("/");
    },
  },
  computed: {
    userId() {
      return this.$store.state.user.id;
    },
  },
};
</script>