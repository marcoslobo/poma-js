import * as _Poma from "@marcoslobo/poma-core";
import * as plugin from "./plugin";

function bundle<T extends typeof _Poma>(
  pomaCore: T
): T & { domain: typeof plugin } {
  return { ...(pomaCore as any), domain: plugin };
}

export default bundle;
export * from "./plugin";
