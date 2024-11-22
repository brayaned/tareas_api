import {Router} from "express";
import { usuarioController } from "../controllers/usuario.controller.js";
import { verificarToken } from "../middlewares/autenticacion.middleware.js";

const router = Router()

router.post('/', usuarioController.register)
router.get('/:id', verificarToken, usuarioController.findOneById)
router.get('/', usuarioController.findAll)
router.put('/', usuarioController.update)
router.get('/delete/:id', usuarioController.inactivate)
router.post('/login', usuarioController.login)

export default router;