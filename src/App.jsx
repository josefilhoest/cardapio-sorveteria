import { useState } from "react";
import { formatarMoeda } from "./utils/moeda";
import "./App.css";
import { useCarrinho } from "./hooks/useCarrinho";
import { categorias, produtos } from "./data/produtos";
import { ProdutoCard } from "./components/ProdutoCard";
import { configuracao } from "./data/configuracao";


function App() {

  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const {
    itens: carrinho,
    adicionarItem: adicionarAoCarrinho,
    removerItem: removerDoCarrinho,
    diminuirQuantidade,
  } = useCarrinho();
  const [nomeCliente, setNomeCliente] = useState("");
  const [endereco, setEndereco] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [bairroSelecionado, setBairroSelecionado] = useState("");
  const [erroPedido, setErroPedido] = useState("");
  const [trocoPara, setTrocoPara] = useState("");

  const produtosVisiveis = produtos.filter((produto) =>
    categoriaAtiva === "todos"
      ? true
      : produto.categoria === categoriaAtiva
  );



  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const totalPedido = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const temProdutoPorPeso = carrinho.some(
    (item) => item.precoPorPeso
  );

  const bairro = configuracao.bairros.find(
    (item) => item.id === bairroSelecionado
  );

  const taxaEntrega = bairro ? bairro.taxa : 0;

  const totalComEntrega = totalPedido + taxaEntrega;

  const valorPago = Number(trocoPara) || 0;

  const valorTroco =
    formaPagamento === "dinheiro" &&
      !temProdutoPorPeso &&
      valorPago >= totalComEntrega
      ? valorPago - totalComEntrega
      : 0;

  // Função para validar os dados do pedido
  const validarPedido = () => {
    if (carrinho.length === 0) {
      return "Adicione pelo menos um produto.";
    }

    if (!nomeCliente.trim()) {
      return "Informe seu nome.";
    }

    if (!endereco.trim()) {
      return "Informe seu endereço.";
    }

    if (!bairroSelecionado) {
      return "Selecione o bairro.";
    }

    if (!formaPagamento) {
      return "Selecione a forma de pagamento.";
    }
    if (
      formaPagamento === "dinheiro" &&
      trocoPara &&
      !temProdutoPorPeso &&
      Number(trocoPara) < totalComEntrega
    ) {
      return "O valor informado para pagamento é menor que o total do pedido.";
    }

    return "";
  };

  const icones = {
    pedido: String.fromCodePoint(0x1F9FE),
    cliente: String.fromCodePoint(0x1F464),
    endereco: String.fromCodePoint(0x1F4CD),
    bairro: String.fromCodePoint(0x1F3D8),
    pagamento: String.fromCodePoint(0x1F4B0),
    dinheiro: String.fromCodePoint(0x1F4B5),
    itens: String.fromCodePoint(0x1F6CD),
    entrega: String.fromCodePoint(0x1F69A),
    peso: String.fromCodePoint(0x2696),
  };


  const montarMensagemPedido = () => {
    const linhasItens = carrinho.map((item) => {
      const complementos =
        item.complementos?.length > 0
          ? `\nComplementos: ${item.complementos
            .map((complemento) => complemento.nome)
            .join(", ")}`
          : "";

      const valor = item.precoPorPeso
        ? "\nValor: após a pesagem"
        : `\nSubtotal: ${formatarMoeda(
          item.preco * item.quantidade
        )}`;

      return `• ${item.nome}
Quantidade: ${item.quantidade}${complementos}${valor}`;
    });

    const mensagem = `
${icones.pedido} *NOVO PEDIDO*

${icones.cliente} *Cliente:* ${nomeCliente}
${icones.endereco} *Endereço:* ${endereco}
${icones.bairro} *Bairro:* ${bairro?.nome || ""}
${icones.pagamento} *Pagamento:* ${formaPagamento}

${formaPagamento === "dinheiro" && trocoPara
        ? temProdutoPorPeso
          ? `${icones.dinheiro} *Troco para:* ${formatarMoeda(Number(trocoPara))}
${icones.peso} Troco será calculado após a pesagem.`
          : `${icones.dinheiro} *Pago com:* ${formatarMoeda(Number(trocoPara))}
${icones.dinheiro} *Troco:* ${formatarMoeda(valorTroco)}`
        : ""
      }

${icones.itens} *ITENS DO PEDIDO*

${linhasItens.join("\n\n")}

${icones.entrega} *Taxa de entrega:* ${formatarMoeda(taxaEntrega)}

${temProdutoPorPeso
        ? `${icones.pagamento} *Total parcial:* ${formatarMoeda(totalComEntrega)}
${icones.peso} + valor do Açaí após a pesagem`
        : `${icones.pagamento} *Total:* ${formatarMoeda(totalComEntrega)}`
      }
`.trim();

    return mensagem;
  };

  const finalizarPedido = () => {
    const erro = validarPedido();

    if (erro) {
      setErroPedido(erro);
      return;
    }

    setErroPedido("");

    const mensagem = montarMensagemPedido();


    const urlWhatsApp = new URL(
      "https://api.whatsapp.com/send"
    );

    urlWhatsApp.searchParams.set(
      "phone",
      configuracao.whatsapp
    );

    urlWhatsApp.searchParams.set(
      "text",
      mensagem
    );

    window.open(urlWhatsApp.toString(), "_blank");
  };


  return (
    <main className="App">
      <header className="cabecalho">
        <div className="cabecalho-overlay"></div>

        <span className="decoracao-sorvete sorvete-1">🍦</span>
        <span className="decoracao-sorvete sorvete-2">🍨</span>
        <span className="decoracao-sorvete sorvete-3">🍧</span>
        <span className="decoracao-sorvete sorvete-4">🧁</span>

        <div className="conteudo-cabecalho">

          <div className="selo-header">
            CARDÁPIO DIGITAL
          </div>

          <img
            className="logo-sorveteria"
            src="/logo-doce-mel.png"
            alt="Sorveteria Doce Mel"
          />

          <p className="subtitulo-header">
            Escolha seus favoritos e faça seu pedido pelo WhatsApp
          </p>

          <div className="destaques-header">
            <span>🍦 Sorvetes</span>
            <span>🍧 Açaí</span>
            <span>🍔 Hambúrgueres</span>
            <span>🥟 Pastéis</span>
          </div>

          <button
            type="button"
            className="botao-pedir-agora"
            onClick={() =>
              document
                .querySelector(".produtos")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver cardápio
          </button>

          <p className="assinatura-header">
            JF DEV • Cardápio Digital
          </p>

        </div>
      </header>

      <section className="categorias">
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            onClick={() => setCategoriaAtiva(categoria.id)}
          >
            {categoria.nome}
          </button>
        ))}
      </section>

      <section className="secao-produtos">
        <div className="titulo-secao">
          <span>Nosso cardápio</span>

          <h2>Escolha seus favoritos</h2>

          <p>
            Sorvetes, açaí, lanches e muito mais.
          </p>
        </div>

        <section className="produtos">
          {produtosVisiveis.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              onAdicionar={adicionarAoCarrinho}
            />
          ))}
        </section>
      </section>

      <p>Itens no pedido: {totalItens}</p>

      <section className="carrinho">
        <h2>seu pedido</h2>

        {carrinho.length === 0 ? (
          <p>Seu carrinho está vazio</p>
        ) : (
          <>
            {carrinho.map((item) => (
              <div key={item.chave || item.id} className="item-carrinho">
                <strong>{item.nome}</strong>

                {item.complementos?.length > 0 && (
                  <p>
                    Complementos:{" "}
                    {item.complementos
                      .map((complemento) => complemento.nome)
                      .join(", ")}
                  </p>
                )}

                <p>Quantidade: {item.quantidade}</p>

                <div className="acoes-carrinho">
                  <button onClick={() => diminuirQuantidade(item.chave || item.id)}>
                    -
                  </button>

                  <button onClick={() => adicionarAoCarrinho(item)}>
                    +
                  </button>

                  <button onClick={() => removerDoCarrinho(item.chave || item.id)}>
                    Remover
                  </button>

                  {item.precoPorPeso ? (
                    <p>Valor: após a pesagem</p>
                  ) : (
                    <p>
                      Subtotal: {formatarMoeda(item.preco * item.quantidade)}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <p>
              Taxa de entrega: {formatarMoeda(taxaEntrega)}
            </p>

            <h3 className="total-carrinho">
              {temProdutoPorPeso ? "Total parcial: " : "Total: "}
              {formatarMoeda(totalComEntrega)}
            </h3>

            {temProdutoPorPeso && (
              <p>
                + valor do Açaí após a pesagem
              </p>
            )}

          </>
        )}
      </section>
      <section className="dados-cliente">
        <h2>Dados do cliente</h2>

        <label>
          Nome:
          <input
            type="text"
            value={nomeCliente}
            onChange={(evento) => setNomeCliente(evento.target.value)}
            placeholder="Digite seu nome"
          />
        </label>

        <label>
          Endereço:
          <input
            type="text"
            value={endereco}
            onChange={(evento) => setEndereco(evento.target.value)}
            placeholder="Rua, número e bairro"
          />
        </label>

        <label>
          Forma de pagamento:

          <select
            value={formaPagamento}
            onChange={(evento) => setFormaPagamento(evento.target.value)}
          >
            <option value="">Selecione</option>
            <option value="pix">Pix</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao">Cartão</option>
          </select>
        </label>

        {formaPagamento === "dinheiro" && (
          <label>
            Troco para quanto?
            <input
              type="number"
              min="0"
              step="0.01"
              value={trocoPara}
              onChange={(evento) => setTrocoPara(evento.target.value)}
              placeholder="Ex.: 50,00"
            />
          </label>
        )}

        {formaPagamento === "dinheiro" &&
          trocoPara &&
          !temProdutoPorPeso && (
            <p>
              Troco: {formatarMoeda(valorTroco)}
            </p>
          )}

        <label>
          Bairro:
          <select
            value={bairroSelecionado}
            onChange={(evento) =>
              setBairroSelecionado(evento.target.value)
            }
          >
            <option value="">Selecione o bairro</option>

            {configuracao.bairros.map((bairro) => (
              <option key={bairro.id} value={bairro.id}>
                {bairro.nome} - {formatarMoeda(bairro.taxa)}
              </option>
            ))}
          </select>
        </label>
        {erroPedido && (
          <p className="erro-pedido">
            {erroPedido}
          </p>
        )}

        <button
          type="button"
          onClick={finalizarPedido}
        >
          Finalizar pedido
        </button>
      </section>

      <footer className="rodape">
        <div className="rodape-conteudo">

          <div className="rodape-bloco">
            <h3>Sorveteria Doce Mel</h3>

            <p>
              Sabores especiais para adoçar seus momentos.
            </p>
          </div>

          <div className="rodape-bloco">
            <strong>Atendimento</strong>

            <p>
              Aberto das 17:00 às 21:30
            </p>

            <p>
              De terça a domingo
            </p>

            <p>
              Pedidos pelo WhatsApp
            </p>
          </div>

          <div className="rodape-bloco rodape-localizacao">
            <strong>Localização</strong>

            <div className="mapa-footer">
              <iframe
                src="https://www.google.com/maps/embed?pb=!3m2!1spt-BR!2sbr!4v1790217181716!5m2!1spt-BR!2sbr!6m8!1m7!1sTVMAHblXNrjsS4gEfjESzA!2m2!1d-4.357603968707172!2d-38.02754223780553!3f170.79506313514779!4f3.0707534095551097!5f0.4000000000000002"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Localização da Sorveteria Doce Mel"
              />
            </div>
          </div>

        </div>

        <div className="rodape-final">
          <span>© 2026 Sorveteria Doce Mel</span>
          <span>Desenvolvido por JF DEV</span>
        </div>
      </footer>

    </main>
  );
}

export default App;