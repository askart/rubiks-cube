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
          v-for="particle in 9"
          :key="particle"
          class="cube-2d__grid__face__particle"
        >
          <template v-if="particle % 5 === 0">
            {{ face.key }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cube2d",
  data() {
    return {
      faces: [
        { key: "U" },
        { key: "L" },
        { key: "F" },
        { key: "R" },
        { key: "B" },
        { key: "D" }
      ]
    };
  },
  computed: {
    records() {
      return this.$store.getters["ActionRecords/getRecords"];
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
      background-color gray
      &--U
        grid-area U
        & > ^[-1]__particle
          background-color white
      &--L
        grid-area L
        & > ^[-1]__particle
          background-color orange
          color white
      &--F
        grid-area F
        & > ^[-1]__particle
          background-color green
          color white
      &--R
        grid-area R
        & > ^[-1]__particle
          background-color red
          color white
      &--B
        grid-area B
        & > ^[-1]__particle
          background-color blue
          color white
      &--D
        grid-area D
        & > ^[-1]__particle
          background-color yellow
      &__particle
        display flex
        flex-flow row nowrap
        width 100%
        height 100%
        box-sizing border-box
        background-color white
        justify-content center
        align-items center
</style>
