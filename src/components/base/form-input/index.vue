<template>
  <div class="base-form-input">
    <label
      v-if="label"
      :for="$attrs.id"
      :class="['base-form-input__label', size, theme]"
      >{{ label }}</label
    >
    <div :class="['base-form-input__input', size, theme]">
      <template>
        <input
          :ref="$attrs.id"
          v-bind="$attrs"
          autocomplete="off"
          :value="value"
          v-on="inputListeners"
        />
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseFormInput",
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "medium"
    },
    theme: {
      type: String,
      default: "light"
    }
  },
  computed: {
    inputListeners: function() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: vm.getEmitHandler("input", vm),
        change: vm.getEmitHandler("change", vm)
      });
    }
  },
  methods: {
    getEmitHandler(eventType, vm) {
      return function(event) {
        let value = event.target.value;
        if (vm.$attrs.type === "text" || vm.$attrs.type === undefined) {
          value = value.trim();
        }
        vm.$emit(eventType, value);
      };
    }
  }
};
</script>
<style lang="stylus" scoped>
.base-form-input
  display flex
  flex-flow column nowrap
  width 100%

  &__label
    font-weight 400
    color #696F79
    &.medium
      font-size 14px
      line-height 16px
      &:not(:empty)
        margin-bottom 8px

  &__input
    position relative
    width inherit
    &.medium
      & > input
        padding 12px 24px 12px
        border-radius 3px
        font-size 14px
        line-height 16px
        height 40px
    &.light
      & > input
        background #FFFFFF
        border 1px solid #8692A6
        color #494949
        &:focus
          transition ease-in-out .2s box-shadow
          box-shadow 0px 4px 10px 3px rgba(21, 101, 216, 0.11)
          border-color #1565D8
        &:disabled, &[disabled]
          background-color darken(#FFFFFF, 5%)
        &::placeholder
          font-weight 400
          color #8692A6
    &.lightgray
      & > input
        background rgba(247, 248, 252, 0.2)
        border 1px solid #DFE0EB
        color #494949
        &:focus
          border-color #1565D8
        &:disabled, &[disabled]
          background rgba(247, 248, 252, 0.4)
        &::placeholder
          font-weight 400
          color rgba(37, 39, 51, 0.5)
</style>
<style lang="stylus" scoped>
input
  width inherit
  height inherit
  margin 0
  box-sizing border-box
  font-weight 500
  transition ease-in-out .2s border-color, ease-in-out 0.2s background
  &:focus
    outline none
  &:disabled, &[disabled]
    cursor not-allowed
</style>
