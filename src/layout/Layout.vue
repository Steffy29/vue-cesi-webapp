<template>
  <div class="wrapper">
    <side-bar data="dark-edition">
      <template slot="links">
        <sidebar-link to="/meteo" :name="$t('sidebar.meteo')" icon="cloud-sun" type="font-awesome"></sidebar-link>
        <sidebar-link to="/beers" :name="$t('sidebar.beers')" icon="beer" type="font-awesome"></sidebar-link>
        <sidebar-link to="/hearthstone" :name="$t('sidebar.hearthstone')" icon="dragon" type="font-awesome"></sidebar-link>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <layout-content @click.native="toggleSidebar"></layout-content>
    </div>
  </div>
</template>

<script>
import LayoutContent from './Content';
import TopNavbar from '@/components/TopNavbar.vue';

export default {
  components: {
    LayoutContent,
    TopNavbar,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
}
</script>

<style>
</style>
