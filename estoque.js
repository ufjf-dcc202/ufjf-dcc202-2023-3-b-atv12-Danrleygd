let estoque = {
  joao: [
    { tipo: "maca", qnd: 1 },
    { tipo: "pera", qnd: 2 },
  ],
  maria: [
    { tipo: "maca", qnd: 2 },
    { tipo: "banana", qnd: 4 },
  ],
};

function getEstoque() {
  return structuredClone(estoque);
}

function transacao(origem, destino, tipo, quantidade) {
  if (origem === destino) {
    return;
  }
  if (destino === "pomar") {
    dePessoaParaPomar(origem, tipo, quantidade);
    return;
  }
  if (origem === "pomar") {
    dePomarParaPessoa(destino, tipo, quantidade);
    return;
  }

  const pessoaOrigem = estoque[origem];
  const pessoaDestino = estoque[destino];
  let monteOrigem;

  for (let i = 0; i < pessoaOrigem.length; i++) {
    const monte = pessoaOrigem[i];
    if (monte.tipo === tipo) {
      monteOrigem = monte;
      break;
    }
  }

  if (!monteOrigem) {
    return;
  }

  let monteDestino;

  for (let i = 0; i < pessoaDestino.length; i++) {
    const monte = pessoaDestino[i];
    if (monte.tipo === tipo) {
      monteDestino = monte;
      break;
    }
  }

  if (!monteDestino) {
      monteDestino = { 'tipo': tipo, 'qnd': 0 };
      pessoaDestino.push(monteDestino);
  }

  const qtdReal = Math.min(quantidade, monteOrigem.qnd);
  monteDestino.qnd += qtdReal;
  monteOrigem.qnd -= qtdReal;

  function dePessoaParaPomar(origem, tipo, quantidade) {
    const pessoa = estoque[origem];
    for (let i = 0; i < pessoa.length; i++) {
      const monte = pessoa[i];
      if (monte.tipo === tipo) {
        monte.qnd -= Math.min(quantidade, monte.qnd);
        return;
      }
    }
  }

  function dePomarParaPessoa() {
    const pessoa = estoque[destino];
    for (let i = 0; i < pessoa.length; i++) {
      const monte = pessoa[i];
      if (monte.tipo === tipo) {
        monte.qnd += Math.max(quantidade, 0);
        return;
      }
    }
    const novoMonte = { tipo: tipo, qnd: Math.max(quantidade, 0) };
    pessoa.push(novoMonte);
  }
}
export { getEstoque, transacao };
