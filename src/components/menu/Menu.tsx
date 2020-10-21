import React from "react";
import { Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../img/logo.jpeg";
import { ICrudAcoes } from "../../interfaces/ICrudAcoes";
import { crudAcoesPage } from "./ListCrud";

export class Menu extends React.Component {
  private montarNav() {
    return crudAcoesPage.getListCrudAcoes().map((data) => {
      return this.dropdonw(data);
    });
  }

  private dropdonw(data: ICrudAcoes): JSX.Element {
    return (
      <NavDropdown
        key={data.nome}
        title={data.nome}
        id="collasible-nav-dropdown"
      >
        {data.acoes.map((data) => {
          return (
            <NavDropdown.Item
              key={data.nome}
              as={Link}
              to={data.url}
              id="dropDown-item-color"
            >
              {data.nome}
            </NavDropdown.Item>
          );
        })}
      </NavDropdown>
    );
  }

  render(): JSX.Element {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/">
            <Image
              src={logo}
              width="100"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              fluid
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">{this.montarNav()}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
