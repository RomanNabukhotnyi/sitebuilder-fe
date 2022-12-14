<template>
  <div class="select" ref="el">
    <div class="selected" @click="optionsVisible = !optionsVisible">
      <div>
        {{ selected }}
      </div>
      <svg
        version="1.1"
        viewBox="0 0 8 5"
        width="8px"
        height="5px"
        :class="{
          chevron: true,
          'chevron--flip': optionsVisible,
        }"
        fill="currentColor"
      >
        <g class="chevron__group">
          <path
            d="M1.30834787,0.121426937 L4.87569247,3.68780701 C5.04143584,3.8541036 5.04143584,4.11557261 4.87569247,4.2818692 L4.2807853,4.87693487 C4.20364253,4.95546204 4.09599241,5 3.98333171,5 C3.87067101,5 3.76302089,4.95546204 3.68587812,4.87693487 L0.122730401,1.30754434 C-0.0409101338,1.14044787 -0.0409101338,0.880578628 0.122730401,0.713482155 L0.718686793,0.119419971 C0.79596299,0.0427616956 0.902628913,-0.000376468522 1.01396541,2.47569236e-06 C1.1253019,0.000381419907 1.2316441,0.0442445771 1.30834787,0.121426937 L1.30834787,0.121426937 Z"
            class="chevron__box chevron__box--left"
          />
          <path
            d="M3.12493976,3.68899585 L6.68683713,0.123119938 C6.76404711,0.0445502117 6.8717041,3.56458529e-15 6.98436032,0 C7.09701655,-3.56458529e-15 7.20467353,0.0445502117 7.28188351,0.123119938 L7.87588228,0.717098143 C8.04137257,0.883371226 8.04137257,1.14480327 7.87588228,1.31107635 L4.31398491,4.87695226 C4.23695994,4.95546834 4.1294742,5 4.01698553,5 C3.90449685,5 3.79701111,4.95546834 3.71998614,4.87695226 L3.12493976,4.28197072 C2.95998402,4.11649361 2.95814736,3.85659624 3.12074929,3.68899585 L3.12493976,3.68899585 Z"
            class="chevron__box chevron__box--right"
          />
        </g>
      </svg>
    </div>
    <Transition name="slide">
      <div class="options" v-if="optionsVisible">
        <div
          class="option"
          v-for="option in options"
          :key="option.name"
          @click="selectOption(option)"
        >
          {{ option.name }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Option } from '@/interfaces/Option';
import { useEventListener } from '@/use/eventListener';
defineProps<{
  selected: string;
  options: Option[];
}>();
const emit = defineEmits<{
  (e: 'select', option: Option): void;
}>();
const optionsVisible = ref(false);
const selectOption = (option: Option) => {
  emit('select', option);
  optionsVisible.value = false;
};
const el = ref<HTMLElement | null>(null);
const hideOptions = (event: Event) => {
  if (!el.value?.contains(event.target as Node)) {
    optionsVisible.value = false;
  }
};
useEventListener(window, 'click', hideOptions);
</script>

<style scoped lang="scss">
.select {
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  position: relative;
}
.selected {
  padding: 10px;
  display: flex;
  border-radius: 5px 5px 0 0;
  background-color: #419bf9;
  justify-content: space-between;
  svg {
    align-self: center;
    margin: 0 0 0 10px;
  }
  &:first-child:last-child {
    border-radius: 5px;
  }
}
.selected:hover {
  opacity: 0.95;
}
.options {
  background-color: #fff;
  position: absolute;
  width: 100%;
  z-index: 1;
}
.option {
  padding: 10px;
  background-color: #58a9ff;
}
.option:last-child {
  border-radius: 0 0 5px 5px;
}
.option:hover {
  opacity: 0.9;
}
.slide-enter-active,
.slide-leave-active {
  transform-origin: top;
  transition: transform 0.1s linear;
}
.slide-enter-from,
.slide-leave-to {
  transform: scaleY(0);
}
// start chevron animation
.chevron {
  display: inline-block;
}

.chevron {
  width: 14px;
  height: 11px;

  &__group {
    transform: translateY(0);
    transition: transform 0.1s linear;
  }

  &__box--left,
  &__box--right {
    transform: rotate(0) translateY(0);
    transition: transform 0.1s linear;
  }

  &__box--left {
    transform-origin: 1px 1px;
  }

  &__box--right {
    transform-origin: 7px 1px;
  }

  &--flip &__box--left {
    transform: rotate(-90deg) translateY(0);
  }

  &--flip &__box--right {
    transform: rotate(90deg) translateY(0);
  }

  &--flip &__group {
    transform: translateY(3px);
  }
}
// end chevron animation
</style>
