const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarioModel');

// Registrar novo usuário
exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).send('Preencha todos os campos.');
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    Usuario.create({ nome, email, senha: senhaCriptografada }, (err, result) => {
      if (err) {
        console.error('Erro ao registrar usuário:', err);
        return res.status(500).send('Erro ao registrar usuário.');
      }

      if (result.affectedRows === 1) {
        return res.redirect('/'); // Após registro, redireciona para tela de login
      } else {
        return res.status(500).send('Não foi possível registrar o usuário.');
      }
    });
  } catch (error) {
    console.error('Erro interno no registro:', error);
    return res.status(500).send('Erro interno ao registrar.');
  }
};

// Login com redirecionamento
exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send('Email e senha são obrigatórios.');
  }

  Usuario.findByEmail(email, async (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).send('Erro ao buscar usuário.');
    }

    if (results.length === 0) {
      return res.status(401).send('Usuário não encontrado.');
    }

    const usuario = results[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).send('Senha incorreta.');
    }

    // Autenticação bem-sucedida: salvar sessão
    req.session.usuarioId = usuario.id;

    // Redireciona para página de cadastro de tarefa
    return res.redirect('/tarefa');
  });
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
