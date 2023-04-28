<template>
  <NavBarVue/>
  <div>
    <RouterView/>
  </div>
</template>

<script setup>
import NavBarVue from './components/NavbarVue.vue'

</script>


<style>
body{
  padding: 0;
  margin: 0;
}
</style>