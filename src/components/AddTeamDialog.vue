<script >

import {mapActions, mapState} from "vuex";

  export default {
    name: "AddTeamDialog",

    computed: {
      ...mapState(["Teams", "CurrentOrganisation"]),

      sortedTeams() {
        return this.Teams.filter(obj1 =>
                  !this.CurrentOrganisation.teams.some(obj2 => obj1._id === obj2._id)
               ).sort((a, b) => a.name > b.name);
      }

    },

    methods: {
      ...mapActions(["getTeams", "addTeamToOrganisation"]),

      displayDialog(){
        this.dialog = true
      },

      async addTeam(){
        this.dialog = false
        await this.addTeamToOrganisation({"idTeam": this.selectedTeam._id, "nameTeam": this.selectedTeam.name})
        this.selectedTeam = null
      }

    },

    async mounted() {
      await this.getTeams()
    },

    data() {
      return {
        dialog: false,
        selectedTeam: null
      }
    },



  }

</script>

<template>
  <v-dialog v-model="dialog" max-width="500px">

    <v-card>
      <v-card-title>
        <h2>Ajouter une équipe</h2>
      </v-card-title>
      <v-card-text>
        <v-virtual-scroll
            :items="sortedTeams"
            height="400"
            item-height="48"
        >
          <template v-slot:default="{ item }">
            <v-list-item>
              <v-checkbox
                  :label="item.name"
                  :value="item"
                  v-model="selectedTeam"
              ></v-checkbox>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="dialog = false">Annuler</v-btn>
        <v-btn color="success" @click="addTeam" :disabled="! selectedTeam">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<style scoped>

</style>