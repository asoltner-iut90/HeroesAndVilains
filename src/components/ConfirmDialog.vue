<script >
export default{

  name: "ConfirmDialog",

  props: {

  },

  data() {
    return {
      dialog: false,
      title: String,
      message: String,
      onConfirm: Function
    }
  },

  methods: {
    confirm() {
      this.onConfirm();
      this.dialog = false;
    },

    displayDialog(title, message, onConfirm) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.onConfirm = onConfirm;
    }
  }

}

</script>

<template>
  <div class="ConfirmDialog">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Annuler
          </v-btn>
          <v-btn color="blue darken-1" text @click="confirm">
            Continuer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<style scoped>

</style>