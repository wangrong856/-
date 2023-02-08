<!--  -->
<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
import LoadIng from './components/loaders/Loaders.vue';
export default {
  name: "Com",
  data() {
    return {};
  },

  components: {LoadIng},

  computed: {},

  mounted() {},

  methods: {},
  watch: {},
  mixins: [],
};
</script>
<style lang="scss">

</style>
