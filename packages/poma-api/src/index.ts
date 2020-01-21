import * as _Poma from "@marcoslobo/poma-core";
import * as plugin from "./plugin";
import { default as apiSettings } from "./settings";

function assignSettings(
  baseSettings: typeof _Poma.settings,
  newSettings: { [k: string]: any }
): void {
  for (const key in newSettings) {
    if (!(key in baseSettings)) {
      Object.defineProperty(baseSettings, key, {
        get() {
          return newSettings[key];
        },
        set(val) {
          newSettings[key] = val;
        }
      });
    }
  }
}
function bundle<T extends typeof _Poma>(
  PomaCore: T
): T & { api: typeof plugin } {
  assignSettings(PomaCore.settings, apiSettings);
  return { ...(PomaCore as any), api: plugin };
}

export default bundle;
export * from "./plugin";
