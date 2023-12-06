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
  if (destino === "pomar") {
    const pessoa = estoque[origem];
    for (let i = 0; i < pessoa.length; i++) {
      const monte = pessoa[i];
      if (monte.tipo === tipo) {
        monte.qnd -= Math.min(quantidade, monte.qnd);
      }
    }
  }
  if (origem === "pomar") {
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
