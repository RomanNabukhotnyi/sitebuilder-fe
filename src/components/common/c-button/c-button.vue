<template>
  <button class="c-button">
    <slot />
  </button>
</template>

<style lang="scss">
.c-button {
  position: relative;
  display: flex;
  background-color: #419bf9;
  color: #fff;
  min-height: 30px;
  border-radius: 2px;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    opacity: 0.9;
  }
}
</style>
