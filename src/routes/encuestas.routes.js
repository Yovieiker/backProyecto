import { Router } from "express";
import { methods as encuestasController } from "../controllers/encuesta.controller";
import authenticateToken from "../middleware/token";
const router = Router();

router.post("/:idUsuario", encuestasController.createEncuesta);
router.get("/", encuestasController.getEncuestas);
export default router;
