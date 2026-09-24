export const categorias = [
    { id: "todos", nome: "Todos" },
    { id: "acai", nome: "Açaí" },
    { id: "sorvetes", nome: "Sorvetes" },
    { id: "lanches", nome: "Hambúrgueres" },
    { id: "pasteis", nome: "Pastéis" },
    { id: "bebidas", nome: "Bebidas" },
];

export const produtos = [
    {
        id: "acai-por-peso",
        categoria: "acai",
        nome: "Açaí por peso",
        descricao:
            "Monte seu açaí. O valor final será confirmado após a pesagem.",
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
                    { id: "leite-po", nome: "Leite em pó", acrescimo: 0 },
                    { id: "pacoca", nome: "Paçoca", acrescimo: 0 },
                    { id: "banana", nome: "Banana", acrescimo: 0 },
                    { id: "granola", nome: "Granola", acrescimo: 0 },
                ],
            },
        ],
    },

    {
        id: "x-bacon",
        categoria: "lanches",
        nome: "X-Bacon",
        descricao: "Pão, carne, queijo, bacon e salada.",
        preco: 16,
        imagem: `${import.meta.env.BASE_URL}produtos/x-bacon.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "sorvete-duas-bolas",
        categoria: "sorvetes",
        nome: "Sorvete Duas Bolas",
        descricao: "Duas bolas de sorvete com calda e confeitos.",
        preco: 12,
        imagem: `${import.meta.env.BASE_URL}produtos/sorvete-casquinha.png`,
        disponivel: true,
        destaque: true,
    },

    {
        id: "picole-artesanal",
        categoria: "sorvetes",
        nome: "Picolé Artesanal",
        descricao: "Picolé gelado e refrescante em sabores variados.",
        preco: 6,
        imagem: `${import.meta.env.BASE_URL}produtos/picoles-coloridos.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "milk-shake-chocolate",
        categoria: "bebidas",
        nome: "Milk-shake de Chocolate",
        descricao: "Milk-shake cremoso de chocolate com cobertura.",
        preco: 14,
        imagem: `${import.meta.env.BASE_URL}produtos/milk-shake-chocolate.png`,
        disponivel: true,
        destaque: true,
    },

    {
        id: "suco-manga",
        categoria: "bebidas",
        nome: "Suco de Manga",
        descricao: "Suco de manga gelado e refrescante.",
        preco: 8,
        imagem: `${import.meta.env.BASE_URL}produtos/suco-manga-natural.png`,
        disponivel: true,
        destaque: false,
    },

    {
        id: "pastel-queijo",
        categoria: "pasteis",
        nome: "Pastel de Queijo",
        descricao: "Pastel crocante recheado com queijo.",
        preco: 10,
        imagem: `${import.meta.env.BASE_URL}produtos/pastel-queijo.png`,
        disponivel: true,
        destaque: false,
    },
    {
        id: "pastel-carne",
        categoria: "pasteis",
        nome: "Pastel de Carne",
        descricao: "Pastel crocante recheado com carne.",
        preco: 10,
        imagem: `${import.meta.env.BASE_URL}produtos/pastel-carne.png`,
        disponivel: true,
        destaque: false,
    },
];