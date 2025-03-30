<script>

import {mapActions} from "vuex";

export default{

  name:"NewTeamDialog",

  data(){
    return{
      dialog: false,
      teamName: ""
    }
  },

  computed:{
    isFormValid(){
      return this.teamName.length > 0
    },
  },

  methods:{
    ...mapActions("secret", ["getOrganisations", "newOrganisation"]),
    ...mapActions("general", ["createTeam"]),

    displayDialog(){
      this.dialog = true
    },

    cancel(){
      this.dialog = false
    },

    async valid(){
      this.dialog = false

      await this.createTeam({"name": this.teamName})

      this.teamName = ""
    }


  }

}

</script>

<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Nouvelle équipe</span>
      </v-card-title>
      <v-card-text>
        <v-text-field label="Entrez le nom de l'équipe"
                      v-model="teamName"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel" color="error">Annuler</v-btn>
        <v-btn @click="valid" color="success" :disabled="! isFormValid"> Valider</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>

</style>