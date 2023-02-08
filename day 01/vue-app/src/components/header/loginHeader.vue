<template>
  <div class="LoginHeader">{{ text }}</div>
</template>

<script>
export default {
  name: "LoginHeader",

  props: {
    text: {
      type: String,
      default: "蓝图在线后台管理系统",
    },
  },
};
</script>

<style lang="scss" scoped>
.LoginHeader {
  width: 100%;
  text-align: center;
  line-height: 1;
  height: 23px;
  font-size: 24px;
  font-family: serif;
  color: #3e3e3e;
}
</style>
