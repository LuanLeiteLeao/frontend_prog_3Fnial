import { GeneroApi } from "../../../api/apis/GeneroApi";
import { Deletar } from "../../../components/crud/Deletar";
import { IApi } from "../../../interfaces/IApi";
import { IGenero } from "../../../interfaces/IGenero";

export class DeletarGenero extends Deletar<IGenero> {
  protected getNomeEntidade(): string {
    return "Genero";
  }
  protected getApi(): IApi {
    return new GeneroApi();
  }
  protected getColunasCampos(): { nome: string; data: any }[] {
    return [
      { nome: "ID", data: this.state.entidade?.pk },
      { nome: "Nome", data: this.state.entidade?.nome },
      { nome: "Criacao", data: this.state.entidade?.criacao },
      { nome: "Modificacao", data: this.state.entidade?.modificacao },
    ];
  }
}

// import React from "react";
// import { Container } from "react-bootstrap";
// import Table from "react-bootstrap/esm/Table";
// import { RouteComponentProps } from "react-router-dom";
// import { GeneroApi } from "../../../api/apis/GeneroApi";
// import { Menu } from "../../../components/menu/Menu";
// import { IGenero } from "../../../interfaces/IGenero";

// interface IProps {}
// interface IStates {
//   genero?: IGenero;
// }
// interface RouteInfo {
//   id: string;
// }

// interface ComponentProps extends RouteComponentProps<RouteInfo> {}

// export class DeletarGenero extends React.Component<ComponentProps, IStates> {
//   constructor(props: ComponentProps) {
//     super(props);
//     this.state = {
//       genero: undefined,
//     };
//   }

//   componentDidMount() {
//     const idDaPagina = parseInt(this.props.match.params.id);
//     new GeneroApi()
//       .getById(idDaPagina)
//       .then((res) => {
//         this.setState({ genero: res.data });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   render(): JSX.Element {
//     return (
//       <>
//         <Menu />
//         <Container>
//           <h1 style={{ textAlign: "center", marginTop: "30px" }}>
//             Deletar Genero
//           </h1>
//           <Table striped bordered hover size="sm" variant="light">
//             <tbody>
//               <tr>
//                 <td>ID</td>
//                 <td>{this.state.genero?.pk}</td>
//               </tr>
//               <tr>
//                 <td>Nome</td>
//                 <td>{this.state.genero?.nome}</td>
//               </tr>
//               <tr>
//                 <td>Criação</td>
//                 <td>{this.state.genero?.criacao}</td>
//               </tr>
//               <tr>
//                 <td>Modificação</td>
//                 <td>{this.state.genero?.modificacao}</td>
//               </tr>
//             </tbody>
//           </Table>
//         </Container>
//       </>
//     );
//   }
// }
