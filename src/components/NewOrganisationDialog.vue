<script>

import {mapActions} from "vuex";

export default{

  name:"NewOrganisationDialog",

  data(){
    return{
      dialog: false,
      password: '',
      showPassword: false,
      organisationName: ""
    }
  },

  computed:{
    isFormValid(){
      return this.organisationName.length > 0 && this.password.length > 0
    },
  },

  methods:{

    ...mapActions("general", ["getOrganisations", "newOrganisation"]),

    displayDialog(){
      this.dialog = true
    },

    togglePasswordVisibility(){
      this.showPassword = !this.showPassword
    },

    cancel(){
      this.dialog = false
    },

    async valid(){
      this.dialog = false

      await this.newOrganisation({"name": this.organisationName, "password": this.password})

      this.organisationName = ""
      this.password = ""
    },



  }

}

</script>

<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Nouvelle organisation</span>
      </v-card-title>
      <v-card-text>
        <v-text-field label="Entrez le nom de l'organisation"
                      v-model="organisationName"
        />
        <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Entrez la phrase secrète"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="togglePasswordVisibility"
        ></v-text-field>
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