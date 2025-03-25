<script>

import {mapActions, mapState} from "vuex";
  import AddTeamDialog from "@/components/AddTeamDialog.vue";
  import ConfirmDialog from "@/components/ConfirmDialog.vue";

  export default {
    name: "OrganisationView",
    components: {ConfirmDialog, AddTeamDialog},

    computed: {
      ...mapState(["CurrentOrganisation", "CurrentTeam"])
    },

    methods: {

      ...mapActions(["removeTeamFromOrganisation", "setCurrentTeam"]),

      openAddDialog() {
        this.$refs.AddTeamDialog.displayDialog();
      },
      openConfirmDialog(team) {
        this.$refs.ConfirmDialog.displayDialog("Confirmation", "Voulez-vous vraiment l'équipe :\n"+team.name, () => {
          this.removeTeamFromOrganisation({"idTeam": team._id});
        });
      },

      async selectTeam(team) {
        await this.setCurrentTeam(team);
        await this.$router.push('/team');
      }

    }

  }

</script>

<template>
  <v-container class="OrganisationView">
    <h1>Organisation</h1>
    <div v-if = "! CurrentOrganisation">
      <h2 >Aucune organisation sélectionné</h2>
      <v-btn color="success" @click="$router.push('/organisations')">OK</v-btn>
    </div>
    <div v-else>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">Id</th>
            <th class="text-left">Nom</th>
            <th class="text-left">Secret</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ CurrentOrganisation._id }}</td>
            <td>{{ CurrentOrganisation.name }}</td>
            <td>{{ CurrentOrganisation.secret }}</td>
          </tr>
          </tbody>
          <thead>
            <tr>
              <th class="text-left" colspan="2">
                Équipes
                <v-btn color="success" class="ma-3" @click="openAddDialog" >Ajouter</v-btn></th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for = "team in CurrentOrganisation.teams" :key="team._id">
              <td colspan="2">
                {{ team.name }}
              </td>
              <td>
                <v-btn color="warning" class="ma-3" @click="selectTeam(team)" >Modifier</v-btn>
                <v-btn color="error" @click="openConfirmDialog(team)">Supprimer</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <AddTeamDialog ref="AddTeamDialog" />
      <ConfirmDialog ref="ConfirmDialog" />
    </div>
  </v-container>
</template>

<style>

</style>