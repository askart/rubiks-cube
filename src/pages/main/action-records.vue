<template>
  <div class="action-records">
    <template v-for="(record, index) in records">
      <div :key="index" class="action-records__item">{{ record }}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: "ActionRecords",
  computed: {
    records() {
      return this.$store.getters["ActionRecords/getRecords"];
    }
  }
};
</script>

<style lang="stylus" scoped>
.action-records
  flex 0 0 auto
  display grid
  grid-template-columns repeat(3, 1fr)
  grid-auto-rows 50px
  grid-gap 0 0
  width 169px
  height 100%
  border 1px solid black
  box-sizing border-box
  overflow-y scroll
  &__item
    display flex
    justify-content center
    align-items center
    width 100%
    height 100%
    box-sizing border-box
    border 1px solid black
</style>
