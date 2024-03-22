-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-03-2024 a las 04:41:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbsense`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `checkout`
--

CREATE TABLE `checkout` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_del_checkout` datetime NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `cedula` varchar(11) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `departamento` varchar(255) NOT NULL,
  `ciudad` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `metodo_pago` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `checkout`
--

INSERT INTO `checkout` (`id`, `id_usuario`, `fecha_del_checkout`, `total`, `cedula`, `telefono`, `departamento`, `ciudad`, `direccion`, `metodo_pago`) VALUES
(1, 2, '2024-03-13 03:15:51', 55900.00, '26779975', '04145768079', 'CORDOBA', 'Los Garzones', 'carrera 6 calle ', 'Cuenta'),
(2, 3, '2024-03-14 00:41:48', 55900.00, '26779974', '04145768079', 'CASANARE', 'Aguazul', 'barrio union', 'Tarjeta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_de_respuesta` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `encuestas`
--

INSERT INTO `encuestas` (`id`, `id_usuario`, `fecha_de_respuesta`) VALUES
(7, 2, '2024-03-11 21:41:27'),
(8, 3, '2024-03-14 00:38:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `métodos_de_pago_con_cuentas_bancarias`
--

CREATE TABLE `métodos_de_pago_con_cuentas_bancarias` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `número` varchar(255) NOT NULL,
  `titular` varchar(255) NOT NULL,
  `banco` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `métodos_de_pago_con_tarjetas_de_crédito`
--

CREATE TABLE `métodos_de_pago_con_tarjetas_de_crédito` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `número` varchar(255) NOT NULL,
  `titular` varchar(255) NOT NULL,
  `cvv` varchar(4) NOT NULL,
  `fecha_de_vencimiento` date NOT NULL,
  `tipo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas_encuesta`
--

CREATE TABLE `respuestas_encuesta` (
  `id` int(11) NOT NULL,
  `id_encuesta` int(11) NOT NULL,
  `pregunta_id` int(11) NOT NULL,
  `pregunta_titulo` varchar(255) NOT NULL,
  `respuesta_seleccionada` int(11) NOT NULL,
  `respuesta_titulo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `respuestas_encuesta`
--

INSERT INTO `respuestas_encuesta` (`id`, `id_encuesta`, `pregunta_id`, `pregunta_titulo`, `respuesta_seleccionada`, `respuesta_titulo`) VALUES
(43, 7, 1889, '¿Cuál es tu tono de piel?', 9066, 'Blanca'),
(44, 7, 1891, 'Tu piel es:', 9077, 'Grasa'),
(45, 7, 2522, '¿Cual de estos productos hace parte de tu rutina de cuidado facial? (Opción Múltiple)', 12090, 'Desmaquillante'),
(46, 7, 1890, '¿Qué problemas tienes con tu piel?', 9069, 'Arrugas/Vejez'),
(47, 7, 1892, '¿Qué tan experta eres maquillándote?', 9080, 'Mucho'),
(48, 7, 2518, '¿Que tonalidad de labiales prefieres? (Opción Múltiple)', 12078, 'Tonos Nude - Marrones'),
(49, 7, 1896, '¿Cuál de estos estilos te describe?', 9126, 'Deportiva'),
(50, 7, 1, '¿De qué color es tu cabello?', 3, 'Castaño claro'),
(51, 7, 1890, '¿Qué problemas tienes con tu piel?', 9071, 'Sensibilidad'),
(52, 8, 1889, '¿Cuál es tu tono de piel?', 9064, 'Blanca Bronceada'),
(53, 8, 1891, 'Tu piel es:', 9076, 'Seca'),
(54, 8, 2522, '¿Cual de estos productos hace parte de tu rutina de cuidado facial? (Opción Múltiple)', 12090, 'Desmaquillante'),
(55, 8, 1890, '¿Qué problemas tienes con tu piel?', 9069, 'Arrugas/Vejez'),
(56, 8, 1892, '¿Qué tan experta eres maquillándote?', 9080, 'Mucho'),
(57, 8, 1893, '¿Qué tanto te gusta el maquillaje?', 9083, 'Mucho'),
(58, 8, 2516, '¿Que productos utilizas al momento de maquillarte?', 12070, 'Base'),
(59, 8, 2517, '¿Que tonalidad de sombras prefieres? (Opción Múltiple)', 12072, 'Colores Vibrantes'),
(60, 8, 2518, '¿Que tonalidad de labiales prefieres? (Opción Múltiple)', 12077, 'Tonos Violetas - Morados'),
(61, 8, 1896, '¿Cuál de estos estilos te describe?', 9124, 'Profesional'),
(62, 8, 1, '¿De qué color es tu cabello?', 5, 'Rojizo'),
(63, 8, 1887, 'Le hago lo siguiente a mi cabello:', 9051, 'Rizos con maquina'),
(64, 8, 1895, '¿Qué productos son tus preferidos?', 9115, 'Productos para las uñas'),
(65, 8, 2520, '¿Que tan arriesgada eres para probar marcas nuevas?', 12082, 'Muy arriesgada'),
(66, 8, 1916, '¿Por cual medio nos conociste?', 9322, 'Google'),
(67, 8, 1889, '¿Cuál es tu tono de piel?', 9063, 'Trigueña Bronceada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `fecha_registro` datetime NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `contraseña`, `fecha_registro`, `estado`) VALUES
(2, 'yovieiker', 'canelon', 'yovieiker21@gmail.com', '$2b$10$n.YYMVuSGPMh.PGKp7HnweOg7Q6V9RlibDyHLnCDmT/t71V/cX2nK', '2024-03-10 18:06:52', 'activo'),
(3, 'andres', 'peraza', 'yovieiker12@gmail.com', '$2b$10$wxcJ/yzEiQxdCZPYtKFBjuYIQmsAC/nmKVHUbgIYkVwEIzCkyDxAC', '2024-03-14 00:30:10', 'activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `métodos_de_pago_con_cuentas_bancarias`
--
ALTER TABLE `métodos_de_pago_con_cuentas_bancarias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `métodos_de_pago_con_tarjetas_de_crédito`
--
ALTER TABLE `métodos_de_pago_con_tarjetas_de_crédito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `respuestas_encuesta`
--
ALTER TABLE `respuestas_encuesta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_encuesta` (`id_encuesta`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `checkout`
--
ALTER TABLE `checkout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `métodos_de_pago_con_cuentas_bancarias`
--
ALTER TABLE `métodos_de_pago_con_cuentas_bancarias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `métodos_de_pago_con_tarjetas_de_crédito`
--
ALTER TABLE `métodos_de_pago_con_tarjetas_de_crédito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `respuestas_encuesta`
--
ALTER TABLE `respuestas_encuesta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `checkout`
--
ALTER TABLE `checkout`
  ADD CONSTRAINT `checkout_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD CONSTRAINT `encuestas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `métodos_de_pago_con_cuentas_bancarias`
--
ALTER TABLE `métodos_de_pago_con_cuentas_bancarias`
  ADD CONSTRAINT `métodos_de_pago_con_cuentas_bancarias_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `métodos_de_pago_con_tarjetas_de_crédito`
--
ALTER TABLE `métodos_de_pago_con_tarjetas_de_crédito`
  ADD CONSTRAINT `métodos_de_pago_con_tarjetas_de_crédito_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `respuestas_encuesta`
--
ALTER TABLE `respuestas_encuesta`
  ADD CONSTRAINT `respuestas_encuesta_ibfk_1` FOREIGN KEY (`id_encuesta`) REFERENCES `encuestas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
