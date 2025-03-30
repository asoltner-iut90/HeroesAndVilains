<template>
  <v-container>
    <h1>Login</h1>
    <v-form ref="form" v-model="valid">
      <v-text-field v-model="loginInput" label="Login" required></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-btn :disabled="!valid" @click="submit">Login</v-btn>
    </v-form>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginView",

  data() {
    return {
      loginInput: "", // Renamed from "login" to "loginInput"
      password: "",
      valid: false,
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions("auth", ["login", "fetchUser"]),
    async submit() {
      const success = await this.login({
        login: this.loginInput, // Use "loginInput" here
        password: this.password,
      });
      if (success) {
        await this.fetchUser(this.loginInput); // Use "loginInput" here
        this.$router.push("/");
      } else {
        this.errorMessage = "Invalid login or password.";
      }
    },
  },
};
</script>