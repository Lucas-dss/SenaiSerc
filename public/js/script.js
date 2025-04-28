//localStorage.clear()
var i = 1;
function verificarUsuarioExistente(){
  const usuariosJSON = 'usuarios.json'
  fetch(usuariosJSON).then(response => response.json()).then(data => {
    const emailParaVerificar = email;
    data.forEach(usuarios => {
      if (usuarios.email === email) {
      alert("Usuario existente!!!");
      const v = true;
      }
      else{
        const v = false;
      }
    });
  });
  return v;
}
function verificarLogin() {
  email = document.getElementById("inputEmail").value;
  senha = document.getElementById("inputSenha").value;
  // as informações dos usuários cadastrados
  const info = {
    email: email,
    senha: senha,
  }
  if(email === "" ||senha === ""){
    alert("Preencha todos os campos.");
  // const info = {
  //   email: localStorage.getItem("usuario" + 1),
  // };
  // const dado = localStorage.getItem("usuario" + 1);
  // alert(JSON.stringify(info.email));
  }
  else{
    alert(email + ", " + senha);
    return(email, senha)
  }
}
function verificarCadastro() {
  // as variantes são iguais aos valores do que há no input
  email = document.getElementById("inputEmail").value;
  senha = document.getElementById("inputSenha").value;
  confSenha = document.getElementById("confSenha").value;
  //verifica se as senhas são iguais
  if (senha === confSenha) {
    // as informações dos usuários cadastrados
    const info = {
      email: email,
      senha: senha,
    };
    // coloca elas dentro do localStorage
    localStorage.setItem("usuario" + i, JSON.stringify(info));
    //alert(info.email)
    //retorna mais um para o valor
    return i++;
  } else {
    alert("As duas senhas não estão iguais.");
  }
  return localStorage.setItem("usuario", info);
}
