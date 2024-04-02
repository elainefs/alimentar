// Formulários

const formularios = {
  alimentos: {
    nome: "formulario-alimentos",
    campos: ["id", "nome", "descricao", "imagem"],
  },
  receptores: {
    nome: "formulario-receptores",
    campos: [
      "id",
      "nome",
      "email",
      "telefone",
      "rua",
      "bairro",
      "numero",
      "cidade",
      "estado",
      "cep",
      "descricao",
      "imagem",
    ],
  },
  doacao: {
    nome: "formulario-doacao",
    campos: [
      "id",
      "nome",
      "email",
      "telefone",
      "rua",
      "bairro",
      "numero",
      "cidade",
      "estado",
      "cep",
      "receptor",
      "alimento",
      "quantidade",
      "validade",
    ],
  },
};

function gerarId() {
  return Date.now();
}

const ImgCadastro = document.getElementById("ImgCadastro");

if (ImgCadastro) {
  ImgCadastro.style.display = "none";
}

const formularioAtual = getFormularioAtual();

function salvarDadosFormulario(event) {
  event.preventDefault();

  const id = gerarId();

  const dadosFormulario = {};
  for (const campo of formularioAtual.campos) {
    dadosFormulario[campo] = document.getElementById(campo).value;
  }

  dadosFormulario.id = id;

  const dadosFormularioJSON = localStorage.getItem(formularioAtual.nome) ?? "[]";
  const dadosFormularioArray = JSON.parse(dadosFormularioJSON);

  dadosFormularioArray.push(dadosFormulario);

  localStorage.setItem(
    formularioAtual.nome,
    JSON.stringify(dadosFormularioArray)
  );

  const tituloCadastro = document.getElementById("tituloCadastro");
  const idCadastro = document.getElementById("idCadastro");
  const nomeCadastro = document.getElementById("nomeCadastro");
  const descricaoCadastro = document.getElementById("descricaoCadastro");

  if (formularioAtual.nome === "formulario-alimentos") {
    tituloCadastro.textContent = "Você cadastrou:";
    idCadastro.textContent = "ID: " + dadosFormulario.id;
    nomeCadastro.textContent = "Nome do Alimento: " + dadosFormulario.nome;
    descricaoCadastro.textContent = "Descrição: " + dadosFormulario.descricao;
    ImgCadastro.setAttribute("src", dadosFormulario.imagem);
    ImgCadastro.style.display = "block";
  } else if (formularioAtual.nome === "formulario-receptores") {
    tituloCadastro.textContent = `${dadosFormulario.nome}, seu cadastro foi realizado com sucesso`;
    idCadastro.textContent = "ID: " + dadosFormulario.id;
    descricaoCadastro.textContent = "Descrição: " + dadosFormulario.descricao;
    ImgCadastro.setAttribute("src", dadosFormulario.imagem);
    ImgCadastro.style.display = "block";
  } else {
    tituloCadastro.textContent = `${dadosFormulario.nome}, sua doação foi realizada com sucesso.`;
    idCadastro.textContent = "ID: " + dadosFormulario.id;
    descricaoCadastro.textContent = `Você doou ${dadosFormulario.quantidade} (Kg/L) de ${dadosFormulario.alimento}. Agradecemos a contribuição!`;
  }
  
  document.getElementById(formularioAtual.nome).reset();
}

document.getElementById(`${formularioAtual.nome}`).addEventListener("submit", salvarDadosFormulario);

function getFormularioAtual() {
  const url = window.location.href;
  const nomeFormulario = url.split("/").pop().replace(".html", "");

  for (const formulario of Object.values(formularios)) {
    if (nomeFormulario === formulario.nome) {
      return formulario;
    }
  }
}
