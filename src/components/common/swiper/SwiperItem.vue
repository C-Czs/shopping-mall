<template>
    <div class="swiperitem">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'SwiperItem'
}
</script>

<style scoped>
  .swiperitem {
      width: 100%;
      flex-shrink: 0;
  }

  .swiperitem img {
      width: 100%;
  }
</style>