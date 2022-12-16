<template>
  <div class="panel__search">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path
        fill="#979197"
        fill-rule="evenodd"
        d="M2.01 11.715c-2.68-2.68-2.68-7.025 0-9.705 2.68-2.68 7.025-2.68 9.705 0 2.35 2.35 2.64 5.978.87 8.643.034.028.068.06.1.09l2.912 2.913c.536.536.54 1.4 0 1.94-.536.537-1.402.54-1.94 0l-2.913-2.91c-.032-.033-.063-.067-.09-.102-2.666 1.77-6.295 1.48-8.644-.87zm1.94-1.94c1.61 1.607 4.216 1.607 5.824 0 1.608-1.61 1.608-4.216 0-5.824-1.608-1.607-4.215-1.607-5.823 0-1.607 1.61-1.607 4.216 0 5.824z"
      ></path>
    </svg>
    <input
      type="text"
      placeholder="Filter by name"
      v-model="search"
      @input="filter"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
  data() {
    return {
      search: '',
    };
  },
  methods: {
    filter() {
      this.$emit('filter', this.search);
    },
  },
});
</script>

<style scoped>
.panel__search {
  margin: 0 0 0 36px;
  width: 140px;
  height: 28px;
  position: relative;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: text;
}

.panel__search svg {
  top: 50%;
  transform: translateY(-50%);
  left: 12px;
  position: absolute;
}

.panel__search input {
  width: 100%;
  height: 100%;
  font-size: 15px;
  padding: 0 0 0 34px;
  color: #554d56;
  background-color: #f7f7f7;
  caret-color: #419bf9;
}
</style>
