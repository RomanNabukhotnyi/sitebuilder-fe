enum E_SWAP_DIRECTION {
	LEFT = 'LEFT',
	RIGHT = 'RIGHT'
}

function findIndexByKey<T>(array: Array<any>, key: string, value: T) {
	return array.findIndex((item) => item[key] === value);
}

function swap(array: Array<any>, index: number, direction: keyof typeof E_SWAP_DIRECTION) {
	if (direction === E_SWAP_DIRECTION.LEFT) {
		[array[index], array[index - 1]] = [array[index - 1], array[index]];
	} else if (direction === E_SWAP_DIRECTION.RIGHT) {
		[array[index], array[index + 1]] = [array[index + 1], array[index]];
	}
}

export {
	E_SWAP_DIRECTION,
	swap,
	findIndexByKey
}
