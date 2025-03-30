<script>
import { mapActions, mapState } from "vuex";
import AddHeroDialog from "@/components/AddHeroDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import EditHeroDialog from "@/components/EditHeroDialog.vue";

export default {
  name: "TeamView",
  components: { EditHeroDialog, ConfirmDialog, AddHeroDialog },

  data() {
    return {
      selectedHero: { publicName: "", realName: "", powers: [] },
    };
  },

  computed: {
    ...mapState("general", ["CurrentTeam", "HeroPowerTypes"]),
  },

  methods: {
    ...mapActions("general", ["getHero", "removeHeroesFromTeam", "updateHero"]),

    openAddDialog() {
      this.$refs.AddHeroDialog.displayDialog();
    },

    async removeHero(hero) {
      let data = {
        idTeam: this.CurrentTeam._id,
        heroes: [hero._id],
      };
      this.$refs.ConfirmDialog.displayDialog(
        "Suppression",
        "Voulez-vous vraiment enlever de l'équipe le héros " + hero.publicName,
        () => {
          this.removeHeroesFromTeam(data);
        }
      );
    },

    selectHero(hero) {
      this.selectedHero = hero;
      this.$refs.EditHeroDialog.displayDialog();
    },

    async update(hero) {
      hero._id = this.selectedHero._id;
      await this.updateHero(hero);
    },
  },
};
</script>

<template>
  <div class="TeamView">
    <div v-if="!CurrentTeam">
      <h2>Aucune équipe sélectionnée</h2>
      <v-btn color="success" @click="$router.push('/organisations')">OK</v-btn>
    </div>
    <v-container v-else>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr style="border: 2px solid black">
              <th class="text-left">Id</th>
              <th class="text-left" colspan="2">Nom</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ CurrentTeam._id }}</td>
              <td colspan="2">{{ CurrentTeam.name }}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th class="text-left" colspan="2">
                Membres
                <v-btn color="success" class="ma-3" @click="openAddDialog"
                  >Ajouter</v-btn
                >
              </th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(member, index) in CurrentTeam.members" :key="index">
              <td colspan="2">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Id</th>
                        <th class="text-left">Nom</th>
                        <th class="text-left">Alias</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="member">
                        <td>{{ member._id }}</td>
                        <td>{{ member.publicName }}</td>
                        <td>{{ member.realName }}</td>
                      </tr>
                      <tr v-else>
                        <td colspan="3">Chargement...</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th class="text-left" colspan="3">Pouvoirs</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colspan="3">
                          <v-list-item
                            v-for="(power, index) in member.powers"
                            :key="index"
                          >
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ power.name }} de type
                                {{ HeroPowerTypes[power.type - 1] }} et niveau
                                {{ power.level }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </td>
              <td>
                <v-btn color="warning" class="ma-3" @click="selectHero(member)"
                  >Modifier</v-btn
                >
                <v-btn color="error" @click="removeHero(member)"
                  >Supprimer</v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <AddHeroDialog ref="AddHeroDialog" />

      <EditHeroDialog
        :hero="selectedHero"
        ref="EditHeroDialog"
        @valid="update"
      />

      <ConfirmDialog ref="ConfirmDialog" />
    </v-container>
  </div>
</template>

<style scoped></style>
