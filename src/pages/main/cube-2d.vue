<template>
  <div class="cube-2d">
    <div class="cube-2d__grid">
      <div
        v-for="face in faces"
        :key="face.key"
        class="cube-2d__grid__face"
        :class="`cube-2d__grid__face--${face.key}`"
      >
        <div
          v-for="particle in face.particles"
          :key="`${face.key}__${particle.key}`"
          class="cube-2d__grid__face__particle"
          :style="{
            backgroundColor: particle.color,
            color: particle.fontColor
          }"
        >
          <template v-if="particle.content">{{ particle.content }}</template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { generateFaces, getNewFaces } from "@/lib/cube2d";
import { deepClone } from "@/lib/utils";

export default {
  name: "Cube2d",
  data() {
    return {
      faces: [],
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
  created() {
    this.initFaces();
  },
  methods: {
    initFaces() {
      this.faces = generateFaces();
    },
    handleMove(move) {
      this.faces = getNewFaces(deepClone(this.faces), move);
    }
  }
};
</script>

<style lang="stylus" scoped>
.cube-2d
  flex 1 0 auto
  display flex
  flex-flow row nowrap
  justify-content center
  align-items center
  width auto
  height 100%
  border 1px solid black
  box-sizing border-box
  background-color lightgray
  &__grid
    display grid
    grid-template-areas ". U . ." "L F R B" ". D . ."
    grid-template-columns repeat(4, 100px)
    grid-auto-rows 100px
    grid-gap 1px 1px
    &__face
      display grid
      grid-template-columns repeat(3, 1fr)
      grid-auto-rows 1fr
      grid-gap 1px 1px
      width 100%
      height 100%
      box-sizing border-box
      background-color lightgray
      &--U
        grid-area U
      &--L
        grid-area L
      &--F
        grid-area F
      &--R
        grid-area R
      &--B
        grid-area B
      &--D
        grid-area D
      &__particle
        display flex
        flex-flow row nowrap
        width 100%
        height 100%
        box-sizing border-box
        justify-content center
        align-items center
</style>
