import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { GeneroApi } from "../../../api/apis/GeneroApi";
import { Menu } from "../../../components/menu/Menu";
import { IGenero } from "../../../interfaces/IGenero";

interface IStates extends IGenero {}
interface IProps {}

export class InserirGenero extends React.Component<IProps, IStates> {
  private generoApi = new GeneroApi();
  constructor(props: IProps) {
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
      criacao: this.state.criacao,
      modificacao: this.state.modificacao,
    });

    this.generoApi
      .post(json)
      .then((response) => {
        console.log("sucesso :" + response.data);
      })
      .catch((error) => {
        console.log("erro :" + error);
      });
  }

  render() {
    return (
      <>
        <Menu />
        <Container>
          <h1 style={{ textAlign: "center", marginTop: "30px" }}>
            Inserir Novo Genero
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
