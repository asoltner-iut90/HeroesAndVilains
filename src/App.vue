<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <router-view />
    </v-main>
    <v-dialog v-model="errorDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Erreur</v-card-title>
        <v-card-text>{{ errorMessage }}</v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="clearError">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: { NavBar },
  computed: {
    ...mapState("errors", ["errorMessage"]),
    errorDialog() {
      return !!this.errorMessage;
    },
  },
  methods: {
    ...mapActions("errors", ["clearError"]),
  },
};
</script>