import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { GeneroApi } from "../../../api/apis/GeneroApi";
import { PlataformaApi } from "../../../api/apis/PlataformaApi";
import { Menu } from "../../../components/menu/Menu";
import { IGenero } from "../../../interfaces/IGenero";

interface IStates extends IGenero {}
interface RouteInfo {
  id: string;
}
interface ComponentProps extends RouteComponentProps<RouteInfo> {}

export class EditarGenero extends React.Component<ComponentProps, IStates> {
  private generoApi = new GeneroApi();
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      nome: "",
      pk: 0,
      criacao: new Date(),
      modificacao: new Date(),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e: any) {
    const json = JSON.stringify({
      nome: this.state.nome,
      pk: this.state.pk,
      criacao: new Date(),
      modificacao: new Date(),
    });

    this.generoApi
      .post(json)
      .then((response) => {
        console.log("sucesso :" + response.data);
      })
      .catch((error) => {
        console.log("erro :" + error);
      }).finally(() => {
        window.location.assign( "/genero/listar");
      });
  }

  componentDidMount() {
    const idDaPagina = parseInt(this.props.match.params.id);
    this.generoApi.getById(idDaPagina).then((data)=>{
      const json = data.data
      console.log("---------------------------->")
      this.setState({  
        nome: json.nome,
        pk: json.pk,
        criacao: new Date(json.criacao),
        modificacao: new Date(json.modificacao),})
      console.log(data)
      console.log("<----------------------------")
    }).catch((err)=>{
      console.log(err)
    })

  }

  render() {
    return (
      <>
        <Menu />
        <Container>
          <h1 style={{ textAlign: "center", marginTop: "30px" }}>
            Editar Genero
          </h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="ensira um nome"
                onChange={(e) => {
                  this.setState({ nome: e.target.value });
                }}
                value={this.state.nome}
                required
              />
            </Form.Group>

            <Button onClick={this.handleSubmit} variant="primary">
              Salvar
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}
