<script>

import {mapActions, mapState} from "vuex";
import EditHero from "@/components/EditHero.vue";

export default {
  name: "AddHeroDialog",
  components: {EditHero},

  data() {
    return {
      dialog: false,
      selectedHero: null,
      tab: 0,
      emptyHero: {'publicName':'', 'realName':'', 'powers':[]}

    }
  },

  computed: {
    ...mapState(['HeroAliases', "CurrentTeam"]),

    sortedHeroes() {
      let heroes = this.HeroAliases.filter(obj1 =>
        !this.CurrentTeam.members.some(obj2 => obj1._id === obj2._id)
      ).sort((a, b) => a.publicName > b.publicName)
      return heroes
    },

    isValidForm() {
        return this.selectedHero !== null;
    }

  },

  methods: {
    ...mapActions(["getHeroAliases", "addHeroesToTeam", "createHero"]),

    displayDialog(){
      this.dialog = true
    },

    async createNewHero(hero) {
      this.dialog = false
      let creation = await this.createHero(hero)
      let id = creation._id
      let data = {
        "idTeam": this.CurrentTeam._id,
        "heroes": [id]
      }
      await this.addHeroesToTeam(data)
    },

    async recruitHero(){
      this.dialog = false
      let data = {
        "idTeam": this.CurrentTeam._id,
        "heroes": [this.selectedHero._id]
      }
      await this.addHeroesToTeam(data)
      this.selectedHero = null
    },


  },

  mounted() {
    this.getHeroAliases()
  }
}

</script>

<template>
  <div class="add-hero-dialog">
    <v-dialog v-model="dialog" max-width="500">
          <v-tabs v-model="tab">
            <v-tab key=0>Recruter un héro</v-tab>
            <v-tab key=1>Créer un héro</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">



            <v-tab-item >

              <v-card>

                <v-card-title>
                  <span class="headline">Recruter un héro</span>
                </v-card-title>

                <v-card-text>
                  <v-virtual-scroll
                      :items="sortedHeroes"
                      height="350"
                      item-height="48"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item>
                        <v-checkbox
                            :label="item.publicName"
                            :value="item"
                            v-model="selectedHero"
                        ></v-checkbox>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>
                </v-card-text>

                <v-card-actions>
                  <v-btn @click="dialog = false" color="error">Annuler</v-btn>
                  <v-btn :disabled="!isValidForm" color="success" @click="recruitHero">Valider</v-btn>
                </v-card-actions>

              </v-card>


            </v-tab-item>

            <v-tab-item>
              <br>
              <EditHero :hero="emptyHero" @cancel="dialog = false" @valid="createNewHero" />

            </v-tab-item>


          </v-tabs-items>

    </v-dialog>
  </div>


</template>

<style scoped>

</style>