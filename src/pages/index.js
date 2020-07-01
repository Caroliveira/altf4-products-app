import React, { Component } from "react";
import { getProducts, deleteProduct } from "../services";
import MaterialTable from "material-table";
import tableDefaults from "../utils/tableDefaults";
import Layout from "../components/layout";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { AddCircle, Edit, Delete } from "@material-ui/icons";

export default class Home extends Component {
  state = {
    products: [],
    error: "",
    success: "",
  };

  async componentDidMount() {
    const res = await getProducts();
    res.message
      ? this.setState({ error: res.message })
      : this.setState({ products: res });
  }

  table() {
    const { history } = this.props;
    const { products } = this.state;
    return (
      <MaterialTable
        {...tableDefaults()}
        title="Produtos"
        columns={[
          { title: "Nome", field: "nome" },
          { title: "Quantidade", field: "quantidade" },
          {
            title: "Valor",
            field: "valor",
            render: (vl) => `R$ ${vl.valor},00`,
          },
        ]}
        data={products.data}
        actions={[
          {
            icon: Edit,
            tooltip: "Editar produto",
            onClick: async (evt, rowData) =>
              history.push(`/product/${rowData.id}`),
          },
          {
            icon: Delete,
            tooltip: "Deletar produto",
            onClick: async (evt, rowData) => {
              const { tableData, ...product } = rowData;
              const res = await deleteProduct(product);
              res.status === 200 || res.status === 204
                ? this.setState({ success: res.message })
                : this.setState({ error: res.message });
            },
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
    const { error, success } = this.state;
    return (
      <Layout>
        {error === "" ? this.table() : this.errorAlert()}
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
