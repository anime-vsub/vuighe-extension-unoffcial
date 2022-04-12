<template>
  <button
    class="switch"
    :class="{ active: modelValue }"
    @click="$emit('update:modelValue', !modelValue)"
  ></button>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue?: boolean;
}>();
defineEmits<{
  (name: "update:modelValue", value: boolean): void;
}>();
</script>

<style lang="scss" scoped>
.switch {
  z-index: 0;
  position: relative;
  right: 14px;
  width: 42px;
  height: 24px;
  margin-top: -3px;
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  text-align: left;
  cursor: pointer;
  outline: none;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgb(233, 233, 235);
    transition: background-color 0.3s ease-in-out;
    border-radius: 100px;
  }
  &:after {
    content: "";
    position: absolute;
    z-index: 2;
    width: 20px;
    height: 20px;
    border-radius: 100px;
    background-color: #ffffff;
    top: 2px;
    left: 2px;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 25%);
    transition: left 0.3s ease-in-out;
  }
  &.active {
    &:before {
      background-color: #3fa248;
    }
    &:after {
      left: 20px;
    }
  }
}
</style>
