<script>


import {mapActions, mapState} from "vuex";

  export default {
    name: 'NavBar',

    computed: {
      ...mapState(["OrganisationPassword"])
    },

    methods:{

      ...mapActions(["setOrganisationPassword"]),

      updateSecret(value){
        this.setOrganisationPassword(value)
      }
    },

    data(){
      return {
        drawer: false,
        showPassword: false
      }
    }

  }

</script>

<template>
  <div class="nav-bar">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item link>
          <v-list-item-content>
              <v-col cols="2">
                <v-icon>
                  mdi-domain
                </v-icon>
              </v-col>
              <v-col cols="3">
                <router-link to="/organisations">Organisations</router-link>
              </v-col>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-col cols="2">
              <v-icon>
                mdi-account-group
              </v-icon>
            </v-col>
            <v-col cols="3">
              <router-link to="/teams">Équipes</router-link>
            </v-col>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>HeroesAndVilains</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field :value="OrganisationPassword" @input="updateSecret" label="Votre phrase secrète" class="pt-5" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"/>
      <v-spacer/>
      <v-btn >Se connecter</v-btn>
    </v-app-bar>
  </div>

</template>

<style scoped>

</style>