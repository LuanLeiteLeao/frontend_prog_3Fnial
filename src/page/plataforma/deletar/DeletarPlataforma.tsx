import { PlataformaApi } from "../../../api/apis/PlataformaApi";
import { Deletar } from "../../../components/crud/Deletar";
import { IApi } from "../../../interfaces/IApi";
import { IPlataforma } from "../../../interfaces/IPlataforma";

export class DeletarPlataforma extends Deletar<IPlataforma> {
  protected getNomeEntidade(): string {
    return "Plataforma";
  }
  protected getApi(): IApi {
    return new PlataformaApi();
  }
  protected getColunasCampos(): { nome: string; data: any }[] {
    console.log(this.state.entidade);
    return [
      { nome: "ID", data: this.state.entidade?.pk },
      { nome: "Nome", data: this.state.entidade?.nome },
      { nome: "Criacao", data: this.state.entidade?.criacao },
      { nome: "Modificacao", data: this.state.entidade?.modificacao },
    ];
  }
}
