import { useEffect, useState } from "react";

import { formatarMoeda } from "./utils/moeda";

import "./App.css";

import { useCarrinho } from "./hooks/useCarrinho";

import { categorias, produtos } from "./data/produtos";

import { ProdutoCard } from "./components/ProdutoCard";

import { configuracao } from "./data/configuracao";


// ========================================
// WHATSAPP REAL DA SORVETERIA
// ========================================

const WHATSAPP_SORVETERIA = "5585997188053";


// ========================================
// DADOS DO PIX
// ========================================

const PIX = {
  chave: "11939089245",

  chaveFormatada: "(11) 93908-9245",

  favorecido: "José Chaheme Nogueira",

  tipo: "Celular",

  copiaECola:
    "00020126360014br.gov.bcb.pix0114+55119390892455204000053039865802BR5921JOSE CHAHEME NOGUEIRA6007ARACATI62070503***6304B295",
};


// ========================================
// LOCAIS E TAXAS DE ENTREGA
// ========================================

const locaisEntrega = [
  {
    id: "palmeiras",
    nome: "Palmeiras",
    taxa: 2,
  },
  {
    id: "pedro-novo",
    nome: "Pedro Novo",
    taxa: 3,
  },
  {
    id: "corrego-cajueiro",
    nome: "Córrego até o Cajueiro",
    taxa: 5,
  },
  {
    id: "corrego-depois-igreja",
    nome: "Córrego até depois da Igreja",
    taxa: 10,
  },
  {
    id: "alto-alegre",
    nome: "Alto Alegre",
    taxa: 12,
  },
  {
    id: "varzea-redonda",
    nome: "Várzea Redonda",
    taxa: 7,
  },
  {
    id: "pirangi",
    nome: "Pirangi",
    taxa: 7,
  },
  {
    id: "pirangi-pedro-poe",
    nome: "Pirangi até Pedro Põe",
    taxa: 8,
  },
];


// ========================================
// HORÁRIO DO DELIVERY
// Sexta, sábado e domingo
// 18:00 às 21:30
// ========================================

function verificarHorarioDelivery(dataAtual) {
  const formatador = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Fortaleza",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const partes =
    formatador.formatToParts(dataAtual);

  const obterParte = (tipo) =>
    partes.find(
      (parte) => parte.type === tipo
    )?.value;

  const diaSemana =
    obterParte("weekday");

  const hora =
    Number(obterParte("hour"));

  const minuto =
    Number(obterParte("minute"));

  const minutosAtual =
    hora * 60 + minuto;

  const horarioInicio =
    18 * 60;

  const horarioFim =
    21 * 60 + 30;

  const diasPermitidos = [
    "sexta-feira",
    "sábado",
    "domingo",
  ];

  const diaPermitido =
    diasPermitidos.includes(
      diaSemana
    );

  const horarioPermitido =
    minutosAtual >= horarioInicio &&
    minutosAtual <= horarioFim;

  return (
    diaPermitido &&
    horarioPermitido
  );
}


