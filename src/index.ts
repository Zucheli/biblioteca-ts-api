import express from 'express';
import livroRoutes from './routes/livroRoutes';

const app = express();
app.use(express.json());

app.use(livroRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
