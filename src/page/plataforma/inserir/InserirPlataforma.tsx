import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { PlataformaApi } from "../../../api/apis/PlataformaApi";
import { Menu } from "../../../components/menu/Menu";
import { IPlataforma } from "../../../interfaces/IPlataforma";

interface IStates extends IPlataforma {}
interface IProps {}

export class InserirPlataforma extends React.Component<IProps, IStates> {
  private plataformaApi = new PlataformaApi();
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

    this.plataformaApi
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
            Inserir Nova Plataforma
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
