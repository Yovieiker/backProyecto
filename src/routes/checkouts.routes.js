import { Router } from "express";
const { body } = require("express-validator");
import { methods as checkoutController } from "../controllers/checkout.controller";
const router = Router();

// Validaciones para el endpoint de creación de checkout
const checkoutValidations = [
  body("id_usuario").isNumeric().notEmpty(),
  body("fecha_del_checkout").isISO8601().notEmpty(),
  body("total").isDecimal({ decimal_digits: "2" }).notEmpty(),
  body("cedula").isLength({ min: 1, max: 11 }).notEmpty(),
  body("telefono").isLength({ min: 1, max: 15 }).notEmpty(),
  body("departamento").isLength({ min: 1, max: 255 }).notEmpty(),
  body("ciudad").isLength({ min: 1, max: 255 }).notEmpty(),
  body("direccion").isLength({ min: 1, max: 255 }).notEmpty(),
  body("metodo_pago").isLength({ min: 1, max: 255 }).notEmpty(),
  body("edad").isNumeric().notEmpty(),
];
// Ruta para crear un checkout
router.post("/", checkoutValidations, checkoutController.createCheckout);
router.get("/cantidad", checkoutController.cantidadVentas);
router.get("/datos", checkoutController.getTotalCheckout);
router.get("/promedio", checkoutController.datosPromedio);
router.get("/edadpromedio", checkoutController.obtenerPorcentajeEdad);
router.get("/", checkoutController.getCheckout);
router.get("/:id", checkoutController.getCheckoutById);
export default router;
