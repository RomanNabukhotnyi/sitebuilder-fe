import type { Component } from 'vue';

export interface IOptionsListItem {
	iconComponent: Component;
	isDisabled?: boolean;
	actionName: string;
}

export type TOptionsList = Array<IOptionsListItem>
