<template>
  <div class="MainPage">
    <div class="page_container">
      <home-header></home-header>
      <div class="page_containers">
        <home-aside></home-aside>
        <home-context></home-context>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Day02MainPage",
};
</script>

<style lang="scss" scoped>
.MainPage {
  width: 100%;
  height: 100%;
  .page_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .page_containers {
      width: 100%;
      height: 100%;
      background-color: rgb(53, 64, 85);
      display: flex;
    }
  }
}
</style>
