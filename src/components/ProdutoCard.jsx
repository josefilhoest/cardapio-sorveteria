import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { formatarMoeda } from "../utils/moeda";

export function ProdutoCard({ produto, onAdicionar }) {
  const [complementosSelecionados, setComplementosSelecionados] =
    useState([]);

  const [modalAberto, setModalAberto] = useState(false);

  const grupoComplementos = produto.opcoes?.find(
    (opcao) => opcao.id === "complementos"
  );

  // =====================================================
  // ABRIR / FECHAR MODAL
  // =====================================================

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  // =====================================================
  // FECHAR COM ESC + BLOQUEAR SCROLL DA PÁGINA
  // =====================================================

  useEffect(() => {
    if (!modalAberto) {
      return;
    }

    const fecharComEsc = (event) => {
      if (event.key === "Escape") {
        fecharModal();
      }
    };

    document.addEventListener("keydown", fecharComEsc);

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", fecharComEsc);
      document.body.style.overflow = overflowAnterior;
    };
  }, [modalAberto]);

  // =====================================================
  // COMPLEMENTOS
  // =====================================================

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

  // =====================================================
  // CHAVE DO PRODUTO CONFIGURADO
  // =====================================================

  const criarChaveConfiguracao = () => {
    const idsOrdenados = complementosSelecionados
      .map((item) => item.id)
      .sort()
      .join("|");

    return `${produto.id}|${idsOrdenados}`;
  };

  // =====================================================
  // ADICIONAR AO CARRINHO
  // =====================================================

  const adicionarProduto = () => {
    const produtoConfigurado = {
      ...produto,
      chave: criarChaveConfiguracao(),
      complementos: complementosSelecionados,
    };

    onAdicionar(produtoConfigurado);
  };

  // =====================================================
  // MODAL
  // =====================================================

  const modalComplementos =
    modalAberto &&
    grupoComplementos &&
    createPortal(
      <div
        className="modal-complementos-overlay"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            fecharModal();
          }
        }}
      >
        <div
          className="modal-complementos"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-titulo-${produto.id}`}
        >
          <div className="modal-complementos-topo">
            <div>
              <span>Monte do seu jeito</span>

              <h2 id={`modal-titulo-${produto.id}`}>
                Complementos do Açaí
              </h2>
            </div>

            <button
              type="button"
              className="modal-complementos-fechar"
              onClick={fecharModal}
              aria-label="Fechar complementos"
            >
              ×
            </button>
          </div>

          <p className="modal-complementos-descricao">
            Escolha quantos complementos desejar.
          </p>

          <div className="modal-complementos-lista">
            {grupoComplementos.itens.map((complemento) => {
              const selecionado = complementosSelecionados.some(
                (item) => item.id === complemento.id
              );

              return (
                <label
                  key={complemento.id}
                  className={
                    selecionado
                      ? "modal-complemento-item selecionado"
                      : "modal-complemento-item"
                  }
                >
                  <input
                    type="checkbox"
                    checked={selecionado}
                    onChange={() =>
                      alternarComplemento(complemento)
                    }
                  />

                  <span>{complemento.nome}</span>
                </label>
              );
            })}
          </div>

          <div className="modal-complementos-rodape">
            <p>
              <strong>
                {complementosSelecionados.length}
              </strong>{" "}
              complemento(s) selecionado(s)
            </p>

            <button
              type="button"
              className="modal-complementos-confirmar"
              onClick={fecharModal}
            >
              Confirmar escolhas
            </button>
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <>
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
            <>
              <button
                type="button"
                className="botao-complementos"
                onClick={abrirModal}
              >
                Escolher complementos
              </button>

              {complementosSelecionados.length > 0 && (
                <p className="resumo-complementos">
                  {complementosSelecionados.length} complemento(s)
                  selecionado(s)
                </p>
              )}
            </>
          )}

          <button
            type="button"
            disabled={!produto.disponivel}
            onClick={adicionarProduto}
          >
            {produto.disponivel
              ? "Adicionar"
              : "Indisponível"}
          </button>
        </div>
      </article>

      {modalComplementos}
    </>
  );
}