<script>

import {mapActions, mapState} from "vuex";

export default {
  name:'OrganisationList',
  computed:{
    ...mapState(["CurrentOrganisation", "OrganisationPassword"]),
  },
  props: {
    OrganisationNames: {
      type: Array,
      default: () => []
    }
  },

  methods:{

    ...mapActions(["getOrganisation"]),

    async selectOrganisation(orgId){
      await this.getOrganisation({"id": orgId, "secret": this.OrganisationPassword});
      if (this.CurrentOrganisation){
        await this.$router.push("/organisation");
      }
    }
  }
}

</script>

<template>
  <div class="OrganisationList">
    <v-row>
      <v-col
          v-for="(org, index) in OrganisationNames"
          :key="index"
          class="d-flex"
          style="flex: 1 1 auto; max-width: fit-content;"
      >
        <v-btn @click="selectOrganisation(org._id)">
          {{org.name}}
        </v-btn>
      </v-col>
    </v-row>
  </div>

</template>

<style>

</style>