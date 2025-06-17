import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("API Biblioteca rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
