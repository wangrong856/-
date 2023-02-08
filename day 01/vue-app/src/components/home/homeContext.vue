<template>
  <div class="HomeContext">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "HomeContext",
};
</script>

<style lang="scss" scoped>
.HomeContext {
  flex: 1;
  background: rgb(50, 51, 56);
  overflow: auto;
}
</style>
