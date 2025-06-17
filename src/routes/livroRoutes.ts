import { Router } from 'express';
import {
  listarLivros,
  criarLivro,
  atualizarLivro,
  deletarLivro,
} from '../controllers/livroController';

const router = Router();

router.get('/livros', listarLivros);
router.post('/livros', criarLivro);
router.put('/livros/:id', atualizarLivro);
router.delete('/livros/:id', deletarLivro);

export default router;
