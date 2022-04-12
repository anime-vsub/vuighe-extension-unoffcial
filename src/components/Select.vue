<template>
  <div class="relative">
    <div class="select" @click.prevent.stop="showOptions = !showOptions">
      <template v-if="$slots.value">
        <slot name="value" :option="optionSelected" />
      </template>
      <template v-else>
        {{ optionSelected?.name ?? optionSelected?.value ?? "&lt;any&gt;" }}
      </template>
      <akar-icons-chevron-down class="ml-1" />
    </div>
    <ul
      v-show="showOptions"
      class="options"
      @click.prevent.stop="closeAfterSelect ? (showOptions = false) : void 0"
    >
      <li
        v-for="(item, index) in options"
        :key="index"
        :class="{
          active: (item.value ?? item.name) === modelValue,
        }"
        @click="$emit('update:modelValue', item.value ?? item.name)"
      >
        <template v-if="$slots.item">
          <slot name="item" :item="item" :index="index" />
        </template>
        <template v-else>
          {{ item.name ?? item.value }}
        </template>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: any;
  options: {
    name: string;
    value?: any;
  }[];
  closeAfterSelect?: boolean;
}>();
defineEmits<{
  (name: "update:modelValue", value: any): void;
}>();

const showOptions = ref<boolean>(false);

const optionSelected = computed<{
  name: string;
  value?: any;
} | void>(() => {
  return props.options.find(
    (opt) => (opt.value ?? opt.name) === props.modelValue
  );
});

function onClickWindow() {
  showOptions.value = false;
}

watch(showOptions, (value) => {
  if (value) {
    removeEventListener("click", onClickWindow);
    addEventListener("click", onClickWindow);
  } else {
    removeEventListener("click", onClickWindow);
  }
});
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(233, 233, 235);
  padding: 2px 6px; //4 8
  border-radius: 4px;
  border: 1px solid #ced4da;
  cursor: pointer;
  position: relative;
  font-size: 13px;
  &:hover {
    border-color: #86b7fe;
  }
  user-select: none;
}

.options {
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ced4da;
  box-shadow: 0 1px 5px #0003, 0 2px 2px #00000024, 0 3px 1px -2px #0000001f;
  // display: none;

  > li {
    padding: 4px 5px;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: rgba(#000, 0.1);
    }

    &.active {
      color: #1976d2;
      font-weight: 600;
      &,
      &:hover {
        background-color: rgba(#1976d2, 0.1);
      }
    }
  }
}

.relative.bottom .options {
  top: auto;
  bottom: 100%;
}
</style>
