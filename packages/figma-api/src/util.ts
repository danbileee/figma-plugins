import { BitmapFormat, PluginMessagePayload, SVGFormat } from "plugin-types";

export function isBitmap(format?: string): format is BitmapFormat {
  return ["JPG", "PNG"].includes(format);
}

export function isSvg(format?: string): format is SVGFormat {
  return format === "SVG";
}

/**
 * 피그마 플러그인 UI와 통신하는 post message 확장 모듈
 * @param payload 필요한 payload 타입을 선언한 후 해당 구조에 맞춰 전송
 * @example
 * ```ts
 * securelyPostMessage({ type: "create-rectangles", count: 1 });
 *```
 */
export function securelyPostMessage<T>(payload: PluginMessagePayload<T>) {
  figma.ui.postMessage(
    { ...payload },
    {
      origin: process.env.UI_DOMAIN,
    }
  );
}
