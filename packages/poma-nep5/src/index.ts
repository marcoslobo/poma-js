import * as _Poma from "@marcoslobo/poma-core";
import * as nep5 from "./plugin";

function bundle<T extends typeof _Poma>(
  pomaCore: T
): T & { nep5: typeof nep5 } {
  return { ...(pomaCore as any), nep5 };
}

export default bundle;
export * from "./plugin";
