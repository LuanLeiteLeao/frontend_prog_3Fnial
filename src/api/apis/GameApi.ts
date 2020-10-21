import { GenericAPI } from "./GenericApi";

export class GameApi extends GenericAPI {
  protected getNomeAcao(): string {
    return "ManterGame";
  }
}
