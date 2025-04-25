import pool from "./db.js";

// Agregar un nuevo producto
export const agregarProducto = async ({
  nombre_producto,
  descripcion,
  precio,
  stock,
}) => {
  try {
    await pool.query(
      "INSERT INTO productos (nombre_producto, descripcion, precio, stock) VALUES (?, ?, ?, ?)",
      [nombre_producto, descripcion, precio, stock]
    );
  } catch (error) {
    throw { status: 500, message: "Error al crear el producto" };
  }
};

// Obtener todos los productos
export const listarProductos = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    return rows;
  } catch (error) {
    throw { status: 500, message: "Error al obtener productos" };
  }
};

// Obtener detalles de un producto por ID
export const obtenerDetallesProducto = async (id) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [id]
    );

    if (rows.length === 1) {
      const producto =rows[0];
      return producto;
    } else {
      throw { status: 404, message: "Producto no encontrado" };
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Error al obtener detalles del producto" };
  }
};

// Obtener formulario para actualizar producto seleccionado
export const obtenerDetallesProductoUpdate = async (id) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [id]
    );

    if (rows.length === 1) {
      return rows[0];
    } else {
      throw { status: 404, message: "Producto no encontrado" };
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Error al obtener detalles del producto" };
  }
};

// Actualizar un producto por ID
export const actualizarProducto = async (
  id,
  { nombre_producto, descripcion, precio, stock }
) => {
  try {
    await pool.query(
      "UPDATE productos SET nombre_producto = ?, descripcion = ?, precio = ?, stock = ? WHERE id_producto = ?",
      [nombre_producto, descripcion, precio, stock, id]
    );
  } catch (error) {
    throw {
      status: 500,
      message: `Error al actualizar el producto con ID ${id}`,
    };
  }
};

// Eliminar un producto por ID
export const eliminarProducto = async (id) => {
  try {
    await pool.query("DELETE FROM productos WHERE id_producto = ?", [id]);
  } catch (error) {
    throw {
      status: 500,
      message: `Error al eliminar el producto con ID ${id}`,
    };
  }
};