import { PluginMessagePayload } from "plugin-types";

export type PluginCallbackFunc<T = Record<string, unknown>, U = void> = (
  payload: PluginMessagePayload<T>
) => U;
