<template>
  <v-container>
    <div v-if="type">
      <div>
        <h1 class="mb-1">{{ type }} page</h1>
        <router-link to="/" class="d-block mb-6">Go to main page</router-link>
      </div>
      <div class="d-flex flex-wrap mt-n2 ml-n2">
        <UserCard
          v-for="user in users"
          :key="user.id"
          :name="user.name"
          :email="user.email"
          :username="user.username"
          :phone="user.phone"
        />
      </div>
    </div>
    <div v-else>
      <v-alert type="error"> Wrong format! </v-alert>
      <router-link to="/" class="d-block mb-6">Go to main page</router-link>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import UserCard from "@/components/UserCard.vue";

export default Vue.extend({
  data: () => ({
    type: null,
  }),
  components: {
    UserCard,
  },
  methods: {},
  computed: {
    ...mapGetters({
      users: "getUsers",
    }),
  },
  mounted() {
    this.type = this.$store.getters.getType;

    if (!this.type) {
      return;
    }

    this.$store.dispatch("asyncGetData");
  },
});
</script>