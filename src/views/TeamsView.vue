<script>
import TeamsList from "@/components/TeamsList.vue";
import {mapActions, mapState} from "vuex";
import NewTeamDialog from "@/components/NewTeamDialog.vue";

export default {
  components: {NewTeamDialog, TeamsList},

  methods: {
    ...mapActions("general", ["getTeams"]),

    newTeam(){
      this.$refs.NewTeamDialog.displayDialog()
    }
  },

  computed:{
    ...mapState("general", ["Teams"])
  },

  mounted() {
    this.getTeams();
  }


}
</script>

<template>

  <v-container>
    <h1>Teams</h1>

    <v-btn color="primary" @click="newTeam" class="mb-4">Ajouter</v-btn>
    <TeamsList :Teams="Teams"></TeamsList>

    <NewTeamDialog ref="NewTeamDialog" />

  </v-container>

</template>

<style scoped>

</style>