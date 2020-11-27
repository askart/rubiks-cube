<template>
  <div id="cube-3d" class="cube-3d" />
</template>

<script>
import { init, rotate } from "@/lib/cube3d";

export default {
  name: "Cube3d",
  data() {
    return {
      index: 0
    };
  },
  computed: {
    records() {
      return this.$store.getters["ActionRecords/getRecords"];
    }
  },
  watch: {
    records: {
      handler: function(val) {
        let len = val.length;
        for (let i = this.index; i < len; i++) {
          this.handleMove(val[i]);
        }
        this.index = len;
      }
    }
  },
  mounted() {
    init("cube-3d", 600, 300);
  },
  methods: {
    handleMove(move) {
      rotate(move);
    }
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
  & >>> > canvas
    outline none
</style>
