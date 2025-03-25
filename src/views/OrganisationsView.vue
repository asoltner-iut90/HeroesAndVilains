<template>
  <div>
    <v-container>
      <h1>Organisations</h1>
      <v-btn color="primary" @click="newOrganisation" class="mb-4">Ajouter</v-btn>
      <OrganisationList :organisation-names="sortedOrganisationNames"/>
    </v-container>

    <AddOrganisationDialog ref="addOrgDialog" />

  </div>
</template>

<script>

import {mapActions, mapState} from "vuex";
import OrganisationList from "@/components/OrganisationsList.vue";
import NewOrganisationDialog from "@/components/NewOrganisationDialog.vue";

export default {
  name:'OrganisationsView',
  components: {AddOrganisationDialog: NewOrganisationDialog, OrganisationList},
  computed:{
    ...mapState(["OrganisationNames"]),

    sortedOrganisationNames(){
      let sortedOrganisationNames = this.OrganisationNames
      return sortedOrganisationNames.sort((a,b) => a.name.localeCompare(b.name))
    },



  },
  methods:{
    ...mapActions(["getOrganisations"]),

    newOrganisation(){
      this.$refs.addOrgDialog.displayDialog()
    },


  },

  data(){
    return{

    }
  },

  mounted() {
    this.getOrganisations()
  }

}

</script>
