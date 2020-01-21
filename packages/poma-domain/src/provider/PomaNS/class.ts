import { logging } from "@marcoslobo/poma-core";
import { DomainProvider } from "../common";
import { resolveDomain } from "./core";

const log = logging.default("poma-domain");

export class PomaNS implements DomainProvider {
  private contract: string;

  public get name() {
    return `PomaNs[${this.contract}]`;
  }

  public constructor(contract: string) {
    this.contract = contract;
    log.info(`Created PomaNS Provider: ${this.contract}`);
  }

  public resolveDomain(url: string, domain: string): Promise<string> {
    return resolveDomain(url, this.contract, domain);
  }
}

export default PomaNS;
