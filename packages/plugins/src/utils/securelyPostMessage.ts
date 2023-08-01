import { PluginMessagePayload } from "~/types/pluginMessage";

const PLUGIN_ID = "";

/**
 * 피그마 플러그인과 통신하는 post message 확장 모듈
 * @param payload 필요한 payload 타입을 선언한 후 해당 구조에 맞춰 전송
 * @example
 * ```ts
 * securelyPostMessage<{ count: number }>({ type: "create-rectangles", count: 1 });
 *```
 */
export function securelyPostMessage<T>(payload: PluginMessagePayload<T>) {
  // eslint-disable-next-line no-restricted-globals
  parent.postMessage(
    {
      pluginMessage: { ...payload },
      pluginId: PLUGIN_ID,
    },
    "https://www.figma.com"
  );
}
