<script>

import {mapActions} from "vuex";

export default {
  name:'AuthentificationView',

  data(){
    return{
      secretPhrase: ""
    }
  },

  methods:{
    ...mapActions(["setOrganisationPassword"]),
  },


}

</script>

<template>
  <div class="AuthentificationView">
    <h1>Authentification</h1>
    <h3>Votre phrase secrète: </h3>
    <input type="text" v-model="secretPhrase">
    <button>Valider</button>
  </div>
</template>

<style>

</style>