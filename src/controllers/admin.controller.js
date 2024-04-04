import { getConnection } from "../database/database";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM usuarios WHERE id = ?",
      [id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const createAdmin = async (req, res) => {
  try {
    const { nombre, apellido, email, contraseña } = req.body;
    if (
      nombre === undefined ||
      apellido === undefined ||
      email === undefined ||
      contraseña === undefined
    ) {
      return res
        .status(400)
        .json({ message: "Bad Request. Please fill all fields." });
    }

    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    const connection = await getConnection();

    // Comprueba si el email ya está registrado en la base de datos
    const emailExists = await connection.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (emailExists.length > 0) {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    // Genera un hash de la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Inserta el nuevo usuario en la base de datos
    const user = {
      nombre,
      apellido,
      email,
      contraseña: hashedPassword,
      fecha_registro: currentDate,
    };

    await connection.query("INSERT INTO usuarios SET ?", user);

    res.status(201).json({ message: "Registro exitoso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { correo, clave } = req.body;
    const connection = await getConnection();

    // Verifica si el email existe en la base de datos
    const admin = await connection.query(
      "SELECT * FROM administradores WHERE correo = ?",
      [correo]
    );

    if (admin.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Compara la contraseña ingresada con el hash almacenado
    const passwordMatch = await bcrypt.compare(clave, admin[0].clave);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Genera un token de acceso utilizando jsonwebtoken
    const token = jwt.sign({ id: admin[0].id }, "tu_clave_secreta");

    res.status(200).json({
      token,
      idAdmin: admin[0].id,
      nombre: admin[0].nombre,
      apellido: admin[0].apellido,
      email: admin[0].correo,
      rol: admin[0].rol,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const methods = {
  getAdmin,
  createAdmin,
  loginAdmin,
};
