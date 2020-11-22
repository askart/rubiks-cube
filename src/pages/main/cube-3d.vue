<template>
  <div id="cube-3d" class="cube-3d" />
</template>

<script>
import { init, animate } from "@/lib/cube3d";

export default {
  name: "Cube3d",
  mounted() {
    init("cube-3d", 500, 300);
    animate();
  }
};
</script>

<style lang="stylus" scoped>
.cube-3d
  flex 1 0 auto
  display flex
  align-items center
  justify-content center
  width 100%
  height 100%
  border 1px solid black
  box-sizing border-box
</style>
