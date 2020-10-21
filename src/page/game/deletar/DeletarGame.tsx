import { GameApi } from "../../../api/apis/GameApi";
import { Deletar } from "../../../components/crud/Deletar";
import { IApi } from "../../../interfaces/IApi";
import { IGame } from "../../../interfaces/IGame";

export class DeletarGame extends Deletar<IGame> {
  protected getNomeEntidade(): string {
    return "Game";
  }
  protected getApi(): IApi {
    return new GameApi();
  }
  protected getColunasCampos(): { nome: string; data: any }[] {
    const jogoDoAno = this.state.entidade?.isJogoDoAno
      ? "Eleito jogo do ano"
      : "Não Eleito jogo do ano";

    return [
      {
        nome: "ID",
        data: this.state.entidade?.pk,
      },
      {
        nome: "nome",
        data: this.state.entidade?.nome,
      },
      {
        nome: "Data de Lançamento",
        data: this.state.entidade?.dataLancamento,
      },
      {
        nome: "Descrição",
        data: this.state.entidade?.descricao,
      },
      {
        nome: "Jogo do ano",
        data: jogoDoAno,
      },
      {
        nome: "Criação",
        data: this.state.entidade?.criacao,
      },
      {
        nome: "Modificação",
        data: this.state.entidade?.modificacao,
      },
    ];
  }
}
