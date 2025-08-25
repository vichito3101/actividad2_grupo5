import _express from "express";
import * as rusuario from "../controllers/persona.controller.js"
import * as mauth from "../middleware/auth.middleware.js"
const router= _express.Router();

router.get('/', rusuario.getAll);

router.get('/:id',rusuario.getById);

router.post('/', mauth.authMiddleware(), rusuario.create);

router.put('/:id', mauth.authMiddleware(["admin"]), rusuario.update);

router.patch('/:id', mauth.authMiddleware(), rusuario.update);

router.delete('/:id',mauth.authMiddleware(), rusuario.deletes);

export default router;