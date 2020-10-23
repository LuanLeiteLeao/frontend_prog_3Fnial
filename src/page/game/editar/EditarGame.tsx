import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { ApiInstance } from "../../../api/ApiInstance";
import { GameApi } from "../../../api/apis/GameApi";
import { GeneroApi } from "../../../api/apis/GeneroApi";
import { PlataformaApi } from "../../../api/apis/PlataformaApi";
import { Menu } from "../../../components/menu/Menu";
import { IGame } from "../../../interfaces/IGame";
import { IGenero } from "../../../interfaces/IGenero";
import { IPlataforma } from "../../../interfaces/IPlataforma";

interface RouteInfo {
  id: string;
}
interface ComponentProps extends RouteComponentProps<RouteInfo> {}
interface IState extends IGame {
  generoOpcoes: Array<IGenero>;
  plataformasOpcoes: Array<IPlataforma>;
}

export class EditarGame extends React.Component<ComponentProps, IState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      plataformasOpcoes: [],
      generoOpcoes: [],
      pk: 0,
      nome: "",
      descricao: "",
      dataLancamento: new Date(),
      isJogoDoAno: false,
      generos: [],
      plataformas: [],
      criacao: new Date(),
      modificacao: new Date(),
    };
    // muito importante para usar o this dentro da função de submit
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    
  }

  private jsonofState() {
    console.log(this.state);
  }

  handleSubmit(event: any) {
    event.preventDefault();
    // get our form data out of state
    const json:IGame ={
      pk: this.state.pk,
      nome: this.state.nome,
      descricao: this.state.descricao,
      dataLancamento: new Date(this.state.dataLancamento),
      isJogoDoAno: this.state.isJogoDoAno,
      generos: this.state.generos,
      plataformas: this.state.plataformas,
      criacao:new Date(),
      modificacao:new Date(),
    };
  
   
    ApiInstance.post("api?casoDeUso=ManterGame", json)
      .then((response) => {
        console.log("sucesso :" + response.data);
      
      })
      .catch((error) => {
        console.log("erro :" + error);
      
      }) .finally(() => {
        window.location.assign( "/game/listar");
      });
  }

  componentDidMount() {
    const idDaPagina = parseInt(this.props.match.params.id);
    new GameApi().getById(idDaPagina).then((data)=>{
      const json = data.data
      console.log("---------------------------->")
      this.setState({  
        pk: json.pk,
        nome: json.nome,
        descricao: json.descricao,
        dataLancamento: json.dataLancamento,
        isJogoDoAno: json.isJogoDoAno,
        generos: json.generos,
        plataformas: json.plataformas,})
      console.log(data)
      console.log("<----------------------------")
    }).catch()

    new GeneroApi().get().then((res) => {
      this.setState({ generoOpcoes: res.data });
    });

    new PlataformaApi().get().then((res) => {
      this.setState({ plataformasOpcoes: res.data });
    });
  }

  private resetarHoras(data: any) {
    data.criacao = new Date();
    data.modificacao = new Date();
    return data;
  }

  render() {
     
    return (
      <>
        <Menu />
        <Container>
          <h1 style={{ textAlign: "center", marginTop: "30px" }}>
            Inserir Novo Gênero
          </h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nome Game</Form.Label>
              
              <Form.Control
                value={this.state.nome}
                type="text"
                placeholder="ensira um nome"
                name="nome"
                onChange={(e) => this.setState({ nome: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
              value={this.state.descricao}
                name="descricao"
                onChange={(e) => this.setState({ descricao: e.target.value })}
                as="textarea"
                rows={3}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data de Lançamento</Form.Label>
              <Form.Control
                type="date"
                style={{ width: "100%" }}
                name="dataLancamento"
                onChange={(e) =>
                  this.setState({ dataLancamento: new Date(e.target.value) })
                }
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
              checked={this.state.isJogoDoAno}
                name="isJogoDoAno"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let validacao = e.target.checked ? true : false;
                  this.setState({ isJogoDoAno: validacao });
                }}
                
                label="Jogo do Ano"
                
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Gêneros</Form.Label>

              {this.state.generoOpcoes.map((data) =>{
                let listaAux: Array<IGenero> = this.state.generos;
                const posicao =listaAux.indexOf(data);
                const isChsck = posicao===-1 ?false:true
console.log("------------->"+posicao)
console.log("------------->"+isChsck)
console.log(this.state.generos.indexOf(data as IGenero))
console.log(data)


                return (
                  <div key={data.pk} className="mb-3">
                    <Form.Check
                      custom
                      
                      checked={isChsck}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let validacao = e.target.checked ? true : false;
                        let listaNova: Array<IGenero> = this.state.generos;
                        let posicaoArray = listaNova.indexOf(data);
                        if (validacao) {
                          // inseri
                          if (posicaoArray === -1) {
                            //  caso n exista
                            // está vindo com um formata estranho do backEnd
                            // por tatno reseto aqui para não da pal na no backend
                            data = this.resetarHoras(data);
                            listaNova.push(data);
                          }
                        } else {
                          listaNova.splice(posicaoArray, 1);
                        }
  
                        this.setState({ generos: listaNova });
                      }}
                      id={`${data.nome}`}
                      type={"checkbox"}
                      label={data.nome}
                    />
                  </div>
                )
              } )}
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Plataformas</Form.Label>

              {this.state.plataformasOpcoes.map((data) => (
                <div key={data.pk} className="mb-3">
                  <Form.Check
                    custom
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let validacao = e.target.checked ? true : false;
                      let listaNova: Array<IPlataforma> = this.state
                        .plataformas;
                      let posicaoArray = listaNova.indexOf(data);
                      if (validacao) {
                        // inseri
                        if (posicaoArray === -1) {
                          //  caso n exista
                          data = this.resetarHoras(data);
                          listaNova.push(data);
                        }
                      } else {
                        listaNova.splice(posicaoArray, 1);
                      }

                      this.setState({ plataformas: listaNova });
                    }}
                    id={`${data.nome}`}
                    type={"checkbox"}
                    label={data.nome}
                  />
                </div>
              ))}
            </Form.Group>

            <Button type="submit" variant="primary">
              Salvar
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}
