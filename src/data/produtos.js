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
        id: "acai-500",
        categoria: "acai",
        nome: "Açaí 500 ml",
        descricao: "Açaí cremoso com até 3 complementos.",
        preco: 18,
        imagem: "/produtos/acai-500.webp",
        disponivel: true,
        destaque: true,
    },

    {
        id: "x-bacon",
        categoria: "lanches",
        nome: "X-Bacon",
        descricao: "Pão, carne, queijo, bacon e salada.",
        preco: 16,
        imagem: "/produtos/x-bacon.webp",
        disponivel: true,
        destaque: false,
    },
];