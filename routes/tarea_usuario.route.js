import {Router} from "express";
import { tareaUsuarioController } from "../controllers/tarea_usuario.controller.js";

const router = Router()

router.post('/', tareaUsuarioController.register)
router.get('/:id', tareaUsuarioController.findOneById)
router.get('/', tareaUsuarioController.findAll)
router.put('/', tareaUsuarioController.update)
router.get('/delete/:id', tareaUsuarioController.inactivate)


export default router;