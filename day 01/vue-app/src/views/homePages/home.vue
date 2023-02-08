<template>
  <div class="homes">
    <div class="home_header">
      蓝图在线
      <div class="home_context">专注在线教育，用心做课程，用心做服务！</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss" scoped>
.homes {
  width: 100%;
  height: 100%;
  background: url(@/assets/home.jpg) no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .home_header {
    text-align: center;
    font-size: 40px;
    font-family: serif;
    font-weight: 700;
    color: #fff;
    margin-top: -340px;
    .home_context {
      font-size: 20px;
    }
  }
}
</style>
