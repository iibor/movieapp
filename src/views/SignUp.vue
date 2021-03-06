<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-overlay :value="isLoading">
      <v-progress-linear color="primary" indeterminate></v-progress-linear>
    </v-overlay>
    <v-form ref="form" v-model="form" class="pa-4 mt-6">
      <v-text-field
        v-model="name"
        :rules="[rules.required]"
        filled
        label="Name"
      ></v-text-field>
      <v-text-field
        v-model="username"
        :rules="[rules.required]"
        filled
        label="Username"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        filled
        label="Email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        filled
        counter="6"
        label="Password"
        type="password"
        style="min-height: 96px"
      ></v-text-field>
    </v-form>
    <v-alert v-if="errorMsg" border="top" color="red" class="ml-5 mr-5">
      {{ errorMsg }}
    </v-alert>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="$refs.form.reset()">Clear</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        color="primary"
        :loading="isLoading"
        depressed
        @click="signUpWithUsernameAndPassword"
        >Sign Up</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";

export default {
  data: () => ({
    name: "",
    username: "",
    email: "",
    password: "",
    isLoading: false,
    form: false,
    errorMsg: "",
    rules: {
      email: (v) =>
        !!(v || "").match(/@/) || "Please enter a valid email address",
      length: (len) => (v) =>
        (v || "").length >= len || `Invalid character length, requires ${len}`,
      password: (pw) =>
        !!(pw || "").match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
        ) ||
        "Password must contain uppercase, lowercase, number and special character",
      required: (v) => !!v || "This field is required",
    },
  }),
  methods: {
    async signUpWithUsernameAndPassword() {
      this.isLoading = true;

      try {
        let auth = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.email.toLowerCase(),
            this.password
          );

        await db
          .collection("users")
          .doc(auth.user.uid)
          .set({ name: this.name, email: this.email });

        this.$store.dispatch("user/setUserData", {
          id: auth.user.uid,
          name: this.name,
          email: this.email,
        });

        this.$router.replace({ name: "Home" });
      } catch (error) {
        this.errorMsg = "Unexpected error occurred!";

        if (error.message) {
          this.errorMsg = error.message;
        }
      }
      this.isLoading = false;
    },
  },
};
</script>