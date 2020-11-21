<template>
  <div class="action-panel">
    <div class="action-panel__btns">
      <template v-for="btn in btns">
        <base-button :key="btn.action" @click="handleClick(btn)">{{
          btn.label
        }}</base-button>
      </template>
    </div>
    <div class="action-panel__input">
      <base-form-input
        v-model.trim="rotations"
        id="action-panel__input"
        name="action-panel__input"
        placeholder=""
        @keyup.enter="applyRotations(rotations)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionPanel",
  data() {
    return {
      btns: [
        { action: "U", label: "U" },
        { action: "U'", label: "U'" },
        { action: "U2", label: "U2" },
        { action: "L", label: "L" },
        { action: "L'", label: "L'" },
        { action: "L2", label: "L2" },
        { action: "F", label: "F" },
        { action: "F'", label: "F'" },
        { action: "F2", label: "F2" },
        { action: "R", label: "R" },
        { action: "R'", label: "R'" },
        { action: "R2", label: "R2" },
        { action: "B", label: "B" },
        { action: "B'", label: "B'" },
        { action: "B2", label: "B2" },
        { action: "D", label: "D" },
        { action: "D'", label: "D'" },
        { action: "D2", label: "D2" }
      ],
      rotations: ""
    };
  },
  methods: {
    handleClick({ action }) {
      this.$store.dispatch("ActionRecords/actionAddRecord", action);
    },
    applyRotations(rotations) {
      let chars = rotations.replace(/[\s,]/g, "").split("");
      let actions = [];
      let index = 0;
      chars.forEach(char => {
        if (/[ULFRBD]/i.test(char)) {
          actions.push(char);
          index++;
        } else if (/['2]/i.test(char)) {
          actions[index - 1] += char;
        }
      });
      actions.forEach(action => {
        this.$store.dispatch("ActionRecords/actionAddRecord", action);
      });
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
    grid-template-columns repeat(3, 1fr)
    grid-auto-rows 50px
    grid-gap 0 0
    place-items center
</style>
