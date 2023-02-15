import {
	onMounted,
	onUnmounted
} from 'vue';

function useEventListener() {
	function windowEventListener<E extends keyof WindowEventMap>(
		event: E,
		callback: (this: Window, ev: WindowEventMap[E]) => any
	) {
		onMounted(() => window.addEventListener(event, callback));
		onUnmounted(() => window.removeEventListener(event, callback));
	}

	function documentEventListener<E extends keyof DocumentEventMap>(
		event: E,
		callback: (this: Document, ev: DocumentEventMap[E]) => any
	) {
		onMounted(() => document.addEventListener(event, callback));
		onUnmounted(() => document.removeEventListener(event, callback));
	}

	return {
		windowEventListener,
		documentEventListener
	};
}

export {
	useEventListener
}
