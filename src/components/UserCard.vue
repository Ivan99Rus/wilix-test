<template>
  <v-card class="user-card ml-2 mt-2" color="#26c6da" dark max-width="400">
    <v-card-title class="flex-column align-start">
      <a :href="`mailto:${email}`">{{ email }}</a>
      <a :href="`tel:${phoneLink}`">{{ phone | phoneFilter }}</a>
    </v-card-title>
    <v-card-text class="text-h5 font-weight-bold">
      "Turns out semicolon-less style is easier and safer in TS because most
      gotcha edge cases are type invalid as well."
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar>
          <v-icon large>{{ icons.mdiAccount }}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ username | usernameFilter }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { mdiAccount } from "@mdi/js";
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    icons: {
      mdiAccount,
    },
  }),
  props: {
    name: String,
    email: String,
    username: String,
    phone: String,
  },
  filters: {
    phoneFilter: function (val: string) {
      const phoneParts = val.split("x");
      const num = phoneParts[0]
        .replace(/[^0-9]/g, "")
        .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      const zip = phoneParts[1] ? `(${phoneParts[1]})` : "";

      return `${num} ${zip}`;
    },
    usernameFilter: function (val: string) {
      return val.startsWith("@") ? val : `@${val}`;
    },
  },
  computed: {
    phoneLink: function () {
      return this.phone.split("x")[0].replace(/[^0-9]/g, "");
    },
  },
});
</script>

<style lang="scss">
.user-card {
  width: calc(33% - 8px);

  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;

    &:hover {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>