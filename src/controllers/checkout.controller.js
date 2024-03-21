import { getConnection } from "../database/database";

const getCheckout = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM checkout");
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createCheckout = async (req, res) => {
  try {
    const {
      id_usuario,
      total,
      cedula,
      telefono,
      departamento,
      ciudad,
      direccion,
      metodo_pago,
    } = req.body;
    const connection = await getConnection();

    // Verificar si ya existe un checkout para el mismo usuario
    const existingCheckout = await connection.query(
      "SELECT * FROM checkout WHERE id_usuario = ?",
      [id_usuario]
    );

    if (existingCheckout.length > 0) {
      return res
        .status(400)
        .json({ message: "Ya existe un checkout para este usuario" });
    }
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Crear el checkout si no existe uno para el usuario
    // await connection.query(
    //   'INSERT INTO checkout (id_usuario, fecha_del_checkout, total, cedula, telefono, departamento, ciudad, direccion, metodo_pago) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    //   [
    //     id_usuario,
    // fecha_del_checkout: currentDate,
    //     total,
    //     cedula,
    //     telefono,
    //     departamento,
    //     ciudad,
    //     direccion,
    //     metodo_pago,
    //   ]
    // );
    const checkout = {
      id_usuario,
      fecha_del_checkout: currentDate,
      total,
      cedula,
      telefono,
      departamento,
      ciudad,
      direccion,
      metodo_pago,
    };
    await connection.query("INSERT INTO checkout SET ?", checkout);
    res.status(201).json({ message: "Checkout creado exitosamente" });
  } catch (error) {
    console.error("Error al crear el checkout:", error);
    res.status(500).json({ message: "Error al crear el checkout" });
  }
};

export const methods = {
  createCheckout,
  getCheckout,
};
