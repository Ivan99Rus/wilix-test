<template>
  <div class="main-form">
    <form class="main-form__form" @submit.prevent="submitHandler">
      <v-text-field
        v-model="query"
        label="Введите запрос"
        outlined
        clearable
      ></v-text-field>
      <v-btn
        elevation="2"
        class="main-form__button"
        x-large
        @click="submitHandler"
        :loading="isLoading"
      >
        Найти
      </v-btn>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    query: null,
    isLoading: false,
  }),
  methods: {
    submitHandler() {
      if (!this.query) {
        return;
      }

      this.isLoading = true;
      const type = this.checkResult();
      this.$store.commit("setType", type);
      this.$router.push("result");
    },
    checkResult() {
      let result = null;
      const regs = {
        mail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        username: /^@?[a-zA-ZА-Яа-я0-9\_\.]+$/ /* eslint-disable-line */,
        name: /^[a-zа-я ,.'-]+\s[a-zа-я ,.'-]+$/i,
        ip: /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/,
        phone: /^[0-9]+$/,
      };
      const types = ["mail", "username", "name", "ip", "phone"];

      types.forEach((type) => {
        if (
          (regs as any)[type].test(
            type === "phone"
              ? // eslint-disable-next-line
                (this.query as any).replace(/[\+\(\)\_\-\s]/g, "")
              : this.query
          )
        ) {
          result = type;
        }
      });
      return result;
      // 193.161.215.89
    },
  },
});
</script>

<style lang="scss">
.main-form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  &__form {
    display: flex;
    align-items: center;

    .v-input__slot {
      margin-bottom: 0;
    }

    .v-text-field__details {
      display: none;
    }
  }
}
</style>