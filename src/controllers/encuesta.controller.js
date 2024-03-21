import { getConnection } from "../database/database";


const getEncuestas = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM encuestas');
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const createEncuesta = async (req, res) => {
  const encuestaData = req.body;
  const idUsuario = req.params.idUsuario;

  try {
    // Obtener la conexión a la base de datos
    const connection = await getConnection();

    // Verificar si el ID del usuario existe en la tabla usuarios
    const user = await connection.query('SELECT * FROM usuarios WHERE id = ?', [idUsuario]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Insertar los datos de la encuesta en la tabla encuestas
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const encuestaUser = { id_usuario: idUsuario, fecha_de_respuesta: currentDate };
    const insertEncuestaResult = await connection.query("INSERT INTO encuestas SET ?", encuestaUser);
    const encuestaId = insertEncuestaResult.insertId;

    // Insertar las respuestas de la encuesta en la tabla respuestas_encuesta
    const respuestas = encuestaData;
    for (const respuesta of respuestas) {
      const insertRespuestaQuery = 'INSERT INTO respuestas_encuesta (id_encuesta, pregunta_id, pregunta_titulo, respuesta_seleccionada, respuesta_titulo) VALUES (?, ?, ?, ?, ?)';
      const insertRespuestaParams = [encuestaId, respuesta.preguntaId, respuesta.preguntaTitulo, respuesta.respuestaSeleccionada, respuesta.respuestaTitulo];

      await connection.query(insertRespuestaQuery, insertRespuestaParams);
    }

    res.status(200).json({ message: 'Encuesta guardada exitosamente' });
  } catch (error) {
    console.error('Error al guardar la encuesta:', error);
    res.status(500).json({ error: 'Error al guardar la encuesta' });
  }
}
  

  

  export const methods = {
    getEncuestas,
    createEncuesta
  };
  