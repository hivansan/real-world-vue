<template>
  <div>
    <button v-on="$listeners" v-bind="$attrs" :class="buttonClass">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
</style>