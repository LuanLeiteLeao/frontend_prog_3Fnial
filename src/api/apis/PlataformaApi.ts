import { GenericAPI } from "./GenericApi";

export class PlataformaApi extends GenericAPI {
  protected getNomeAcao(): string {
    return "ManterPlataforma";
  }
}
