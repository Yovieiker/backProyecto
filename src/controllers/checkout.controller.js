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
      edad,
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
      edad,
    };
    await connection.query("INSERT INTO checkout SET ?", checkout);
    res.status(201).json({ message: "Checkout creado exitosamente" });
  } catch (error) {
    console.error("Error al crear el checkout:", error);
    res.status(500).json({ message: "Error al crear el checkout" });
  }
};

const getCheckoutById = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM checkout WHERE id_usuario = ?",
      [id_usuario]
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//cantidad ventas

const cantidadVentas = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT COUNT(*) as total FROM checkout"
    );
    const cantidad = result[0].total;

    //total de ventas
    const total = await connection.query(
      "SELECT SUM(total) as total FROM checkout"
    );
    const totalVentas = total[0].total;

    //total de usuarios registrado

    const usuarios = await connection.query(
      "SELECT COUNT(*) as total FROM usuarios"
    );
    const totalUsuarios = usuarios[0].total;
    const total18_25 = await connection.query(
      "SELECT COUNT(*) as total FROM checkout WHERE edad >= 18 AND edad <= 25"
    );
    const total25_30 = await connection.query(
      "SELECT COUNT(*) as total FROM checkout WHERE edad > 25 AND edad <= 30"
    );
    const total35_40 = await connection.query(
      "SELECT COUNT(*) as total FROM checkout WHERE edad > 30 AND edad <= 40"
    );
    const total40_plus = await connection.query(
      "SELECT COUNT(*) as total FROM checkout WHERE edad > 40"
    );

    // Calcular los porcentajes de cada grupo de edad

    const porcentaje18_25 = total18_25[0].total;
    const porcentaje25_30 = total25_30[0].total;
    const porcentaje35_40 = total35_40[0].total;
    const porcentaje40_plus = total40_plus[0].total;

    // Devolver la cantidad de ventas
    res.json({
      cantidad,
      totalVentas,
      totalUsuarios,
      porcentaje18_25,
      porcentaje25_30,
      porcentaje35_40,
      porcentaje40_plus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTotalCheckout = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT u.*, c.* FROM usuarios u LEFT JOIN checkout c ON u.id = c.id_usuario WHERE c.id_usuario IS NOT NULL"
    );

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//obtener la ciudad mas registrada

const datosPromedio = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT departamento, COUNT(*) as total FROM checkout GROUP BY departamento ORDER BY total DESC LIMIT 1"
    );
    const departamento = result[0].departamento;
    const total = result[0].total;

    res.json({ departamento, total });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const obtenerPorcentajeEdad = async (req, res) => {
  try {
    const connection = await getConnection();

    // Obtener el total de personas en cada grupo de edad
    const total18_25 = await connection.query(
      "SELECT COUNT(*) as total FROM checkout WHERE edad >= 18 AND edad <= 25"
    );
    const total25_30 = await connection.query(
      "SELECT COUNT(*) as total FROM checkout WHERE edad > 25 AND edad <= 30"
    );
    const total35_40 = await connection.query(
      "SELECT COUNT(*) as total FROM checkout WHERE edad > 30 AND edad <= 40"
    );
    const total40_plus = await connection.query(
      "SELECT COUNT(*) as total FROM checkout WHERE edad > 40"
    );

    // Calcular los porcentajes de cada grupo de edad

    const porcentaje18_25 = total18_25[0].total;
    const porcentaje25_30 = total25_30[0].total;
    const porcentaje35_40 = total35_40[0].total;
    const porcentaje40_plus = total40_plus[0].total;

    res.json({
      porcentaje18_25,
      porcentaje25_30,
      porcentaje35_40,
      porcentaje40_plus,
    });
  } catch (error) {
    console.log(error);
  }
};

const obtenerDepartamentosSeleccionadosPorMes = async (req, res) => {
  try {
    const connection = await getConnection();

    const result = await connection.query(`
      SELECT 
        MONTH(fecha_del_checkout) AS mes,
        departamento,
        COUNT(*) AS total
      FROM checkout
      GROUP BY mes, departamento
      ORDER BY mes, total DESC
    `);

    const departamentosPorMes = {};

    result.forEach((row) => {
      const mes = row.mes;
      const departamento = row.departamento;
      const total = row.total;

      if (!departamentosPorMes[mes]) {
        departamentosPorMes[mes] = [];
      }

      departamentosPorMes[mes].push({ departamento, total });
    });

    console.log(departamentosPorMes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

obtenerDepartamentosSeleccionadosPorMes();

export const methods = {
  createCheckout,
  getCheckout,
  getCheckoutById,
  cantidadVentas,
  getTotalCheckout,
  datosPromedio,
  obtenerPorcentajeEdad,
};
