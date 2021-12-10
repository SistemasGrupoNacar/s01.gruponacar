import axios from "axios";
import URL from "@/scripts/api.config.js";
import { getToken } from "@/scripts/token.actions.js";

//funcion para configurar el token como header
function configApi() {
  let token = getToken();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return config;
}

// funcion para el inicio de sesion
async function onLogin(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(URL + "/login", data)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//funcion para obtener los productos de produccion de la api
async function getInventoryProducts() {
  return new Promise((resolve, reject) => {
    axios
      .get(URL + "/inventoryProducts", configApi())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

// funcion para obtener los productos de la api
async function getProducts() {
  return new Promise((resolve, reject) => {
    axios
      .get(URL + "/products", configApi())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

// funcion para obtener productos de inventario por id
async function getInventoryProductById(id) {
  return new Promise((resolve, reject) => {
    axios

      .get(URL + "/inventoryProducts/" + id, configApi())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

// funcion para editar productos de inventario
async function editInventoryProduct(id, data) {
  return new Promise((resolve, reject) => {
    axios
      .put(URL + "/inventoryProducts/" + id, data, configApi())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

// funcion para eliminar productos de inventario
async function deleteInventoryProduct(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(URL + "/inventoryProducts/" + id, configApi())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

// funcion para obtener los productos con stock minimo de la api
async function getProductsWithMinStock() {
  return new Promise((resolve, reject) => {
    axios
      .get(URL + "/inventoryProducts/list/minStock", configApi())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

// funcion para crear productos de produccion en la api
async function createInventoryProduct(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(URL + "/inventoryProducts", data, configApi())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

// funcion para agregar un inventoryEntry a un producto de inventario
async function createInventoryEntry(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(URL + "/inventoryEntries", data, configApi())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

// funcion para obtener todos los inventoryEntry de un producto de inventario
async function getInventoryEntries() {
  return new Promise((resolve, reject) => {
    axios
      .get(URL + "/inventoryEntries", configApi())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

// funcion para eliminar un inventoryEntry por id
async function deleteInventoryEntry(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(URL + "/inventoryEntries/" + id, configApi())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

export default {
  onLogin,
  getInventoryProducts,
  getProducts,
  getInventoryProductById,
  editInventoryProduct,
  deleteInventoryProduct,
  getProductsWithMinStock,
  createInventoryProduct,
  createInventoryEntry,
  getInventoryEntries,
  deleteInventoryEntry,
};
