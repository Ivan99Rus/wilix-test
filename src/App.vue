<template>
  <v-app>
    <v-main>
      <transition name="fade">
        <router-view s/>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>