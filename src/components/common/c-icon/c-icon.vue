<template>
  <span class="material-icons-outlined md-18">{{ iconName }}</span>
</template>

<script setup lang="ts">
defineProps<{
    iconName: string;
}>();
</script>