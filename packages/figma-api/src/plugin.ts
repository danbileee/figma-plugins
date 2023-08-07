import {
  PluginMessageType,
  PluginMessagePayload,
  SendImagePayload,
  isPluginPayload,
} from "plugin-types";

import { PluginCallbackFunc } from "./type";
import { isBitmap, isSvg, securelyPostMessage } from "./util";

figma.showUI(__html__, {
  themeColors: true,
  width: 400,
  height: 600,
});

async function processExportAsync(
  node: GroupNode,
  exportSettings: ExportSettings
) {
  const bytes = await node.exportAsync({
    ...exportSettings,
  });

  figma.ungroup(node);

  securelyPostMessage<SendImagePayload>({ type: "sendImage", bytes });
}

function sendImage(payload: PluginMessagePayload<SendImagePayload>) {
  const { format } = payload;

  const selection = figma.currentPage.selection;

  if (!selection.length) return;

  const combined = figma.group(selection, selection[0].parent);

  if (isBitmap(format)) {
    const exportSettings: ExportSettingsImage = {
      format,
      constraint: {
        type: "SCALE",
        value: 2,
      },
    };

    processExportAsync(combined, exportSettings);
  }

  if (isSvg(format)) {
    const exportSettings: ExportSettingsSVG = {
      format,
    };

    processExportAsync(combined, exportSettings);
  }
}

figma.ui.onmessage = (
  payload: PluginMessagePayload<Record<string, unknown>>
) => {
  const callbackMap: Record<PluginMessageType, PluginCallbackFunc> = {
    sendImage,
  };

  if (isPluginPayload(payload) && callbackMap[payload.type]) {
    callbackMap[payload.type](payload);
  }
};
