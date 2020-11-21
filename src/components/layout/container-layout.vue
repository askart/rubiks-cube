<template>
  <div class="container-layout">
    <div class="container-layout__row">
      <slot name="row-1" />
    </div>
    <div class="container-layout__row">
      <slot name="row-2" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ContainerLayout"
};
</script>

<style lang="stylus" scoped>
.container-layout
  flex 0 0 auto
  width 900px
  height auto
  overflow auto
  display flex
  flex-flow column nowrap
  align-self center
  &__row
    flex 0 0 auto
    width 100%
    height 350px
    display flex
    flex-flow row nowrap
</style>