function App() {

  const [
    categoriaAtiva,
    setCategoriaAtiva,
  ] = useState("todos");


  const {
    itens: carrinho,
    adicionarItem: adicionarAoCarrinho,
    removerItem: removerDoCarrinho,
    diminuirQuantidade,
    limparCarrinho,
  } = useCarrinho();


  // ========================================
  // DADOS DO CLIENTE
  // ========================================

  const [
    nomeCliente,
    setNomeCliente,
  ] = useState("");


  const [
    endereco,
    setEndereco,
  ] = useState("");


  const [
    complementoEndereco,
    setComplementoEndereco,
  ] = useState("");


  const [
    formaPagamento,
    setFormaPagamento,
  ] = useState("");


  const [
    bairroSelecionado,
    setBairroSelecionado,
  ] = useState("");


  const [
    erroPedido,
    setErroPedido,
  ] = useState("");


  const [
    trocoPara,
    setTrocoPara,
  ] = useState("");


  const [
    pixCopiado,
    setPixCopiado,
  ] = useState(false);


  // ========================================
  // HORÁRIO ATUAL
  // ========================================

  const [
    agora,
    setAgora,
  ] = useState(
    new Date()
  );


  useEffect(() => {

    const intervalo = setInterval(
      () => {
        setAgora(
          new Date()
        );
      },
      30000
    );

    return () =>
      clearInterval(
        intervalo
      );

  }, []);


  const deliveryAberto =
    verificarHorarioDelivery(
      agora
    );


  // ========================================
  // MODO DE TESTE
  //
  // URL normal:
  // envia para a sorveteria
  //
  // ?teste=1:
  // envia para o número que já está
  // configurado em configuracao.whatsapp
  // ========================================

  const parametrosUrl =
    new URLSearchParams(
      window.location.search
    );


  const modoTeste =
    parametrosUrl.get("teste") ===
    "1";


  const podeFinalizarPedido =
    deliveryAberto ||
    modoTeste;


  // ========================================
  // NÚMERO QUE RECEBERÁ O PEDIDO
  // ========================================

  const numeroWhatsApp =
    modoTeste
      ? configuracao.whatsapp
      : WHATSAPP_SORVETERIA;


  // ========================================
  // FILTRO DOS PRODUTOS
  // ========================================

  const produtosVisiveis =
    produtos.filter(
      (produto) =>
        categoriaAtiva ===
          "todos"
          ? true
          : produto.categoria ===
          categoriaAtiva
    );


  // ========================================
  // TOTAL DE ITENS
  // ========================================

  const totalItens =
    carrinho.reduce(
      (total, item) =>
        total +
        item.quantidade,
      0
    );


  // ========================================
  // TOTAL DOS PRODUTOS
  // ========================================

  const totalPedido =
    carrinho.reduce(
      (total, item) =>
        total +
        item.preco *
        item.quantidade,
      0
    );


  // ========================================
  // PRODUTO POR PESO
  // ========================================

  const temProdutoPorPeso =
    carrinho.some(
      (item) =>
        item.precoPorPeso
    );


  // ========================================
  // LOCAL E TAXA DE ENTREGA
  // ========================================

  const bairro =
    locaisEntrega.find(
      (item) =>
        item.id ===
        bairroSelecionado
    );


  const taxaEntrega =
    bairro
      ? bairro.taxa
      : 0;


  const totalComEntrega =
    totalPedido +
    taxaEntrega;


  // ========================================
  // TROCO
  // ========================================

  const valorPago =
    Number(trocoPara) || 0;


  const valorTroco =
    formaPagamento ===
      "dinheiro" &&
      !temProdutoPorPeso &&
      valorPago >=
      totalComEntrega
      ? valorPago -
      totalComEntrega
      : 0;


  // ========================================
  // COPIAR PIX
  // ========================================

  const copiarPix =
    async () => {

      try {

        await navigator.clipboard.writeText(
          PIX.copiaECola
        );

        setPixCopiado(
          true
        );


        setTimeout(
          () => {
            setPixCopiado(
              false
            );
          },
          3000
        );

      } catch (erro) {

        console.error(
          "Erro ao copiar Pix:",
          erro
        );

        setErroPedido(
          "Não foi possível copiar o Pix automaticamente."
        );

      }

    };


  // ========================================
  // VALIDAR PEDIDO
  // ========================================

  const validarPedido =
    () => {

      if (
        !podeFinalizarPedido
      ) {

        return "O delivery funciona de sexta a domingo, das 18:00 às 21:30.";

      }


      if (
        carrinho.length ===
        0
      ) {

        return "Adicione pelo menos um produto.";

      }


      if (
        !nomeCliente.trim()
      ) {

        return "Informe seu nome.";

      }


      if (
        !endereco.trim()
      ) {

        return "Informe seu endereço.";

      }


      if (
        !bairroSelecionado
      ) {

        return "Selecione o local de entrega.";

      }


      if (
        !formaPagamento
      ) {

        return "Selecione a forma de pagamento.";

      }


      if (
        formaPagamento ===
        "dinheiro" &&
        trocoPara &&
        !temProdutoPorPeso &&
        Number(
          trocoPara
        ) <
        totalComEntrega
      ) {

        return "O valor informado para pagamento é menor que o total do pedido.";

      }


      return "";

    };


  // ========================================
  // ÍCONES
  // ========================================

  const icones = {

    pedido:
      String.fromCodePoint(
        0x1f9fe
      ),

    cliente:
      String.fromCodePoint(
        0x1f464
      ),

    endereco:
      String.fromCodePoint(
        0x1f4cd
      ),

    complemento:
      String.fromCodePoint(
        0x1f3e0
      ),

    bairro:
      String.fromCodePoint(
        0x1f3d8
      ),

    pagamento:
      String.fromCodePoint(
        0x1f4b0
      ),

    dinheiro:
      String.fromCodePoint(
        0x1f4b5
      ),

    itens:
      String.fromCodePoint(
        0x1f6cd
      ),

    entrega:
      String.fromCodePoint(
        0x1f69a
      ),

    peso:
      String.fromCodePoint(
        0x2696
      ),

    pix:
      String.fromCodePoint(
        0x1f4f2
      ),

  };


  // ========================================
  // MONTAR MENSAGEM
  // ========================================

  const montarMensagemPedido =
    () => {

      const linhasItens =
        carrinho.map(
          (item) => {

            const complementos =
              item
                .complementos
                ?.length >
                0
                ? `\nComplementos: ${item.complementos
                  .map(
                    (
                      complemento
                    ) =>
                      complemento.nome
                  )
                  .join(", ")}`
                : "";


            const valor =
              item.precoPorPeso
                ? "\nValor: após a pesagem"
                : `\nSubtotal: ${formatarMoeda(
                  item.preco *
                  item.quantidade
                )}`;


            return `• ${item.nome}
Quantidade: ${item.quantidade}${complementos}${valor}`;

          }
        );


      const linhaComplemento =
        complementoEndereco.trim()
          ? `${icones.complemento} *Complemento / referência:* ${complementoEndereco.trim()}`
          : "";


      const linhaPix =
        formaPagamento ===
          "pix"
          ? `
${icones.pix} *Pagamento via Pix*
Favorecido: ${PIX.favorecido}
Chave: ${PIX.chaveFormatada}
Envie o comprovante após realizar o pagamento.`
          : "";


      const mensagem = `
${icones.pedido} *NOVO PEDIDO*

${icones.cliente} *Cliente:* ${nomeCliente}
${icones.endereco} *Endereço:* ${endereco}
${linhaComplemento}
${icones.bairro} *Local:* ${bairro?.nome || ""}
${icones.pagamento} *Pagamento:* ${formaPagamento}
${linhaPix}

${formaPagamento ===
          "dinheiro" &&
          trocoPara
          ? temProdutoPorPeso
            ? `${icones.dinheiro} *Troco para:* ${formatarMoeda(
              Number(
                trocoPara
              )
            )}
${icones.peso} Troco será calculado após a pesagem.`
            : `${icones.dinheiro} *Pago com:* ${formatarMoeda(
              Number(
                trocoPara
              )
            )}
${icones.dinheiro} *Troco:* ${formatarMoeda(
              valorTroco
            )}`
          : ""
        }

${icones.itens} *ITENS DO PEDIDO*

${linhasItens.join(
          "\n\n"
        )}

${icones.entrega} *Taxa de entrega:* ${formatarMoeda(
          taxaEntrega
        )}

${temProdutoPorPeso
          ? `${icones.pagamento} *Total parcial:* ${formatarMoeda(
            totalComEntrega
          )}
${icones.peso} + valor do Açaí após a pesagem`
          : `${icones.pagamento} *Total:* ${formatarMoeda(
            totalComEntrega
          )}`
        }
`.trim();


      return mensagem;

    };


  // ========================================
  // FINALIZAR PEDIDO
  // ========================================

  const finalizarPedido =
    () => {

      const erro =
        validarPedido();


      if (erro) {

        setErroPedido(
          erro
        );

        return;

      }


      setErroPedido("");


      const mensagem =
        montarMensagemPedido();


      const urlWhatsApp =
        new URL(
          "https://api.whatsapp.com/send"
        );


      urlWhatsApp.searchParams.set(
        "phone",
        numeroWhatsApp
      );


      urlWhatsApp.searchParams.set(
        "text",
        mensagem
      );


      const whatsappAberto =
        window.open(
          urlWhatsApp.toString(),
          "_blank"
        );


      // Se o navegador bloquear o WhatsApp,
      // mantém todo o pedido.

      if (
        !whatsappAberto
      ) {

        setErroPedido(
          "Não foi possível abrir o WhatsApp. Verifique se o navegador bloqueou a abertura."
        );

        return;

      }


      // ========================================
      // LIMPAR APÓS ABRIR WHATSAPP
      // ========================================

      limparCarrinho();

      setNomeCliente("");

      setEndereco("");

      setComplementoEndereco("");

      setBairroSelecionado("");

      setFormaPagamento("");

      setTrocoPara("");

      setPixCopiado(false);

      setErroPedido("");

    };


  // ========================================
  // IR PARA O PEDIDO
  // ========================================

  const irParaCarrinho =
    () => {

      document
        .querySelector(
          ".carrinho"
        )
        ?.scrollIntoView({
          behavior:
            "smooth",
          block:
            "start",
        });

    };


  return (

    <main className="App">


      {/* ===================================
          CABEÇALHO
      =================================== */}

      <header className="cabecalho">

        <div className="cabecalho-overlay"></div>


        <span className="decoracao-sorvete sorvete-1">
          🍦
        </span>

        <span className="decoracao-sorvete sorvete-2">
          🍨
        </span>

        <span className="decoracao-sorvete sorvete-3">
          🍧
        </span>

        <span className="decoracao-sorvete sorvete-4">
          🧁
        </span>


        <div className="conteudo-cabecalho">


          <div className="selo-header">
            CARDÁPIO DIGITAL
          </div>


          <img
            className="logo-sorveteria"
            src={`${import.meta.env.BASE_URL}logo-doce-mel.png`}
            alt="Sorveteria Doce Mel"
          />


          <p className="subtitulo-header">
            Escolha seus favoritos e faça seu pedido pelo WhatsApp
          </p>


          <div className="destaques-header">

            <span>
              🍦 Sorvetes
            </span>

            <span>
              🍧 Açaí
            </span>

            <span>
              🍔 Hambúrgueres
            </span>

            <span>
              🥟 Pastéis
            </span>

          </div>


          <button
            type="button"
            className="botao-pedir-agora"
            onClick={() =>
              document
                .querySelector(
                  ".produtos"
                )
                ?.scrollIntoView({
                  behavior:
                    "smooth",
                })
            }
          >

            Ver cardápio

          </button>


          <p className="assinatura-header">
            JF DEV • Cardápio Digital
          </p>

        </div>

      </header>


      {/* ===================================
          CATEGORIAS
      =================================== */}

      <section className="categorias">

        {categorias.map(
          (categoria) => (

            <button
              key={
                categoria.id
              }
              type="button"
              onClick={() =>
                setCategoriaAtiva(
                  categoria.id
                )
              }
            >

              {
                categoria.nome
              }

            </button>

          )
        )}

      </section>


      {/* ===================================
          PRODUTOS
      =================================== */}

      <section className="secao-produtos">


        <div className="titulo-secao">

          <span>
            Nosso cardápio
          </span>


          <h2>
            Escolha seus favoritos
          </h2>


          <p>
            Sorvetes, açaí, lanches e muito mais.
          </p>

        </div>


        <section className="produtos">

          {produtosVisiveis.map(
            (produto) => (

              <ProdutoCard
                key={
                  produto.id
                }
                produto={
                  produto
                }
                onAdicionar={
                  adicionarAoCarrinho
                }
              />

            )
          )}

        </section>

      </section>


      {/* ===================================
          BOTÃO FLUTUANTE DO PEDIDO
      =================================== */}

      <button
        type="button"
        className="botao-carrinho-flutuante"
        onClick={
          irParaCarrinho
        }
        aria-label={`Abrir pedido com ${totalItens} itens`}
      >

        <span className="icone-carrinho-flutuante">
          🧾
        </span>


        {totalItens > 0 && (

          <span className="contador-carrinho-flutuante">
            {totalItens}
          </span>

        )}

      </button>


      <p>
        Itens no pedido:{" "}
        {totalItens}
      </p>


      {/* ===================================
          PEDIDO
      =================================== */}

      <section className="carrinho">

        <h2>
          Seu pedido
        </h2>


        {carrinho.length ===
          0 ? (

          <p>
            Seu pedido está vazio
          </p>

        ) : (

          <>

            {carrinho.map(
              (item) => (

                <div
                  key={
                    item.chave ||
                    item.id
                  }
                  className="item-carrinho"
                >

                  <strong>
                    {
                      item.nome
                    }
                  </strong>


                  {item
                    .complementos
                    ?.length >
                    0 && (

                      <p>

                        Complementos:{" "}

                        {item.complementos
                          .map(
                            (
                              complemento
                            ) =>
                              complemento.nome
                          )
                          .join(", ")}

                      </p>

                    )}


                  <p>
                    Quantidade:{" "}
                    {
                      item.quantidade
                    }
                  </p>


                  <div className="acoes-carrinho">


                    <button
                      type="button"
                      onClick={() =>
                        diminuirQuantidade(
                          item.chave ||
                          item.id
                        )
                      }
                    >
                      -
                    </button>


                    <button
                      type="button"
                      onClick={() =>
                        adicionarAoCarrinho(
                          item
                        )
                      }
                    >
                      +
                    </button>


                    <button
                      type="button"
                      onClick={() =>
                        removerDoCarrinho(
                          item.chave ||
                          item.id
                        )
                      }
                    >
                      Remover
                    </button>


                    {item.precoPorPeso ? (

                      <p>
                        Valor: após a pesagem
                      </p>

                    ) : (

                      <p>

                        Subtotal:{" "}

                        {formatarMoeda(
                          item.preco *
                          item.quantidade
                        )}

                      </p>

                    )}

                  </div>

                </div>

              )
            )}


            <p>

              Taxa de entrega:{" "}

              {formatarMoeda(
                taxaEntrega
              )}

            </p>


            <h3 className="total-carrinho">

              {temProdutoPorPeso
                ? "Total parcial: "
                : "Total: "}

              {formatarMoeda(
                totalComEntrega
              )}

            </h3>


            {temProdutoPorPeso && (

              <p>
                + valor do Açaí após a pesagem
              </p>

            )}

          </>

        )}

      </section>


      {/* ===================================
          DADOS DO CLIENTE
      =================================== */}

      <section className="dados-cliente">


        <h2>
          Dados do cliente
        </h2>


        {/* ===================================
            STATUS DO DELIVERY
        =================================== */}

        <div
          className={
            deliveryAberto ||
              modoTeste
              ? "status-delivery status-delivery-aberto"
              : "status-delivery status-delivery-fechado"
          }
        >


          <strong>

            {modoTeste
              ? "🧪 Modo de teste"
              : deliveryAberto
                ? "🟢 Delivery aberto"
                : "🔴 Delivery fechado"}

          </strong>


          <span>

            {modoTeste
              ? "Pedidos liberados para testes. O pedido será enviado para o número de teste."
              : "Delivery: sexta a domingo, das 18:00 às 21:30."}

          </span>

        </div>


        <label>

          Nome:

          <input
            type="text"
            value={
              nomeCliente
            }
            onChange={(
              evento
            ) =>
              setNomeCliente(
                evento.target
                  .value
              )
            }
            placeholder="Digite seu nome"
          />

        </label>


        <label>

          Endereço:

          <input
            type="text"
            value={
              endereco
            }
            onChange={(
              evento
            ) =>
              setEndereco(
                evento.target
                  .value
              )
            }
            placeholder="Rua, número..."
          />

        </label>


        <label>

          Complemento / ponto de referência:

          <input
            type="text"
            value={
              complementoEndereco
            }
            onChange={(
              evento
            ) =>
              setComplementoEndereco(
                evento.target
                  .value
              )
            }
            placeholder="Ex.: casa do João, portão azul, vizinho ao mercantil..."
          />

        </label>


        {/* ===================================
            LOCAL DE ENTREGA
        =================================== */}

        <label>

          Local de entrega:

          <select
            value={
              bairroSelecionado
            }
            onChange={(
              evento
            ) =>
              setBairroSelecionado(
                evento.target
                  .value
              )
            }
          >


            <option value="">
              Selecione o local
            </option>


            {locaisEntrega.map(
              (bairro) => (

                <option
                  key={
                    bairro.id
                  }
                  value={
                    bairro.id
                  }
                >

                  {bairro.nome} -{" "}
                  {formatarMoeda(
                    bairro.taxa
                  )}

                </option>

              )
            )}

          </select>

        </label>


        {/* ===================================
            FORMA DE PAGAMENTO
        =================================== */}

        <label>

          Forma de pagamento:

          <select
            value={
              formaPagamento
            }
            onChange={(
              evento
            ) => {

              setFormaPagamento(
                evento.target.value
              );

              setPixCopiado(
                false
              );

            }}
          >


            <option value="">
              Selecione
            </option>


            <option value="pix">
              Pix
            </option>


            <option value="dinheiro">
              Dinheiro
            </option>


            <option value="cartao">
              Cartão
            </option>


          </select>

        </label>


        {/* ===================================
            PIX
        =================================== */}

        {formaPagamento ===
          "pix" && (


            <div className="bloco-pix">


              <h3>
                📱 Pagamento via Pix
              </h3>


              <div className="pix-qrcode-container">

                <img
                  src={`${import.meta.env.BASE_URL}pix-qrcode.png`}
                  alt="QR Code Pix da Sorveteria Doce Mel"
                  className="pix-qrcode"
                />

              </div>


              <p>
                <strong>
                  Favorecido:
                </strong>{" "}
                {PIX.favorecido}
              </p>


              <p>
                <strong>
                  Chave Pix:
                </strong>{" "}
                {PIX.chaveFormatada}
              </p>


              <p>
                <strong>
                  Tipo:
                </strong>{" "}
                {PIX.tipo}
              </p>


              <button
                type="button"
                className="botao-copiar-pix"
                onClick={
                  copiarPix
                }
              >

                {pixCopiado
                  ? "✅ Pix copiado!"
                  : "📋 Copiar Pix"}

              </button>


              <p className="aviso-pix">

                Após realizar o pagamento,
                envie o comprovante junto
                com o pedido pelo WhatsApp.

              </p>


            </div>

          )}




        {/* ===================================
            TROCO
        =================================== */}

        {formaPagamento ===
          "dinheiro" && (

            <label>

              Troco para quanto?

              <input
                type="number"
                min="0"
                step="0.01"
                value={
                  trocoPara
                }
                onChange={(
                  evento
                ) =>
                  setTrocoPara(
                    evento.target
                      .value
                  )
                }
                placeholder="Ex.: 50,00"
              />

            </label>

          )}


        {formaPagamento ===
          "dinheiro" &&
          trocoPara &&
          !temProdutoPorPeso && (

            <p>

              Troco:{" "}

              {formatarMoeda(
                valorTroco
              )}

            </p>

          )}


        {/* ===================================
            ERROS
        =================================== */}

        {erroPedido && (

          <p className="erro-pedido">

            {
              erroPedido
            }

          </p>

        )}


        {/* ===================================
            FINALIZAR
        =================================== */}

        <button
          type="button"
          onClick={
            finalizarPedido
          }
          disabled={
            !podeFinalizarPedido
          }
          className={
            !podeFinalizarPedido
              ? "botao-finalizar-fechado"
              : ""
          }
        >

          {modoTeste
            ? "Finalizar pedido de teste"
            : deliveryAberto
              ? "Finalizar pedido"
              : "Delivery fechado"}

        </button>


      </section>


      {/* ===================================
          RODAPÉ
      =================================== */}

      <footer className="rodape">


        <div className="rodape-conteudo">


          <div className="rodape-bloco">

            <h3>
              Sorveteria Doce Mel
            </h3>


            <p>
              Sabores especiais para adoçar seus momentos.
            </p>

          </div>


          <div className="rodape-bloco">

            <strong>
              Atendimento
            </strong>


            <p>
              Aberto das 17:00 às 21:30
            </p>


            <p>
              De terça a domingo
            </p>


            <p>
              🛵 Delivery de sexta a domingo
            </p>


            <p>
              Das 18:00 às 21:30
            </p>


            <p>
              Pedidos pelo WhatsApp
            </p>

          </div>


          <div className="rodape-bloco rodape-localizacao">


            <strong>
              Localização
            </strong>


            <div className="mapa-footer">


              <iframe
                src="https://www.google.com/maps/embed?pb=!3m2!1spt-BR!2sbr!4v1790217181716!5m2!1spt-BR!2sbr!6m8!1m7!1sTVMAHblXNrjsS4gEfjESzA!2m2!1d-4.357603968707172!2d-38.02754223780553!3f170.79506313514779!4f3.0707534095551097!5f0.4000000000000002"
                width="600"
                height="450"
                style={{
                  border: 0,
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Localização da Sorveteria Doce Mel"
              />


            </div>

          </div>


        </div>


        <div className="rodape-final">

          <span>
            © 2026 Sorveteria Doce Mel
          </span>


          <span>
            Desenvolvido por JF DEV
          </span>

        </div>


      </footer>


    </main>

  );

}


export default App;