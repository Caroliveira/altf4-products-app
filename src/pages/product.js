import React, { Component } from "react";
import Layout from "../components/layout";
import { getProductById, editProduct, createProduct } from "../services";
import Snackbar from "../components/snackbar";
import { Alert } from "@material-ui/lab";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
} from "@material-ui/core";

export default class Product extends Component {
  state = {
    name: "",
    amount: "",
    value: "",
    nameNotFilled: false,
    amountNotFilled: false,
    valueNotFilled: false,
    message: "",
    error: "",
    success: "",
  };

  async componentDidMount() {
    if (this.props.match.params.id) {
      const res = await getProductById(this.props.match.params.id);
      if (res.message) {
        this.setState({
          message: res.message,
        });
      } else {
        this.setState({
          name: res.name,
          amount: res.amount,
          value: res.value,
        });
      }
    }
  }

  changeState(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
      [`${evt.target.name}NotFilled`]: false,
    });
  }

  validateFields() {
    const notFilled = {};
    if (this.state.name === "") notFilled.nameNotFilled = true;
    if (this.state.amount === "") notFilled.amountNotFilled = true;
    if (this.state.value === "") notFilled.valueNotFilled = true;
    Object.keys(notFilled).length === 0
      ? this.save()
      : this.setState({ ...notFilled });
  }

  async save() {
    const { id } = this.props.match.params;
    const product = {
      name: this.state.name,
      amount: this.state.amount,
      value: this.state.value,
    };
    const res = id
      ? await editProduct(id, product)
      : await createProduct(product);
    res.message
      ? this.setState({ error: res.message })
      : this.setState({
          success: `Produto ${id ? "editado" : "criado"} com sucesso!`,
        });
  }

  form() {
    const { id } = this.props.match.params;
    const { name, amount, value, nameNotFilled, amountNotFilled, valueNotFilled } = this.state;
    return (
      <Card>
        <CardHeader title={`Alt+F4 - ${id ? "Editar" : "Criar"} produto`} />
        <CardContent>
          <TextField
            name="name"
            fullWidth
            label="Nome"
            required
            error={nameNotFilled}
            helperText={nameNotFilled? "Campo obrigatório" : null}
            value={name}
            onChange={(evt) => this.changeState(evt)}
          />
          <TextField
            name="amount"
            fullWidth
            label="Quantidade"
            required
            error={amountNotFilled}
            helperText={amountNotFilled? "Campo obrigatório" : null}
            value={amount}
            onChange={(evt) => this.changeState(evt)}
          />
          <TextField
            name="value"
            fullWidth
            label="Valor"
            required
            error={valueNotFilled}
            helperText={valueNotFilled? "Campo obrigatório" : null}
            value={value}
            onChange={(evt) => this.changeState(evt)}
          />
        </CardContent>
        <CardActions>
          <Button color="secondary" onClick={() => this.props.history.goBack()}>
            Voltar
          </Button>
          <Button color="primary" onClick={() => this.validateFields()}>
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
          type="error"
          message={error}
          onClose={() => this.setState({ error: "" })}
        />
        <Snackbar
          type="success"
          message={success}
          onClose={() => this.setState({ success: "" })}
        />
      </Layout>
    );
  }
}
