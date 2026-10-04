export const categorias = [
    { id: "todos", nome: "Todos" },
    { id: "acai", nome: "Açaí" },
    { id: "lanches", nome: "Sanduíches" },
    { id: "pasteis", nome: "Pastéis" },
    { id: "porcoes", nome: "Porções" },
    { id: "bebidas", nome: "Bebidas" },
];

export const produtos = [
    // =====================================================
    // AÇAÍ
    // =====================================================

    {
        id: "acai-por-peso",
        categoria: "acai",
        nome: "Açaí por peso",
        descricao:
            "Monte seu açaí com os complementos disponíveis. O valor final será confirmado após a pesagem.",
        preco: 0,
        precoPorPeso: true,
        imagem: `${import.meta.env.BASE_URL}produtos/acai-por-peso.png`,
        disponivel: true,
        destaque: true,

        opcoes: [
            {
                id: "complementos",
                nome: "Escolha os complementos",
                tipo: "multipla",
                obrigatorio: false,
                itens: [
                    { id: "creme-ninho", nome: "Creme de Ninho", acrescimo: 0 },
                    { id: "creme-oreo", nome: "Creme de Oreo", acrescimo: 0 },
                    { id: "creme-morango", nome: "Creme de morango", acrescimo: 0 },
                    { id: "creme-tapioca", nome: "Creme de tapioca", acrescimo: 0 },
                    { id: "creme-cupuacu", nome: "Creme de cupuaçu", acrescimo: 0 },
                    { id: "farinha-lactea", nome: "Farinha láctea", acrescimo: 0 },
                    { id: "ovomaltine", nome: "Ovomaltine", acrescimo: 0 },
                    { id: "granulado", nome: "Granulado", acrescimo: 0 },
                    { id: "cereja", nome: "Cereja", acrescimo: 0 },
                    { id: "castanha", nome: "Castanha", acrescimo: 0 },
                    { id: "chocoball", nome: "Chocoball", acrescimo: 0 },
                    { id: "mms", nome: "M&Ms", acrescimo: 0 },
                    {
                        id: "gotas-chocolate",
                        nome: "Gotas de chocolate",
                        acrescimo: 0,
                    },
                    { id: "sucrilhos", nome: "Sucrilhos", acrescimo: 0 },
                    { id: "pacoca", nome: "Paçoca", acrescimo: 0 },
                    { id: "leite-po", nome: "Leite em pó", acrescimo: 0 },
                    { id: "canudinho", nome: "Canudinho", acrescimo: 0 },
                    { id: "creme-avela", nome: "Creme de avelã", acrescimo: 0 },
                    { id: "jujuba", nome: "Jujuba", acrescimo: 0 },
                    { id: "marshmallow", nome: "Marshmallow", acrescimo: 0 },
                    { id: "amendoim", nome: "Amendoim", acrescimo: 0 },
                ],
            },
        ],
    },

    // =====================================================
    // SANDUÍCHES - PÃO BOLA
    // =====================================================

    {
        id: "x-tudo-pao-bola",
        categoria: "lanches",
        nome: "X-Tudo - Pão Bola",
        descricao:
            "Hambúrguer, ovo, presunto, queijo, calabresa, alface e tomate.",
        preco: 15,
        imagem: `${import.meta.env.BASE_URL}produtos/x-tudo-pao-bola.png`,
        disponivel: true,
        destaque: true,
    },

    {
        id: "x-egg",
        categoria: "lanches",
        nome: "X-Egg",
        descricao:
            "Hambúrguer, ovo, presunto, queijo, alface e tomate.",
        preco: 13,
        imagem: `${import.meta.env.BASE_URL}produtos/x-egg.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "x-calabresa",
        categoria: "lanches",
        nome: "X-Calabresa",
        descricao:
            "Hambúrguer, calabresa, queijo, alface e tomate.",
        preco: 12,
        imagem: `${import.meta.env.BASE_URL}produtos/x-calabresa.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "x-burguer",
        categoria: "lanches",
        nome: "X-Burguer",
        descricao:
            "Hambúrguer, queijo, alface e tomate.",
        preco: 10,
        imagem: `${import.meta.env.BASE_URL}produtos/x-burger.png`,
        disponivel: true,
        destaque: false,
    },

    // =====================================================
    // SANDUÍCHES - PÃO ÁRABE
    // =====================================================

    {
        id: "arabe-calabresa",
        categoria: "lanches",
        nome: "Calabresa - Pão Árabe",
        descricao:
            "Calabresa, queijo e salada.",
        preco: 14,
        imagem: `${import.meta.env.BASE_URL}produtos/arabe-calabresa.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "arabe-frango-catupiry",
        categoria: "lanches",
        nome: "Frango com Catupiry - Pão Árabe",
        descricao:
            "Frango, Catupiry, queijo e salada.",
        preco: 16,
        imagem: `${import.meta.env.BASE_URL}produtos/arabe-frango-catupiry.png`,
        disponivel: true,
        destaque: true,
    },

    {
        id: "arabe-frango-bacon",
        categoria: "lanches",
        nome: "Frango e Bacon - Pão Árabe",
        descricao:
            "Frango, bacon, queijo e salada.",
        preco: 16,
        imagem: `${import.meta.env.BASE_URL}produtos/arabe-frango-catupiry.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "arabe-frango-calabresa",
        categoria: "lanches",
        nome: "Frango e Calabresa - Pão Árabe",
        descricao:
            "Frango, calabresa, queijo e salada.",
        preco: 16,
        imagem: `${import.meta.env.BASE_URL}produtos/arabe-calabresa.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "arabe-x-tudo",
        categoria: "lanches",
        nome: "X-Tudo - Pão Árabe",
        descricao:
            "Frango, queijo, presunto, calabresa, ovo, carne de hambúrguer e salada.",
        preco: 20,
        imagem: `${import.meta.env.BASE_URL}produtos/arabe-frango-catupiry.png`,
        disponivel: true,
        destaque: true,
    },

    // =====================================================
    // PASTÉIS SALGADOS
    // =====================================================

    {
        id: "pastel-carne",
        categoria: "pasteis",
        nome: "Pastel de Carne",
        descricao: "Pastel crocante recheado com carne.",
        preco: 6,
        imagem: `${import.meta.env.BASE_URL}produtos/pasteis.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "pastel-frango",
        categoria: "pasteis",
        nome: "Pastel de Frango",
        descricao: "Pastel crocante recheado com frango.",
        preco: 6,
        imagem: `${import.meta.env.BASE_URL}produtos/pasteis.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "pastel-frango-catupiry",
        categoria: "pasteis",
        nome: "Pastel de Frango com Catupiry",
        descricao: "Pastel recheado com frango e Catupiry.",
        preco: 7,
        imagem: `${import.meta.env.BASE_URL}produtos/pasteis.png`,
        disponivel: true,
        destaque: true,
    },

    {
        id: "pastel-queijo",
        categoria: "pasteis",
        nome: "Pastel de Queijo",
        descricao: "Pastel crocante recheado com queijo.",
        preco: 7,
        imagem: `${import.meta.env.BASE_URL}produtos/pasteis.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "pastel-calabresa",
        categoria: "pasteis",
        nome: "Pastel de Calabresa",
        descricao: "Pastel crocante recheado com calabresa.",
        preco: 6,
        imagem: `${import.meta.env.BASE_URL}produtos/pasteis.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "pastel-misto",
        categoria: "pasteis",
        nome: "Pastel Misto",
        descricao: "Pastel misto.",
        preco: 7,
        imagem: `${import.meta.env.BASE_URL}produtos/pasteis.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "pastel-carne-queijo",
        categoria: "pasteis",
        nome: "Pastel de Carne com Queijo",
        descricao: "Pastel recheado com carne e queijo.",
        preco: 7,
        imagem: `${import.meta.env.BASE_URL}produtos/pasteis.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "pastel-frango-queijo",
        categoria: "pasteis",
        nome: "Pastel de Frango com Queijo",
        descricao: "Pastel recheado com frango e queijo.",
        preco: 7,
        imagem: `${import.meta.env.BASE_URL}produtos/pasteis.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "pastel-calabresa-queijo",
        categoria: "pasteis",
        nome: "Pastel de Calabresa com Queijo",
        descricao: "Pastel recheado com calabresa e queijo.",
        preco: 7,
        imagem: `${import.meta.env.BASE_URL}produtos/pasteis.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "pastel-carne-sol-catupiry",
        categoria: "pasteis",
        nome: "Pastel de Carne de Sol com Catupiry",
        descricao: "Pastel recheado com carne de sol e Catupiry.",
        preco: 8,
        imagem: `${import.meta.env.BASE_URL}produtos/pasteis.png`,
        disponivel: true,
        destaque: true,
    },

    // =====================================================
    // PASTÉIS DOCES
    // =====================================================

    {
        id: "pastel-creme-avela",
        categoria: "pasteis",
        nome: "Pastel de Creme de Avelã",
        descricao: "Pastel doce recheado com creme de avelã.",
        preco: 8,
        imagem: `${import.meta.env.BASE_URL}produtos/pasteis.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "pastel-romeu-julieta",
        categoria: "pasteis",
        nome: "Pastel Romeu e Julieta",
        descricao: "Pastel doce no tradicional sabor Romeu e Julieta.",
        preco: 9,
        imagem: `${import.meta.env.BASE_URL}produtos/pasteis.png`,
        disponivel: true,
        destaque: false,
    },

    // =====================================================
    // PORÇÕES
    // =====================================================

    {
        id: "batata-frita",
        categoria: "porcoes",
        nome: "Batata Frita",
        descricao: "Porção de batata frita.",
        preco: 14,
        imagem: `${import.meta.env.BASE_URL}produtos/batata-frita.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "batata-recheada",
        categoria: "porcoes",
        nome: "Batata Recheada",
        descricao: "Batata recheada.",
        preco: 17,
        imagem: `${import.meta.env.BASE_URL}produtos/batata-recheada.png`,
        disponivel: true,
        destaque: true,
    },

    {
        id: "mini-coxinha",
        categoria: "porcoes",
        nome: "Mini Coxinha - 12 unidades",
        descricao: "Porção com 12 mini coxinhas.",
        preco: 7,
        imagem: `${import.meta.env.BASE_URL}produtos/mini-coxinhas.jpg`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "mini-bolinha-mista",
        categoria: "porcoes",
        nome: "Mini Bolinha Mista - 12 unidades",
        descricao: "Porção com 12 mini bolinhas mistas.",
        preco: 7,
        imagem: `${import.meta.env.BASE_URL}produtos/mini-bolinha-mista.jpg`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "calabresa-acebolada",
        categoria: "porcoes",
        nome: "Calabresa Acebolada",
        descricao: "Porção de calabresa acebolada.",
        preco: 16,
        imagem: `${import.meta.env.BASE_URL}produtos/calabresa-acebolada.png`,
        disponivel: true,
        destaque: false,
    },

    // =====================================================
    // BEBIDAS
    // =====================================================

    {
        id: "coca-cola-2l",
        categoria: "bebidas",
        nome: "Coca-Cola 2L",
        descricao: "Refrigerante Coca-Cola 2 litros.",
        preco: 15,
        imagem: `${import.meta.env.BASE_URL}produtos/coca-cola-2l.jpg`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "coca-cola-1l",
        categoria: "bebidas",
        nome: "Coca-Cola 1L",
        descricao: "Refrigerante Coca-Cola 1 litro.",
        preco: 9,
        imagem: `${import.meta.env.BASE_URL}produtos/coca-cola-pet-1l.jpg`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "coca-cola-600ml",
        categoria: "bebidas",
        nome: "Coca-Cola 600ml",
        descricao: "Refrigerante Coca-Cola 600ml.",
        preco: 6,
        imagem: `${import.meta.env.BASE_URL}produtos/coca-cola-600.webp`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "sao-geraldo-2l",
        categoria: "bebidas",
        nome: "São Geraldo 2L",
        descricao: "Refrigerante São Geraldo 2 litros.",
        preco: 15,
        imagem: `${import.meta.env.BASE_URL}produtos/sao-geraldo-2l.webp`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "refrigerante-lata",
        categoria: "bebidas",
        nome: "Refrigerante Lata",
        descricao: "Refrigerante em lata.",
        preco: 5,
        imagem: `${import.meta.env.BASE_URL}produtos/refrigerante-lata.webp`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "suco-300ml",
        categoria: "bebidas",
        nome: "Suco 300ml",
        descricao: "Copo de suco 300ml.",
        preco: 5,
        imagem: `${import.meta.env.BASE_URL}produtos/suco-copo-300.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "agua-com-gas",
        categoria: "bebidas",
        nome: "Água com Gás",
        descricao: "Água mineral com gás.",
        preco: 3,
        imagem: `${import.meta.env.BASE_URL}produtos/agua-com-gas.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "agua-sem-gas",
        categoria: "bebidas",
        nome: "Água sem Gás",
        descricao: "Água mineral sem gás.",
        preco: 2.5,
        imagem: `${import.meta.env.BASE_URL}produtos/agua-sem-gas.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "heineken",
        categoria: "bebidas",
        nome: "Heineken",
        descricao: "Cerveja Heineken.",
        preco: 10,
        imagem: `${import.meta.env.BASE_URL}produtos/heineken.jfif`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "budweiser",
        categoria: "bebidas",
        nome: "Budweiser",
        descricao: "Cerveja Budweiser.",
        preco: 9,
        imagem: `${import.meta.env.BASE_URL}produtos/budweiser.webp`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "spaten",
        categoria: "bebidas",
        nome: "Spaten",
        descricao: "Cerveja Spaten.",
        preco: 9,
        imagem: `${import.meta.env.BASE_URL}produtos/spaten.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "skol",
        categoria: "bebidas",
        nome: "Skol",
        descricao: "Cerveja Skol.",
        preco: 5,
        imagem: `${import.meta.env.BASE_URL}produtos/skol.webp`,
        disponivel: true,
        destaque: false,
    },
];