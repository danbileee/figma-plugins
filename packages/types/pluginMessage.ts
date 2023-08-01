export const PluginMessageTypes = {
  sendImage: "sendImage",
} as const;

export type PluginMessageType = keyof typeof PluginMessageTypes;

export type BitmapFormat = "JPG" | "PNG";

export type SVGFormat = "SVG";

export type ImageFormat = BitmapFormat | SVGFormat;

export interface SendImagePayload {
  format?: ImageFormat;
  bytes?: Uint8Array;
}

export type PluginMessagePayload<T> = {
  type: PluginMessageType;
} & T;

export interface PluginMessage<T> {
  pluginMessage: PluginMessagePayload<T>;
}

export function isPluginPayload<T>(
  payload: unknown
): payload is PluginMessagePayload<T> {
  if (payload) {
    return typeof payload === "object" && "type" in payload;
  }
  return false;
}
