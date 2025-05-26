const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const PORT = 3000;

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar sessão
app.use(
  session({
    secret: "seusegredoaqui", // Troque por algo seguro
    resave: false,
    saveUninitialized: true,
  })
);

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Rotas
const authRoutes = require("./routes/authRoutes");
const tarefasRoutes = require("./routes/tarefasRoutes");
app.use("/api/tarefas", tarefasRoutes);

// Usar rotas com prefixos
app.use("/api/usuarios", authRoutes);

const responsaveisRoutes = require("./routes/responsaveisRoutes");
app.use("/api/responsaveis", responsaveisRoutes);

// Roteamento de páginas HTML
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/login.html"));
});

app.get("/admCadastroLinhaOnibus", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/admLinhaOnibus.html"));
});

app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/cadastro.html"));
});

app.get("/cadastroAdm", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/cadastroAdm.html"));
});

app.get("/esqueciSenha", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/esqueciSenha.html"));
});

app.get("/linhaOnibus", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/linhaOnibus.html"));
});

app.get("/perfil", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/perfil.html"));
});

app.get("/sobreNos", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/sobreNos.html"));
});

app.post("/cadastro", (req, res) => {
  res.redirect("/api/usuarios/cadastro");
});

app.post("cadastro", (req, res) => {
  res.redirect("/api/admins/cadatro");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/index`);
});
