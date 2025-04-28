// Importando o módulo Express
const express = require("express");
// serve para lidar com caminhos de arquivos e pastas no computador.
const path = require("path");
// permite ler e escrever arquivos (como arquivos .json).
const fs = require("fs");
// Inicializando a aplicação Express
const app = express();
// Definindo a porta onde o servidor irá rodar
const PORT = 3001;

// Middleware para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Middleware para processar dados enviados via formulário (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
// Middleware para processar JSON
app.use(express.json());

// Rota para exibir o formulário de cadastro de usuario (responsavel.html)
app.get("/usuarios", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cadastro.html"));
});

// Rota GET para buscar os usuarios e retornar em JSON
app.get("/api/usuarios", (req, res) => {
  const filePath = path.join(__dirname, "data", "usuarios.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo de usuarios:", err);
      return res
        .status(500)
        .json({ success: false, message: "Erro ao obter Usuarios." });
    }

    try {
      const usuarios = JSON.parse(data);
      return res.status(200).json({ success: true, usuarios });
    } catch (parseError) {
      console.error("Erro ao fazer o parsing do JSON:", parseError);
      return res.status(500).json({
        success: false,
        message: "Erro ao processar os usuarios.",
      });
    }
  });
});

// Rota GET para buscar as LINHAS e retornar em JSON
app.get("/api/linhas", (req, res) => {
  const filePath = path.join(__dirname, "data", "linhas.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo de linhas:", err);
      return res
        .status(500)
        .json({ success: false, message: "Erro ao obter linhas." });
    }
    try {
      const linhas = JSON.parse(data);
      return res.status(200).json({ success: true, linhas });
    } catch (parseError) {
      console.error("Erro ao fazer o parsing do JSON:", parseError);
      return res.status(500).json({
        success: false,
        message: "Erro ao processar os responsáveis.",
      });
    }
  });
});

// Rota POST para cadastrar um usuario e salvar no arquivo JSON
app.post("/Cadusuarios", (req, res) => {
  const { email, senha, confSenha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({
      success: false,
      message: "Email e senha do usuario é obrigatório.",
    });
  }
  const filePath = path.join(__dirname, "data", "usuarios.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo JSON:", err);
      return res
        .status(500)
        .json({ success: false, message: "Erro ao processar o cadastro." });
    }

    const usuarios = JSON.parse(data);

    const novoUsuario = {
      id: usuarios.length + 1,
      email: email,
      senha: senha,
    };

    usuarios.push(novoUsuario);

    fs.writeFile(filePath, JSON.stringify(usuarios, null, 3), (err) => {
      if (err) {
        console.error("Erro ao escrever no arquivo JSON:", err);
        return res
          .status(500)
          .json({ success: false, message: "Erro ao salvar o usuario." });
      }
      if (senha === confSenha) {
        return res.status(200).json({
          success: true,
          message: "usuario cadastrado com sucesso!",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "As senhas cadastradas não são iguais",
        });
      }
    });
  });
});

// Rota POST para cadastrar uma LINHA e salvar no arquivo JSON
app.post("/Cadlinhas", (req, res) => {
  const { numero, pontoInicial, pontoPartida, horario } = req.body;

  if (!numero || !pontoInicial || !pontoPartida || !horario) {
    return res.status(400).json({
      success: false,
      message:
        "Número, ponto de inicio, ponto de partida e horário da linha é obrigatório.",
    });
  }

  const filePath = path.join(__dirname, "data", "linhas.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo JSON:", err);
      return res
        .status(500)
        .json({ success: false, message: "Erro ao processar o cadastro." });
    }

    const linhas = JSON.parse(data);

    const novoUsuario = {
      id: linhas.length + 1,
      numero: numero,
      pontoInicial: pontoInicial,
      pontoPartida: pontoPartida,
      horario: horario,
    };

    linhas.push(novoUsuario);

    fs.writeFile(filePath, JSON.stringify(linhas, null, 3), (err) => {
      if (err) {
        console.error("Erro ao escrever no arquivo JSON:", err);
        return res
          .status(500)
          .json({ success: false, message: "Erro ao salvar o usuario." });
      }

      return res.status(200).json({
        success: true,
        message: "linha cadastrada com sucesso!",
      });
    });
  });
});

// Rota PUT para editar uma usuario existente
app.put("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { email, senha } = req.body;

  const usuariosFilePath = path.join(__dirname, "data", "usuarios.json");

  fs.readFile(usuariosFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo de usuarios:", err);
      return res
        .status(500)
        .json({ success: false, message: "Erro ao processar as usuarios." });
    }

    let usuarios = [];
    try {
      if (data) {
        usuarios = JSON.parse(data);
      }
    } catch (parseError) {
      console.error(
        "Erro ao fazer o parsing do arquivo de usuarios:",
        parseError
      );
      return res
        .status(500)
        .json({ success: false, message: "Erro ao processar as usuarios." });
    }

    const usuarioIndex = usuarios.findIndex(
      (usuario) => usuario.id === parseInt(id, 10)
    );
    if (usuarioIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "usuario não encontrada." });
    }

    // Atualizar os dados da usuario
    usuarios[usuarioIndex] = {
      ...usuarios[usuarioIndex],
      email,
      senha,
    };

    // Salvar as alterações no arquivo JSON
    fs.writeFile(usuariosFilePath, JSON.stringify(usuarios, null, 2), (err) => {
      if (err) {
        console.error("Erro ao salvar a usuario atualizada:", err);
        return res.status(500).json({
          success: false,
          message: "Erro ao salvar a usuario atualizada.",
        });
      }

      return res
        .status(200)
        .json({ success: true, message: "usuario atualizada com sucesso!" });
    });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
