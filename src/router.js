import express from "express";

import {
  agregarProducto,
  listarProductos,
  eliminarProducto,
  actualizarProducto,
  obtenerDetallesProducto,
  obtenerDetallesProductoUpdate,
} from "./productoController.js";

const router = express.Router();

// Página principal con listado de productos
router.get("/Crud-Completo-con-NodeJS-Express-y-MySQL", async (req, res) => {
  try {
    const productos = await listarProductos();
    res.render("pages/productos", { productos });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Registrar un nuevo producto
router.post("/productos", async (req, res) => {
  const { nombre_producto, descripcion, precio, stock } = req.body;

  try {
    await agregarProducto({ nombre_producto, descripcion, precio, stock });
    res.redirect("/");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Detalles del producto
router.get("/detalles-producto/:id", async (req, res) => {
  const productoId = req.params.id;

  try {
    const producto = await obtenerDetallesProducto(productoId);
    res.render("pages/detalles_producto", { producto });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Mostrar formulario para actualizar un producto
router.get("/formulario-actualizar-producto/:id", async (req, res) => {
  const productoId = req.params.id;

  try {
    const producto = await obtenerDetallesProductoUpdate(productoId);
    res.render("pages/update_productos", { producto });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para actualizar un producto por ID
router.post("/actualizar-producto/:id", async (req, res) => {
  const { nombre_producto, descripcion, precio, stock } = req.body;
  const id = req.params.id;

  try {
    await actualizarProducto(id, {
      nombre_producto,
      descripcion,
      precio,
      stock,
    });
    res.redirect("/Crud-Completo-con-NodeJS-Express-y-MySQL");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para borrar un producto por ID
router.post("/borrar-producto/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await eliminarProducto(id);
    res.redirect("/Crud-Completo-con-NodeJS-Express-y-MySQL");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

export default router;