<template>
  <button
    v-bind="$attrs"
    type="button"
    :class="['base-button', btnClass, btnSize, width, align]"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>
<script>
export default {
  name: "BaseButton",
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
    },
    align: {
      type: String,
      default: "center"
    }
  },
  computed: {
    browserWidth() {
      return this.$store.getters["WindowResize/getWidth"];
    },
    btnSize() {
      if (this.size !== "big") return this.size;
      if (this.browserWidth > 768) return this.size;
      return "medium";
    }
  }
};
</script>
<style lang="stylus" scoped>
.base-button
  display flex
  align-items center
  margin 0
  box-sizing border-box
  border-width 1px
  border-style solid
  text-decoration none
  cursor pointer
  transition background 250ms ease-in-out, transform 150ms ease, opacity .3s ease-in-out
  -webkit-appearance none
  -moz-appearance none
  user-select none
  &:focus
    outline none
  &:active
    transform scale(0.99)
  &:disabled, &[disabled]
    opacity 0.3
    cursor not-allowed
  &.fit
    width fit-content
  &.full
    width 100%
    min-width fit-content
  &.center
    justify-content center
    text-align center
  &.left
    justify-content flex-start
    text-align left
  &.small
    height 32px
    padding 8px 16px
    border-radius 3px
    font-weight 500
    font-size 12px
    line-height 16px
  &.medium
    height 40px
    padding 12px 16px
    border-radius 3px
    font-weight 500
    font-size 14px
    line-height 16px
    &.fixed
      min-width 148px
  &.big
    height 64px
    padding 21px 0
    border-radius 6px
    font-weight 600
    font-size 18px
    line-height 22px
  &.default
    border-color #4F4F4F
    background #ffffff
    color #4F4F4F
    &:hover, &:focus
      background #4F4F4F04
  &.primary
    border-color darken(#1565D8, 5%)
    background #1565D8
    color #ffffff
    &:hover, &:focus
      background darken(#1565D8, 10%)
  &.primary-inverse
    border-color #0069FF
    background #ffffff
    color #0069FF
    &:hover, &:focus
      background #0069FF04
  &.lightgray
    border none
    border-color #F7F8FC
    background #F7F8FC
    color #7A869A
    &:hover, &:focus
      background darken(#F7F8FC, 2%)
</style>
