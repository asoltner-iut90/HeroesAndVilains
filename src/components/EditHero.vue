<script>

import {mapState} from "vuex";

export default {
  name : "EditHero",
  components: {},

  data(){
    return {
      realName: "",
      publicName: "",
      powers: []
    }
  },

  props: {
    hero: {
      type: Object,
      required: true
    }
  },

  computed: {

    ...mapState("general", ["HeroPowerTypes"]),

    formattedHeroPowerTypes() {
      return this.HeroPowerTypes.map((text, index) => ({ text, value: index+1 }));
    },

    isValidForm(){
      let r = this.publicName !== "" && this.realName !== ""
      for (let power of this.powers) {
        r = r && power.name !== "" && power.type > 0 && power.type <= 7 && power.level >= 0 && power.level <= 100
      }
      return r
    },

    getHero(){
      return {
        realName: this.realName,
        publicName: this.publicName,
        powers: this.powers
      }
    },

  },

  methods: {

    addPower(){
      this.powers.push({
        name: "",
        type: 1,
        level:0,
      })
    },




    deletePower(power){
      let index = this.powers.indexOf(power)
      this.powers.splice(index, 1)
    },



    reset(){
      this.realName = this.hero.realName
      this.publicName = this.hero.publicName
      this.powers = this.hero.powers
    },

    copyValues(){
      this.realName = this.hero.realName
      this.publicName = this.hero.publicName
      this.powers = []
      for (let power of this.hero.powers) {
        this.powers.push({
          name: power.name,
          type: power.type,
          level: power.level
        })
      }
    }

  },

  watch: {
    hero: {
      handler: function(newVal) {
        if (newVal) {
          this.copyValues()
        }
      },
      deep: true
    }
  },

  mounted() {
    this.copyValues()
  }

}

</script>

<template>
  <v-card>
    <v-card-title>
      <span class="headline">Editer un héro</span>
    </v-card-title>
    <v-card-text>
      <span class="mr-2 font-weight-bold" style="font-size: 1.2rem;">Identité</span>

      <v-text-field v-model="realName" label="Entrez le vrai nom du héro" />

      <v-text-field v-model="publicName" label="Entrez le nom public du héro" />


      <span class="mr-2 font-weight-bold" style="font-size: 1.2rem;">Pouvoirs</span>
      <v-btn @click="addPower">
        <v-icon left color="success" >mdi-plus</v-icon>
      </v-btn>

      <v-virtual-scroll style="max-height: 20vh;"
          :items="powers"
          height="350"
          item-height="48"
      >
        <template v-slot:default="{ item }" >
          <v-list-item >
            <v-row>
              <v-col cols="3">
                <v-text-field label="Nom" v-model="item.name"/>
              </v-col>

              <v-col cols="3">
                <v-select
                    v-model="item.type"
                    :items="formattedHeroPowerTypes"
                    item-title="text"
                    item-value="value"
                    label="Choisir un type"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field label="Niveau" type="number" :min=0 :max=100 v-model="item.level" />

              </v-col>
              <v-col cols="3">
                <v-btn @click="deletePower(item)">
                  <v-icon left color="error">mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item>
        </template>
      </v-virtual-scroll>

    </v-card-text>
    <v-card-actions>
      <v-btn color="error" @click="$emit('cancel')">Annuler</v-btn>
      <v-btn color="success" :disabled="!isValidForm" @click="$emit('valid', getHero); reset()"> Valider</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>