const Linha = require('../models/linhasModel');

// Registrar nova linha
exports.register = async (req, res) => {
  var { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).send('Preencha todos os campos.');
  }
  if (status == 1){
    status = true;
  }else{
    status = false;
  }


  try {

    Linha.create({id, status}, (err, result) => {
      if (err) {
        console.error('Erro ao registrar linha:', err);
        return res.status(500).send('Erro ao registrar linha.');
      }

      if (result.affectedRows === 1) {
        return res.redirect('/admCadastroLinhaOnibus');
      } else {
        return res.status(500).send('Não foi possível registrar o usuário.');
      }
    });
  } catch (error) {
    console.error('Erro interno no registro:', error);
    return res.status(500).send('Erro interno ao registrar.');
  }
};

