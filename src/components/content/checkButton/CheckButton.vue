<template>
    <div class="check-button" :class="{check: isChecked}" @click="checkBtnClick">
        <img src="~assets/img/cart/tick.svg">
    </div>
</template>

<script>
export default {
    name: 'CheckButton',
    props: {
        isChecked: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        checkBtnClick() {
            this.$emit('checkClick')
        }
    }
}
</script>

<style scoped>
  .check-button {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      position: relative;
      border: 2px solid #aaa;
      cursor: pointer;
  }
  .check {
      border-color: #ff8198;
      background-color: #ff8198;
  }
</style>