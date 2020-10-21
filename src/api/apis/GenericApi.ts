import { ApiInstance } from "../ApiInstance";
import { IApi } from "../../interfaces/IApi";

export abstract class GenericAPI implements IApi {
  protected abstract getNomeAcao(): string;

  public getListarSemelhantes(nome: string) {
    let string =
      "api?acao=listarSemelhantes&casoDeUso=" +
      this.getNomeAcao() +
      "&nome=" +
      nome;
    console.log(string);
    return ApiInstance.get(string);
  }

  public get() {
    return ApiInstance.get("api?casoDeUso=" + this.getNomeAcao());
  }

  public getById(id: number) {
    return ApiInstance.get("api?casoDeUso=" + this.getNomeAcao() + "&id=" + id);
  }
  public post(json: any) {
    return ApiInstance.post("api?casoDeUso=" + this.getNomeAcao(), json);
  }
  public delete(id: number) {
    return ApiInstance.delete(
      "api?casoDeUso=" + this.getNomeAcao() + "&id=" + id
    );
  }
}
