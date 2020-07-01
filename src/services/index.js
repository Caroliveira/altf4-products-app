import axios from "axios";
const base = "https://desafio-apirest-produtos.herokuapp.com";

export async function getProducts() {
  try {
    const res = await axios.get(`${base}/api/produtos`, {
      headers: { Accept: "application/json" },
    });
    return {
      status: res.status,
      data: res.data
    };
  } catch (error) {
    return {
      status: error.response.status,
      message: errorHandler(error.response.status)
    };
  }
}

export async function getProductById(id) {
  try {
    const res = await axios.get(`${base}/api/produto/${id}`, {
      headers: { Accept: "application/json" },
    });
    return {
      status: res.status,
      data: res.data
    };
  } catch (error) {
    return {
      status: error.response.status,
      message: errorHandler(error.response.status)
    };
  }
}

export async function editProduct(product) {
  try {
    const res = await axios.put(`${base}/api/produto`, product, {
      headers: { ContentType: "application/json", Accept: "text/plain" },
    });
    return {
      status: res.status,
      message: "Produto criado com sucesso!"
    }
  } catch (error) {
    return {
      status: error.response.status,
      message: errorHandler(error.response.status)
    };
  }
}

export async function createProduct(product) {
  try {
    const res = await axios.post(`${base}/api/produto`, product, {
      headers: { ContentType: "application/json", Accept: "text/plain" },
    });
    return {
      status: res.status,
      message: "Produto criado com sucesso!"
    }
  } catch (error) {
    return {
      status: error.response.status,
      message: errorHandler(error.response.status)
    };
  }
}

export async function deleteProduct(product) {
  try {
    const res = await axios.delete(`${base}/api/produto`, JSON.stringify(product), {
      headers: { ContentType: "application/json", Accept: "text/plain" },
    });
    return {
      status: res.status,
      message: "Produto excluído com sucesso!"
    }
  } catch (error) {
    return {
      status: error.response.status,
      message: errorHandler(error.response.status)
    };
  }
}

function errorHandler(err) {
  const errors = {
    401: "Não autorizado",
    403: "Proibido",
    404: "Não encontrado",
    406: "Há campos inválidos",
    500: "Erro no servidor, tente novamente mais tarde."
  }
  return errors[err] === undefined ? errors[500] : errors[err];
}