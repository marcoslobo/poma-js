import * as _Neon from "@marcoslobo/poma-core";
import * as nep9 from "./plugin";

function bundle<T extends typeof _Neon>(
  neonCore: T
): T & { nep9: typeof nep9 } {
  return { ...(neonCore as any), nep9 };
}

export default bundle;
export * from "./plugin";
