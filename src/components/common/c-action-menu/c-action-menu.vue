<template>
    <div class="c-action-menu">
        <div
            :class="{ 'action-menu__list--column': isColumn }"
            class="action-menu__list"
        >
            <div
                v-for="option in optionsList"
                :key="option.iconComponent.name"
                :class="{ 'action-menu__list-item--disabled': option.isDisabled }"
                class="action-menu__list-item"
                @click="handleActionClick(option)"
            >
                <component
                    :is="option.iconComponent"
                    class="action-menu__list-icon"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {
    TOptionsList,
    IOptionsListItem
} from '@/types/ActionMenu';

interface IProps {
    optionsList: TOptionsList
    isColumn?: boolean
}

withDefaults(defineProps<IProps>(), {
    isColumn: false
});

const emit = defineEmits<{
    (e: 'action', action: string): void;
}>();

function handleActionClick(option: IOptionsListItem) {
    if (option.isDisabled) return;

    emit('action', option.actionName);
}
</script>

<style lang="scss" src="./c-action-menu.scss" />
