<script>

import EditHero from "@/components/EditHero.vue";

export default {
  name: 'EditHeroDialog',
  components: {EditHero},

  props: {
    hero: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      dialog: false,
    }
  },

  methods: {
    displayDialog(){
      this.dialog = true
    },

    valid(hero){
      this.$emit('valid', hero)
      this.dialog = false
    }
  },

}

</script>

<template>

  <v-dialog v-model="dialog" max-width="500px">
    <EditHero :hero="hero" @cancel="dialog = false" @valid="valid"/>
  </v-dialog>

</template>

<style scoped>

</style>