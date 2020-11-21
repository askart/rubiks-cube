<template>
  <div class="action-panel">
    <div class="action-panel__btns">
      <template v-for="btn in btns">
        <base-button :key="btn.action" @click="handleClick(btn)">{{
          btn.label
        }}</base-button>
      </template>
    </div>
    <div class="action-panel__input"></div>
  </div>
</template>

<script>
export default {
  name: "ActionPanel",
  data() {
    return {
      btns: [
        { action: "F", label: "F" },
        { action: "F'", label: "F'" },
        { action: "L", label: "L" },
        { action: "L'", label: "L'" },
        { action: "R", label: "R" },
        { action: "R", label: "R'" },
        { action: "B", label: "B" },
        { action: "B'", label: "B'" },
        { action: "U", label: "U" },
        { action: "U'", label: "U'" },
        { action: "D", label: "D" },
        { action: "D", label: "D'" }
      ]
    };
  },
  methods: {
    handleClick({ action }) {
      this.$store.dispatch("ActionRecords/actionAddRecord", action);
    }
  }
};
</script>

<style lang="stylus" scoped>
.action-panel
  flex 0 0 auto
  display flex
  flex-flow column nowrap
  width 300px
  height 100%
  border 1px solid black
  box-sizing border-box
  &__btns
    display grid
    grid-template-columns repeat(4, 1fr)
    grid-auto-rows 50px
    grid-gap 0 0
    place-items center
</style>
