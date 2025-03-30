<script>
import EditHero from "@/components/EditHero.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "EditHeroDialog",
  components: { EditHero },

  props: {
    hero: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    ...mapState("auth", ["isAuthenticated", "user"]),
  },

  methods: {
    ...mapActions("auth", ["updateHero"]),
    displayDialog() {
      this.dialog = true;
    },
    async valid(hero) {
      if (this.isAuthenticated && this.user && this.user.hero._id === hero._id) {
        const success = await this.updateHero(hero);
        if (success) {
          console.log("Hero updated successfully.");
        } else {
          console.log("Failed to update hero.");
        }
      } else {
        this.$emit("valid", hero);
      }
      this.dialog = false;
    },
  },
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="500px">
    <EditHero :hero="hero" @cancel="dialog = false" @valid="valid" />
  </v-dialog>
</template>

<style scoped></style>