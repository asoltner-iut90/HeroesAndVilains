<script>

export default {
  name: 'TeamsList',

  props: {
    Teams: {
      type: Array,
      default: () => []
    }
  },

}

</script>

<template>
  <div class="OrganisationList">
    <v-row>
      <v-col
          v-for="(team, index) in Teams"
          :key="index"
          class="d-flex"
          style="flex: 1 1 auto; max-width: fit-content;"
      >
        <v-btn>
          {{team.name}}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

</style>