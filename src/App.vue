<template>
  <div id="app">
    <router-view/>
    <notifications group="foo" position="top center" />
  </div>
</template>

<script>
import Vue from 'vue';
import store from './store';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);

export default {
  computed: {
    authId() {
      return store.state.authId
    }
  },
  watch: {
    authId: function (current, old) {
      console.log(current)
      if(current) {
        this.loader.hide()
      }
    }
  },
  data() {
      return {
        loader: '',
        fullPage: false
      }
  },
  created() {
    // this.loader = this.$loading.show();      
  }
}
</script>


<style lang="postcss" src="./assets/tailwind.postcss"></style>
<style lang="css" src="./assets/main.css"></style>
