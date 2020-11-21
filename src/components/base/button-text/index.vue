<template>
  <div
    v-bind="$attrs"
    :class="['base-button-text', btnClass, size, width]"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: "BaseButtonText",
  inheritAttrs: false,
  props: {
    btnClass: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "medium"
    },
    width: {
      type: String,
      default: "fit"
    }
  }
};
</script>
<style lang="stylus" scoped>
.base-button-text
  display inline-block
  height auto
  margin 0
  padding 0
  border none
  box-sizing border-box
  text-decoration none
  text-align center
  cursor pointer
  transition opacity .3s ease-in-out
  -webkit-appearance none
  -moz-appearance none
  user-select none
  &:focus
    outline none
  &:disabled, &[disabled]
    opacity 0.3
    cursor not-allowed
  &.fit
    width fit-content
  &.full
    width 100%
    min-width fit-content
  &.medium
    font-weight 500
    font-size 14px
    line-height 16px
  &.primary
    color #0069ff
</style>
