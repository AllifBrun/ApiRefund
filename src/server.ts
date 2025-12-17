import { app } from "./app";

const PORT = 4444;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
