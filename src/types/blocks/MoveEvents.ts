export enum E_MOVE_BLOCK_DIRECTION {
	LEFT = 'LEFT',
	RIGHT = 'RIGHT'
}

export interface IMoveBlockData {
	slotId: number
	blockId: number
	direction: keyof typeof E_MOVE_BLOCK_DIRECTION
}
