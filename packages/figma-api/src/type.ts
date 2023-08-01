import { PluginMessagePayload } from "~/types/pluginMessage";

export type PluginCallbackFunc<T = Record<string, unknown>, U = void> = (
  payload: PluginMessagePayload<T>
) => U;
