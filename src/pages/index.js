import React, { Component } from "react";
import { getProducts, deleteProduct } from "../services";
import MaterialTable from "material-table";
import tableDefaults from "../utils/tableDefaults";
import Layout from "../components/layout";
import { Alert } from "@material-ui/lab";
import {
  Snackbar,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";
import { AddCircle, Edit, Delete } from "@material-ui/icons";

export default class Home extends Component {
  state = {
    id: "",
    products: [],
    error: "",
    success: "",
    confirmDelete: false,
  };

  async componentDidMount() {
    await this.getAllProducts();
  }

  async getAllProducts() {
    const res = await getProducts();
    res.message
      ? this.setState({ error: res.message })
      : this.setState({ products: res });
  }

  async delete() {
    const res = await deleteProduct(this.state.id);
    if (res.message) this.setState({ error: res.message });
    else {
      await this.getAllProducts();
      this.setState({ success: "Produto deletado com sucesso!" });
    }
  }

  table() {
    const { history } = this.props;
    const { products } = this.state;
    return (
      <MaterialTable
        {...tableDefaults()}
        title="Produtos"
        columns={[
          { title: "Nome", field: "name" },
          { title: "Quantidade", field: "amount" },
          {
            title: "Valor",
            field: "value",
            render: (vl) => `R$ ${vl.value},00`,
          },
        ]}
        data={products}
        actions={[
          {
            icon: Edit,
            tooltip: "Editar produto",
            onClick: async (evt, rowData) =>
              history.push(`/product/${rowData._id}`),
          },
          {
            icon: Delete,
            tooltip: "Deletar produto",
            onClick: async (evt, rowData) =>
              this.setState({ confirmDelete: true, id: rowData._id }),
          },
          {
            icon: AddCircle,
            tooltip: "Adicionar produto",
            isFreeAction: true,
            onClick: async () => history.push("/product"),
          },
        ]}
      />
    );
  }

  errorAlert() {
    const { error } = this.state;
    return <Alert severity="error">{error}</Alert>;
  }

  render() {
    const { error, success, confirmDelete } = this.state;
    return (
      <Layout>
        {error === "" ? this.table() : this.errorAlert()}
        <Dialog
          open={confirmDelete}
          onClose={() => this.setState({ confirmDelete: false })}
        >
          <DialogTitle>
            Certeza que deseja excluir esse produto permanentemente?
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.setState({ confirmDelete: false })}
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                this.setState({ confirmDelete: false });
                this.delete();
              }}
              color="primary"
              autoFocus
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
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
