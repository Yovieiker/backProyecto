const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticación faltante' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, 'tu_clave_secreta');

    // Agregar la información del usuario a la solicitud para su uso en las rutas protegidas
    req.userId = decoded.id;

    // Continuar con la ejecución de la siguiente función de middleware o controlador
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token de autenticación inválido' });
  }
};

export default authenticateToken;