import { onMounted, onUnmounted } from 'vue';

export function useEventListener<E extends keyof WindowEventMap>(
  target: Window,
  event: E,
  callback: (this: Window, ev: WindowEventMap[E]) => any
): void;

export function useEventListener<E extends keyof DocumentEventMap>(
  target: Document,
  event: E,
  callback: (this: Document, ev: DocumentEventMap[E]) => any
): void;

export function useEventListener(
  target: any,
  event: any,
  callback: (this: any, ev: any) => any
) {
  onMounted(() => target.addEventListener(event, callback));
  onUnmounted(() => target.removeEventListener(event, callback));
}
