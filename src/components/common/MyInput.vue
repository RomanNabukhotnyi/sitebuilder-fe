<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: [String, Number],
  },
  setup() {
    return {};
  },
  methods: {
    updateInput(event: any) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
});
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid #419bf9;
  padding: 10px;
  margin: 15px 0 0;
}
</style>
