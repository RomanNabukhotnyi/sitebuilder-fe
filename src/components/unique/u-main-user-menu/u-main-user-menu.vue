<template>
  <div class="u-main-user-menu">
    <div
      v-if="show"
      class="overlay"
      @click="emit('update:show', false)"
    />
    <Transition
      v-if="show"
      name="menu"
    >
      <div
        ref="el"
        class="menu"
      >
        <div class="email">
          {{ user?.email }}
        </div>
        <div
          class="action"
          @click="$emit('logout')"
        >
          Log out
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    user: { email: string } | null;
    show: boolean;
  }>(),
  {
    show: false,
  }
);

const emit = defineEmits<{
  (e: 'logout'): void;
  (e: 'update:show', value: boolean): void;
}>();
</script>

<style lang="scss" src="./u-main-user-menu.scss" />
