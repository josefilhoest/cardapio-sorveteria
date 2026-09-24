import { useState } from "react";
import { formatarMoeda } from "../utils/moeda";

export function ProdutoCard({ produto, onAdicionar }) {
  const [complementosSelecionados, setComplementosSelecionados] =
    useState([]);

  const grupoComplementos = produto.opcoes?.find(
    (opcao) => opcao.id === "complementos"
  );

  const alternarComplemento = (complemento) => {
    setComplementosSelecionados((selecionadosAtuais) => {
      const jaSelecionado = selecionadosAtuais.some(
        (item) => item.id === complemento.id
      );

      if (jaSelecionado) {
        return selecionadosAtuais.filter(
          (item) => item.id !== complemento.id
        );
      }

      return [...selecionadosAtuais, complemento];
    });
  };

  const criarChaveConfiguracao = () => {
    const idsOrdenados = complementosSelecionados
      .map((item) => item.id)
      .sort()
      .join("|");

    return `${produto.id}|${idsOrdenados}`;
  };

  const adicionarProduto = () => {
    const produtoConfigurado = {
      ...produto,
      chave: criarChaveConfiguracao(),
      complementos: complementosSelecionados,
    };

    onAdicionar(produtoConfigurado);
  };

  return (
    <article className="produto-card">
      <img src={produto.imagem} alt={produto.nome} />

      <div className="produto-conteudo">
        <h3>{produto.nome}</h3>

        <p>{produto.descricao}</p>

        {produto.precoPorPeso ? (
          <strong>Valor após a pesagem</strong>
        ) : (
          <strong>{formatarMoeda(produto.preco)}</strong>
        )}

        {grupoComplementos && (
          <div className="produto-opcoes">
            <p>
              <strong>{grupoComplementos.nome}</strong>
            </p>

            {grupoComplementos.itens.map((complemento) => (
              <label key={complemento.id}>
                <input
                  type="checkbox"
                  checked={complementosSelecionados.some(
                    (item) => item.id === complemento.id
                  )}
                  onChange={() => alternarComplemento(complemento)}
                />

                {complemento.nome}
              </label>
            ))}
          </div>
        )}

        <button
          type="button"
          disabled={!produto.disponivel}
          onClick={adicionarProduto}
        >
          {produto.disponivel ? "Adicionar" : "Indisponível"}
        </button>
      </div>
    </article>
  );
}