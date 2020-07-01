import React, { Component } from "react";
import Layout from "../components/layout";
import { getProductById, editProduct, createProduct } from "../services";
import { Alert } from "@material-ui/lab";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";

export default class Product extends Component {
  state = {
    name: "",
    amount: "",
    value: "",
    message: "",
    error: "",
    success: "",
  };

  async componentDidMount() {
    const product = await getProductById(this.props.match.params.id);
    if (product.status === 200) {
      const { data } = product;
      this.setState({
        name: data.nome,
        amount: data.quantidade,
        value: data.valor,
      });
    } else {
      this.setState({
        message: product.message,
      });
    }
  }

  changeState(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async save() {
    const { id } = this.props.match.params
    let res = "";
    const product = {
      nome: this.state.name,
      quantidade: this.state.amount,
      valor: this.state.value,
    };
    if (id) {
      product.id = id;
      res = await editProduct(product);
    } else {
      res = await createProduct(product);
    }
    res.status === 200 || res.status === 201
      ? this.setState({ success: res.message })
      : this.setState({ error: res.message });
  }
  form() {
    const { id } = this.props.match.params
    return (
      <Card>
        <CardHeader
          title={`Alt+F4 - ${id ? "Editar" : "Criar"} produto`}
        />
        <CardContent>
          <TextField
            name="name"
            fullWidth
            label="Nome"
            value={this.state.name}
            onChange={(evt) => this.changeState(evt)}
          />
          <TextField
            name="amount"
            fullWidth
            label="Quantidade"
            value={this.state.amount}
            onChange={(evt) => this.changeState(evt)}
          />
          <TextField
            name="value"
            fullWidth
            label="Valor"
            value={this.state.value}
            onChange={(evt) => this.changeState(evt)}
          />
        </CardContent>
        <CardActions>
          <Button color="secondary" onClick={() => this.props.history.goBack()}>Voltar</Button>
          <Button color="primary" onClick={() => this.save()}>
            Salvar
          </Button>
        </CardActions>
      </Card>
    );
  }

  errorAlert() {
    return <Alert severity="error">{this.state.message}</Alert>;
  }
  render() {
    const { message, error, success } = this.state;
    return (
      <Layout>
        {message === "" ? this.form() : this.errorAlert()}
        <Snackbar
          open={error !== ""}
          autoHideDuration={6000}
          onClose={() => this.setState({ error: "" })}
        >
          <Alert onClose={() => this.setState({ error: "" })} severity="error">
            {error}
          </Alert>
        </Snackbar>
        <Snackbar
          open={success !== ""}
          autoHideDuration={6000}
          onClose={() => this.setState({ success: "" })}
        >
          <Alert
            onClose={() => this.setState({ success: "" })}
            severity="success"
          >
            {success}
          </Alert>
        </Snackbar>
      </Layout>
    );
  }
}
