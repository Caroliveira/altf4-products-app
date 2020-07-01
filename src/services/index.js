import axios from "axios";
const base = "http://localhost:3001";

export async function getProducts() {
  try {
    const res = await axios.get(`${base}/products`, {
      headers: { Accept: "application/json" },
    });
    console.log(res.data)
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      message: errorHandler(error.response.status)
    };
  }
}

export async function getProductById(id) {
  try {
    const res = await axios.get(`${base}/products/${id}`, {
      headers: { Accept: "application/json" },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      message: errorHandler(error.response.status)
    };
  }
}

export async function editProduct(id, product) {
  try {
    const res = await axios.put(`${base}/products/${id}`, product, {
      headers: { Accept: "application/json" },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      message: errorHandler(error.response.status)
    };
  }
}

export async function createProduct(product) {
  try {
    const res = await axios.post(`${base}/products`, product, {
      headers: { Accept: "application/json" },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      message: errorHandler(error.response.status)
    };
  }
}

export async function deleteProduct(id) {
  try {
    const res = await axios.delete(`${base}/products/${id}`, {
      headers: { Accept: "application/json" },
    });
    return res.data;
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